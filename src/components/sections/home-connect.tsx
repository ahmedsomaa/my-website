import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function HomeConnect() {
  return (
    <section className="mx-auto max-w-7xl px-6 md:px-10 py-28 md:py-36">
      <p className="font-mono-pair text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
        04 / Connect
      </p>
      <h2 className="font-display text-2xl md:text-4xl uppercase tracking-tight max-w-3xl">
        Let&apos;s build something thoughtful.
      </h2>
      <p className="mt-5 max-w-2xl font-ntype text-sm md:text-base text-muted-foreground leading-relaxed">
        Open for selective collaborations where product clarity, execution
        quality, and long-term maintainability matter.
      </p>
      <div className="mt-10">
        <Link
          to="/contact"
          className="group inline-flex items-center gap-2 border hairline px-6 py-3 text-xs uppercase tracking-[0.25em] font-mono-pair bg-foreground text-background hover:bg-background hover:text-foreground transition-colors"
        >
          Contact
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.25}
          />
        </Link>
      </div>
    </section>
  );
}
