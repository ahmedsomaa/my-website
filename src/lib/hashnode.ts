export interface HashnodePost {
  id: string;
  title: string;
  brief: string;
  url: string;
  publishedAt: string;
  readTimeInMinutes: number;
  coverImage?: { url: string } | null;
}

const POST_FIELDS = `
  id
  title
  brief
  url
  publishedAt
  readTimeInMinutes
  coverImage { url }
`;

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

/** Full listing for /blog (Hashnode caps `first`; 50 is a safe batch). */
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