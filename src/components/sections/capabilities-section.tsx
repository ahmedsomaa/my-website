import type { LucideIcon } from "lucide-react";
import { LayoutTemplate, Server, Sparkles, Workflow } from "lucide-react";
import SectionHeader from "./section-header";

const CAPABILITIES: readonly {
  icon: LucideIcon;
  title: string;
  body: string;
}[] = [
  {
    icon: LayoutTemplate,
    title: "Build scalable frontend systems",
    body: "Design and develop fast, reliable interfaces that scale with product growth-focused on performance, maintainability, and seamless user experience.",
  },
  {
    icon: Server,
    title: "Design robust backend & APIs",
    body: "Architect backend systems and APIs that handle real-world complexity, ensuring data integrity, security, and smooth integrations.",
  },
  {
    icon: Sparkles,
    title: "Integrate AI into real products",
    body: "Apply AI to practical use cases-turning raw data into useful features like automation, insights, and intelligent workflows.",
  },
  {
    icon: Workflow,
    title: "Elevate product quality & workflows",
    body: "Improve performance, reduce technical debt, and streamline development processes to ship faster without sacrificing quality.",
  },
];

export default function CapabilitiesSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
      <SectionHeader index="02" label="capabilities" title="What I do" />

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border hairline">
        {CAPABILITIES.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.title}
              className="bg-background p-6 md:p-8 flex flex-col min-h-[200px] border-l-2 border-ts-blue pl-5 md:pl-6"
            >
              <Icon
                className="h-7 w-7 text-ts-blue shrink-0 mb-4"
                strokeWidth={1.25}
                aria-hidden
              />
              <h3 className="font-display text-lg md:text-xl uppercase leading-snug tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 font-ntype text-sm text-muted-foreground leading-relaxed">
                {item.body}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
