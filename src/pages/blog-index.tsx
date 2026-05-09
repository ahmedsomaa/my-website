import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { usePageAccent, PAGE_ACCENTS } from "@/hooks/use-page-accent";
import {
  fetchAllPosts,
  getPostListingDescription,
  type HashnodePost,
} from "@/lib/hashnode";
import { PROFILE } from "@/data/portfolio";

const PAGE_SIZE = 10;

export default function BlogIndex() {
  usePageAccent(PAGE_ACCENTS.blog);
  const [posts, setPosts] = useState<HashnodePost[] | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAllPosts(PROFILE.hashnodeHost).then(setPosts);
  }, []);

  const totalPages = useMemo(() => {
    if (!posts?.length) return 1;
    return Math.ceil(posts.length / PAGE_SIZE);
  }, [posts]);

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const clampedPage = Math.min(Math.max(1, page), totalPages);

  const pagedPosts = useMemo(() => {
    if (!posts?.length) return [];
    const start = (clampedPage - 1) * PAGE_SIZE;
    return posts.slice(start, start + PAGE_SIZE);
  }, [posts, clampedPage]);

  return (
    <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-20 pb-10">
      <div className="absolute inset-x-0 top-0 h-[420px] notebook-lines pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[420px] accent-glow pointer-events-none" />
      <header className="relative mb-16 md:mb-20">
        <p className="font-mono-pair text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
          03 / writing — cat ~/posts/*.md
        </p>
        <h1 className="font-display text-4xl md:text-6xl leading-[0.95] max-w-4xl">
          <span className="block">my <span className="text-accent-page">corner</span></span>
          <span className="block mt-2 md:mt-3">on the internet.</span>
        </h1>
      </header>

      <div className="border-t hairline">
        {posts === null && (
          <div className="py-10 font-mono-pair text-xs uppercase tracking-[0.25em] text-muted-foreground">
            // fetching from hashnode.gql ...
          </div>
        )}
        {posts && posts.length === 0 && (
          <div className="py-10 font-mono-pair text-xs uppercase tracking-[0.25em] text-muted-foreground">
            // no posts available right now
          </div>
        )}
        {posts && posts.length > 0 && (
          <ul className="list-none m-0 p-0">
            {pagedPosts.map((p, i) => {
              const globalIndex = (clampedPage - 1) * PAGE_SIZE + i + 1;
              const description = getPostListingDescription(p);
              const meta = `${new Date(p.publishedAt).toLocaleDateString(
                undefined,
                {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                },
              )} · ${(p.views ?? 0).toLocaleString()} views · ${p.readTimeInMinutes} min`;
              return (
                <li key={p.id} className="border-b hairline last:border-b-0">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex gap-3 md:gap-4 py-6 md:py-8 transition-colors hover:bg-foreground/5"
                  >
                    <span className="font-mono-pair text-xs text-muted-foreground tabular-nums shrink-0 w-7 pt-1">
                      {String(globalIndex).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="font-display text-lg md:text-2xl uppercase leading-tight">
                          {p.title}
                        </h2>
                        <ArrowUpRight
                          className="shrink-0 h-4 w-4 md:h-5 md:w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground mt-0.5"
                          strokeWidth={1.25}
                        />
                      </div>
                      {description ? (
                        <p className="font-ntype text-[0.9375rem] md:text-base text-muted-foreground leading-relaxed">
                          {description}
                        </p>
                      ) : null}
                      <p className="font-mono-pair text-[10px] md:text-xs uppercase tracking-[0.12em] text-muted-foreground">
                        {meta}
                      </p>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {posts && posts.length > PAGE_SIZE && (
        <nav
          className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t hairline pt-6 font-mono-pair text-xs uppercase tracking-[0.2em] text-muted-foreground"
          aria-label="Blog post pagination"
        >
          <button
            type="button"
            disabled={clampedPage <= 1}
            onClick={() =>
              setPage((x) => {
                const c = Math.min(Math.max(1, x), totalPages);
                return Math.max(1, c - 1);
              })
            }
            className="hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            ← prev
          </button>
          <span className="tabular-nums">
            page {clampedPage} / {totalPages}
          </span>
          <button
            type="button"
            disabled={clampedPage >= totalPages}
            onClick={() =>
              setPage((x) => {
                const c = Math.min(Math.max(1, x), totalPages);
                return Math.min(totalPages, c + 1);
              })
            }
            className="hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            next →
          </button>
        </nav>
      )}

      <div className="relative mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono-pair text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">
          ← index
        </Link>
        <span className="text-foreground/30 hidden sm:inline">·</span>
        <a
          href={`https://${PROFILE.hashnodeHost}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
        >
          hashnode publication
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.25} />
        </a>
      </div>
    </div>
  );
}
