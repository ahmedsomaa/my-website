import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { usePageAccent, PAGE_ACCENTS } from "@/hooks/use-page-accent";
import { fetchAllPosts, type HashnodePost } from "@/lib/hashnode";
import { PROFILE } from "@/data/portfolio";

export default function BlogIndex() {
  usePageAccent(PAGE_ACCENTS.blog);
  const [posts, setPosts] = useState<HashnodePost[] | null>(null);

  useEffect(() => {
    fetchAllPosts(PROFILE.hashnodeHost).then(setPosts);
  }, []);

  return (
    <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-20 pb-10">
      <div className="absolute inset-x-0 top-0 h-[420px] grid-dot pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[420px] accent-glow pointer-events-none" />
      <header className="relative mb-16 md:mb-20">
        <p className="font-mono-pair text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
          04 / writing — cat ~/posts/*.md
        </p>
        <h1 className="font-display text-4xl md:text-6xl leading-[0.95] max-w-4xl">
          notes from the <span className="text-accent-page">field</span>, published in full.
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
        {posts &&
          posts.map((p, i) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="group grid grid-cols-12 items-baseline gap-4 border-b hairline py-6 md:py-8 transition-colors hover:bg-foreground/5"
            >
              <span className="col-span-1 font-mono-pair text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="col-span-11 md:col-span-7">
                <h2 className="font-display text-lg md:text-2xl uppercase leading-tight">{p.title}</h2>
                <p className="mt-2 font-mono-pair text-xs md:text-sm text-muted-foreground line-clamp-3 md:line-clamp-2">
                  {p.brief}
                </p>
              </div>
              <div className="hidden md:block md:col-span-3 font-mono-pair text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {new Date(p.publishedAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
                <span className="mx-2">·</span>
                {p.readTimeInMinutes}m
              </div>
              <ArrowUpRight
                className="hidden md:block md:col-span-1 ml-auto h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                strokeWidth={1.25}
              />
            </a>
          ))}
      </div>

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
