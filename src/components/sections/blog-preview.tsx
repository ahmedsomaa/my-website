import { useEffect, useState } from "react";
import { fetchLatestPosts, HashnodePost } from "@/lib/hashnode";
import SectionHeader from "./section-header";
import { ArrowUpRight } from "lucide-react";

export default function BlogPreview() {
  const [posts, setPosts] = useState<HashnodePost[] | null>(null);

  useEffect(() => {
    fetchLatestPosts().then(setPosts);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
      <SectionHeader index="04" label="writing" title="Notes from the field" />

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
        {posts && posts.map((p, i) => (
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
              <h3 className="font-display text-lg md:text-2xl uppercase leading-tight">
                {p.title}
              </h3>
              <p className="mt-2 font-mono-pair text-xs md:text-sm text-muted-foreground line-clamp-2">
                {p.brief}
              </p>
            </div>
            <div className="hidden md:block md:col-span-3 font-mono-pair text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {new Date(p.publishedAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" })}
              <span className="mx-2">·</span>
              {p.readTimeInMinutes}m
            </div>
            <ArrowUpRight className="hidden md:block md:col-span-1 ml-auto h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" strokeWidth={1.25} />
          </a>
        ))}
      </div>

      <div className="mt-6 font-mono-pair text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <a href="https://som3aware.hashnode.dev" target="_blank" rel="noreferrer" className="hover:text-foreground">
          → all posts on hashnode
        </a>
      </div>
    </section>
  );
}