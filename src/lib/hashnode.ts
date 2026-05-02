export interface HashnodePost {
  id: string;
  title: string;
  brief: string;
  url: string;
  publishedAt: string;
  readTimeInMinutes: number;
  coverImage?: { url: string } | null;
}

const QUERY = `
  query UserPosts($host: String!) {
    publication(host: $host) {
      id
      posts(first: 3) {
        edges {
          node {
            id
            title
            brief
            url
            publishedAt
            readTimeInMinutes
            coverImage { url }
          }
        }
      }
    }
  }
`;

export async function fetchLatestPosts(host = "som3aware.hashnode.dev"): Promise<HashnodePost[]> {
  try {
    const res = await fetch("https://gql.hashnode.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: QUERY, variables: { host } }),
    });
    if (!res.ok) return [];
    const json = await res.json();
    const edges = json?.data?.publication?.posts?.edges ?? [];
    return edges.map((e: { node: HashnodePost }) => e.node);
  } catch {
    return [];
  }
}