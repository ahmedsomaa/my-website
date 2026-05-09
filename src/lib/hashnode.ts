export interface HashnodePost {
  id: string;
  title: string;
  brief: string;
  /** Post subtitle (preferred one-line listing copy). */
  subtitle?: string | null;
  seo?: { description?: string | null } | null;
  url: string;
  publishedAt: string;
  readTimeInMinutes: number;
  /** Total page views from Hashnode (not read-time minutes). */
  views?: number;
  coverImage?: { url: string } | null;
}

const POST_FIELDS = `
  id
  title
  brief
  subtitle
  seo {
    description
  }
  url
  publishedAt
  readTimeInMinutes
  views
  coverImage { url }
`;

/** One-line description for list UIs: subtitle, then SEO meta, then empty (not `brief`). */
export function getPostListingDescription(post: HashnodePost): string {
  const fromSubtitle = post.subtitle?.trim();
  if (fromSubtitle) return fromSubtitle;
  const fromSeo = post.seo?.description?.trim();
  if (fromSeo) return fromSeo;
  return "";
}

const QUERY_LATEST = `
  query UserPostsLatest($host: String!) {
    publication(host: $host) {
      id
      posts(first: 3) {
        edges {
          node { ${POST_FIELDS} }
        }
      }
    }
  }
`;

const QUERY_MANY = `
  query UserPostsMany($host: String!, $first: Int!) {
    publication(host: $host) {
      id
      posts(first: $first) {
        edges {
          node { ${POST_FIELDS} }
        }
      }
    }
  }
`;

function postsFromResponse(json: unknown): HashnodePost[] {
  const edges =
    (json as { data?: { publication?: { posts?: { edges?: { node: HashnodePost }[] } } } })?.data
      ?.publication?.posts?.edges ?? [];
  return edges.map((e) => e.node);
}

export async function fetchLatestPosts(host = "som3aware.hashnode.dev"): Promise<HashnodePost[]> {
  try {
    const res = await fetch("https://gql.hashnode.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY_LATEST, variables: { host } }),
    });
    if (!res.ok) return [];
    const json = await res.json();
    return postsFromResponse(json);
  } catch {
    return [];
  }
}

/** Full listing for /writing (Hashnode caps `first`; 50 is a safe batch). */
export async function fetchAllPosts(
  host = "som3aware.hashnode.dev",
  first = 50,
): Promise<HashnodePost[]> {
  try {
    const res = await fetch("https://gql.hashnode.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY_MANY, variables: { host, first } }),
    });
    if (!res.ok) return [];
    const json = await res.json();
    return postsFromResponse(json);
  } catch {
    return [];
  }
}