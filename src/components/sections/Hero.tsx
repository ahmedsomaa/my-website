import { ArrowUpRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import Typewriter from "@/components/Typewriter";
import { motion } from "framer-motion";
import { useMode } from "@/context/ModeContext";

export default function Hero() {
  const { mode } = useMode();
  return (
    <section className="relative">
      <div className={`absolute inset-0 ${mode === "raw" ? "grid-bg opacity-100" : "grid-bg opacity-30"}`} />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-20 md:pt-32 pb-24 md:pb-40">
        <div className="flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground font-mono-pair mb-8">
          <span className="h-1.5 w-1.5 bg-foreground" />
          <span>00 / hero</span>
          <span className="h-px w-12 bg-foreground/30" />
          <span>~/som3aware/index</span>
        </div>

        <h1 className="font-display uppercase leading-[0.95] text-[2.4rem] sm:text-6xl md:text-7xl lg:text-8xl max-w-5xl">
          <Typewriter text="Crafting" speed={70} />
          <br />
          <span className="text-foreground/60">
            <Typewriter text="elegant" speed={55} delay={700} />
          </span>{" "}
          <Typewriter text="products." speed={55} delay={1500} caret={false} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.6 }}
          className="mt-10 max-w-xl text-sm md:text-base text-muted-foreground font-mono-pair leading-relaxed"
        >
          I turn complex ideas into seamless digital experiences by blending design and functionality
          with a keen eye on the small things.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 0.5 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="mailto:hello@som3aware.dev"
            className="group inline-flex items-center gap-2 border hairline px-5 py-3 text-xs uppercase tracking-[0.25em] font-mono-pair hover:bg-foreground hover:text-background transition-colors"
          >
            Hire me
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.25} />
          </a>
          <a
            href="#"
            className="group inline-flex items-center gap-2 border hairline px-5 py-3 text-xs uppercase tracking-[0.25em] font-mono-pair hover:bg-foreground hover:text-background transition-colors"
          >
            Get my resume
            <Download className="h-4 w-4" strokeWidth={1.25} />
          </a>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-2 py-3 text-xs uppercase tracking-[0.25em] font-mono-pair text-muted-foreground hover:text-foreground transition-colors"
          >
            → 02 / projects
          </Link>
        </motion.div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border hairline">
          {[
            ["07+", "yrs experience"],
            ["TANTA", "Egypt · GMT+2"],
            ["som3aware", "@ everywhere"],
            ["2026", "current cycle"],
          ].map(([k, v]) => (
            <div key={k} className="bg-background p-5 md:p-6">
              <p className="font-display text-lg md:text-2xl uppercase">{k}</p>
              <p className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono-pair">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}