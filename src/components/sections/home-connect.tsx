import { ArrowUpRight } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import { getBookingContactHref, getCalComBookingUrl } from "@/data/portfolio";
import { HOME_MOTION_EASE } from "@/components/home-section-motion";

export default function HomeConnect() {
  const bookingCal = getCalComBookingUrl();
  const contactHref = getBookingContactHref();
  const reduceMotion = useReducedMotion() === true;

  return (
    <section className="mx-auto max-w-7xl px-6 md:px-10 py-28 md:py-36">
      <m.p
        className="font-mono-pair text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={reduceMotion ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.4, ease: HOME_MOTION_EASE }}
      >
        04 / Connect
      </m.p>
      <m.h2
        className="font-display text-2xl md:text-4xl uppercase tracking-tight max-w-3xl"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={reduceMotion ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.48,
          ease: HOME_MOTION_EASE,
          delay: reduceMotion ? 0 : 0.07,
        }}
      >
        Let&apos;s build something thoughtful.
      </m.h2>
      <m.div
        className="mt-10"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={reduceMotion ? undefined : { opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{
          duration: 0.45,
          ease: HOME_MOTION_EASE,
          delay: reduceMotion ? 0 : 0.16,
        }}
      >
        <a
          href={contactHref}
          target={bookingCal ? "_blank" : undefined}
          rel={bookingCal ? "noopener noreferrer" : undefined}
          className="group inline-flex items-center gap-2 border hairline px-6 py-3 text-xs uppercase tracking-[0.25em] font-mono-pair bg-foreground text-background hover:bg-background hover:text-foreground transition-colors"
        >
          Contact
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.25}
          />
        </a>
      </m.div>
    </section>
  );
}
