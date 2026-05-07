import SectionHeader from "@/components/sections/section-header";
import { usePageAccent, PAGE_ACCENTS } from "@/hooks/use-page-accent";

type TimelineItem = {
  id: string;
  period: { from: string; to: string };
  title: string;
  org: string;
  description?: string;
};

export default function About() {
  usePageAccent(PAGE_ACCENTS.about);
  const experience: TimelineItem[] = [
    {
      id: "1",
      period: { from: "Jan, 2024", to: "present" },
      org: "Eignspaces",
      title: "Growth Engineer",
      description:
        "Owned core full-stack features across Hivo and Reconciled, improving delivery through refactoring and analytics.",
    },
    {
      id: "2",
      period: { from: "May, 2023", to: "Dec, 2023" },
      org: "Nodogoro",
      title: "Software Engineer II",
      description:
        "Developed multiple LLM-powered applications using OpenAI, LangChain and Next.js.",
    },
    {
      id: "3",
      period: { from: "Nov, 2021", to: "May, 2023" },
      org: "New Smart Egypt",
      title: "Software Engineer I",
      description:
        "Worked on building web/mobile apps and integrating between multiple vendor systems.",
    },
    {
      id: "4",
      period: { from: "Jul, 2020", to: "Oct, 2021" },
      org: "VOIS",
      title: "Software Engineer",
      description:
        "Worked on building and providing technical support for multiple web apps.",
    },
  ] as const;

  const education: TimelineItem[] = [
    {
      id: "1",
      org: "Arizona State University",
      title: "Masters of Science in Engineering in Software Engineering",
      period: { from: "Jan, 2022", to: "Dec, 2023" },
    },
    {
      id: "2",
      org: "The American University in Cairo",
      title: "Bachelor of Science in Computer Engineering",
      period: { from: "Sep, 2014", to: "Aug, 2019" },
    },
  ] as const;

  return (
    <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-20 pb-10">
      <div className="absolute inset-x-0 top-0 h-[420px] grid-vercel-dense pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[420px] accent-glow pointer-events-none" />
      <header className="relative mb-16 md:mb-24">
        <p className="font-mono-pair text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
          01 / about — cd ~/about
        </p>
        <h1 className="font-display text-4xl md:text-6xl leading-[0.95] max-w-4xl">
          a <span className="text-accent-page">software engineer</span> who
          builds products to captivate and delight users.
        </h1>
      </header>

      <section className="relative mb-20 max-w-3xl space-y-6">
        <SectionHeader index="02" label="about" title="About me" />
        <p className="font-ntype text-sm md:text-base leading-relaxed text-muted-foreground">
          I&apos;m Ahmed Ismail, a Full-Stack Engineer focused on building
          scalable, user-centered products. My work sits at the intersection of
          engineering and design-where systems are not only reliable, but feel
          intuitive and refined to use.
        </p>
        <p className="font-ntype text-sm md:text-base leading-relaxed text-muted-foreground">
          I&apos;ve worked across product and enterprise environments,
          contributing to platforms that scale, evolve, and deliver real impact.
          I care about the details that shape great user experiences, while
          maintaining a strong focus on performance, maintainability, and
          long-term product quality.
        </p>
      </section>

      <section className="relative mb-20">
        <SectionHeader index="03" label="focus" title="What I focus on" />
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border hairline">
          {[
            "Building systems that scale without sacrificing user experience",
            "Turning complex ideas into simple, usable products",
            "Balancing speed of delivery with long-term quality",
            "Collaborating closely with product and design to ship meaningful features",
          ].map((item) => (
            <li
              key={item}
              className="bg-background p-5 md:p-6 font-ntype text-sm text-muted-foreground leading-relaxed"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="relative mb-20">
        <SectionHeader index="04" label="experience" title="Experience" />
        <Timeline items={experience} />
      </section>

      <section className="relative mb-20">
        <SectionHeader index="05" label="education" title="Education" />
        <Timeline items={education} />
      </section>

      <section className="mt-24 max-w-3xl">
        <SectionHeader index="06" label="note" title="Personal note" />
        <p className="font-ntype text-sm md:text-base leading-relaxed text-muted-foreground">
          Outside of work, I enjoy reading about history and technology,
          drawing, watching football, and exploring new ideas across engineering
          and design.
        </p>
      </section>
    </div>
  );
}

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative border-l hairline pl-6 md:pl-10 space-y-10">
      {items.map((item) => (
        <li key={item.id} className="relative">
          <span className="absolute -left-[16px] md:-left-[18px] top-1 h-2.5 w-2.5 bg-background border hairline" />
          <p className="font-mono-pair text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            {item.period.from} - {item.period.to}
          </p>
          <h3 className="mt-1 font-display uppercase text-lg md:text-2xl">
            {item.title}
          </h3>
          <p className="mt-1 font-mono-pair text-sm text-foreground/80">
            <span className="text-muted-foreground">@</span> {item.org}
          </p>
          {item.description ? (
            <p className="mt-3 max-w-3xl font-ntype text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
