import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { usePageAccent, PAGE_ACCENTS } from "@/hooks/use-page-accent";
import { PROFILE } from "@/data/portfolio";

type TimelineItem = {
  id: string;
  period: { from: string; to: string };
  title: string;
  org: string;
  description?: string;
};

type JourneyItem = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: { label: string; text: string }[];
  imageHint: string;
};

export default function About() {
  usePageAccent(PAGE_ACCENTS.about);
  const journeyRef = useRef<HTMLDivElement | null>(null);
  const roadPathRef = useRef<SVGPathElement | null>(null);
  const workRef = useRef<HTMLDivElement | null>(null);
  const workPathRef = useRef<SVGPathElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ["start 80%", "end 35%"],
  });
  const { scrollYProgress: workScrollYProgress } = useScroll({
    target: workRef,
    offset: ["start 80%", "end 35%"],
  });
  const [thumbPoint, setThumbPoint] = useState({ x: 60, y: 0 });
  const [workThumbPoint, setWorkThumbPoint] = useState({ x: 20, y: 0 });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const path = roadPathRef.current;
    if (!path) return;
    const clamped = Math.min(Math.max(value, 0), 1);
    const total = path.getTotalLength();
    const point = path.getPointAtLength(total * clamped);
    setThumbPoint({ x: point.x, y: point.y });
  });

  useMotionValueEvent(workScrollYProgress, "change", (value) => {
    const path = workPathRef.current;
    if (!path) return;
    const clamped = Math.min(Math.max(value, 0), 1);
    const total = path.getTotalLength();
    const point = path.getPointAtLength(total * clamped);
    setWorkThumbPoint({ x: point.x, y: point.y });
  });

  useEffect(() => {
    const path = roadPathRef.current;
    if (!path) return;
    const clamped = Math.min(Math.max(scrollYProgress.get(), 0), 1);
    const total = path.getTotalLength();
    const point = path.getPointAtLength(total * clamped);
    setThumbPoint({ x: point.x, y: point.y });
  }, [scrollYProgress]);

  useEffect(() => {
    const path = workPathRef.current;
    if (!path) return;
    const clamped = Math.min(Math.max(workScrollYProgress.get(), 0), 1);
    const total = path.getTotalLength();
    const point = path.getPointAtLength(total * clamped);
    setWorkThumbPoint({ x: point.x, y: point.y });
  }, [workScrollYProgress]);

  const journey: JourneyItem[] = [
    {
      id: "01",
      title: "My programming origins",
      paragraphs: [
        "My fascination with computers began in my childhood during visits to the countryside. I remember rushing to use my cousin’s computer—he was the first in our family to own one—just to explore apps and surf the early internet. This passion was soon rewarded; after ranking at the top of my entire governorate in sixth grade, I received my first laptop as an award.",
        "In preparatory school, I moved beyond just using computers to managing them, learning the basics of system administration like OS installation. This was also where I wrote my first lines of code. Using Visual Basic .NET, I built foundational applications like calculators and tools to compute the area and circumference of engineering shapes. This spark stayed with me through high school, leading me to pursue a degree at AUC, where I eventually specialized in web development through courses in HTML, CSS, and JavaScript.",
      ],
      imageHint: "Early days and first laptop",
    },
    {
      id: "02",
      title: "Finding My Way to Web",
      paragraphs: [
        "During my final two years of college (2018–2019), I completed two pivotal internships at VOIS.",
        "Mobile Development: In my first month-long internship, I dove into the MERN stack (React Native, Node.js, MongoDB, Express), successfully building two mobile applications.",
        "Web Development: My second internship spanned four months, where I transitioned to React to build two web applications from scratch.",
        "These experiences solidified my expertise, and shortly after hiring opened, I joined the team full-time as a Full-Stack Software Engineer.",
      ],
      imageHint: "Internships and first shipped apps",
    },
    {
      id: "03",
      title: "Life Beyond Code",
      paragraphs: [
        "When I’m not behind a screen, I find balance through reading—particularly history and novels—and listening to music. I also enjoy drawing and have a long-standing passion for watching football.",
        "On a personal note, meeting Radwa Hany was a turning point in my life; I was captivated from the moment we met and knew immediately she was the one. We are currently engaged and happily busy with the renovations of our apartment. As we plan for our wedding in a few months, I’m reminded that family always comes first. I feel incredibly fortunate to see my family growing, gaining not just a partner in Radwa, but a whole new family in hers.",
      ],
      imageHint: "Personal life and grounding",
    },
    {
      id: "04",
      title: "These days",
      paragraphs: [
        "Currently, I serve as a Growth Engineer at Eignspaces. I’m working closely with my friend, Ahmed Elghannam, to scale the company and build in-house products that solve real-world problems. A recent highlight of our work is Reconciled, which was successfully acquired by LaborEdge.",
        "In addition to my engineering work, I am passionate about mentorship. I enjoy guiding junior engineers through the software development lifecycle, helping them navigate their career growth and teaching them how to leverage AI effectively to build high-quality features. Even in my downtime, I’m usually experimenting with new technologies through side projects or sharing my insights through technical blogging.",
      ],
      imageHint: "Growth engineering today",
    },
  ] as const;

  const experience: TimelineItem[] = [
    {
      id: "1",
      period: { from: "Jan, 2024", to: "present" },
      org: "Eignspaces",
      title: "Growth Engineer",
      description:
        "Leading growth-oriented product initiatives, shipping in-house features, and collaborating across design and engineering to improve delivery quality.",
    },
    {
      id: "2",
      period: { from: "May, 2023", to: "Dec, 2023" },
      org: "Nodogoro",
      title: "Software Engineer II",
      description:
        "Built and delivered product features with a focus on frontend quality, maintainability, and faster iteration across the stack.",
    },
    {
      id: "3",
      period: { from: "Nov, 2021", to: "May, 2023" },
      org: "New Smart Egypt",
      title: "Software Engineer I",
      description:
        "Developed web and mobile solutions, integrated vendor systems, and contributed to production workflows used by external clients.",
    },
    {
      id: "4",
      period: { from: "Jul, 2020", to: "Oct, 2021" },
      org: "VOIS",
      title: "Software Engineer",
      description:
        "Delivered enterprise software features and technical support while strengthening foundations in scalable full-stack engineering.",
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
          01 / about - cd ~/about
        </p>
        <h1 className="font-display text-4xl md:text-5xl leading-[0.95] max-w-4xl">
          my <span className="text-accent-page">journey</span> as an engineer.
        </h1>
      </header>

      <section className="relative mb-24">
        <div className="mb-6">
          <div className="flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground font-mono-pair mb-4">
            <span>01</span>
            <span className="h-px w-10 bg-foreground/30" />
            <span>about</span>
          </div>
        </div>
        <p className="max-w-3xl font-ntype text-base md:text-xl text-muted-foreground leading-relaxed mb-12">
          Here&apos;s a quick glimpse about me and what I love to do.
        </p>

        <div ref={journeyRef} className="relative">
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-6 bottom-6 hidden md:block">
            <svg
              className="h-full w-[120px]"
              viewBox="0 0 120 1000"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                ref={roadPathRef}
                d="M60 20 C20 130, 100 230, 60 340 C20 450, 100 550, 60 660 C20 770, 100 870, 60 980"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="4 8"
              />
              <motion.path
                d="M60 20 C20 130, 100 230, 60 340 C20 450, 100 550, 60 660 C20 770, 100 870, 60 980"
                fill="none"
                stroke="hsl(var(--accent-page))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pathLength: scrollYProgress }}
              />
              <circle
                cx={thumbPoint.x}
                cy={thumbPoint.y}
                r="6"
                fill="hsl(var(--accent-page))"
                stroke="hsl(var(--background))"
                strokeWidth="2.5"
                style={{
                  filter:
                    "drop-shadow(0 0 0.18rem hsl(var(--accent-page) / 0.45))",
                }}
              />
            </svg>
          </div>

          <ol className="space-y-12 md:space-y-20">
            {journey.map((item, idx) => (
              <li
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_96px_minmax(0,1fr)] gap-6 md:gap-4 items-start"
              >
                <article
                  className={`${
                    idx % 2 === 0
                      ? "md:col-start-1 md:justify-self-end"
                      : "md:col-start-3 md:justify-self-start"
                  } md:row-start-1 md:max-w-xl`}
                >
                  <h3 className="font-display text-2xl md:text-3xl leading-tight !normal-case">
                    {item.title}
                  </h3>
                  <div className="mt-4 space-y-4">
                    {item.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="font-ntype text-sm md:text-base leading-relaxed text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {item.bullets ? (
                      <ul className="space-y-2">
                        {item.bullets.map((bullet) => (
                          <li
                            key={bullet.label}
                            className="font-ntype text-sm md:text-base leading-relaxed text-muted-foreground"
                          >
                            <span className="font-mono-pair text-[11px] uppercase tracking-[0.18em] text-foreground">
                              {bullet.label}:
                            </span>{" "}
                            {bullet.text}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </article>

                <div className="hidden md:block md:col-start-2 md:row-start-1" />

                <aside
                  className={`${
                    idx % 2 === 0
                      ? "md:col-start-3 md:justify-self-start"
                      : "md:col-start-1 md:justify-self-end"
                  } md:row-start-1 md:w-full md:max-w-none`}
                >
                  <div
                    className={`border hairline bg-background p-4 md:p-5 ${
                      idx % 2 === 0 ? "rotate-[2deg]" : "-rotate-[2deg]"
                    }`}
                  >
                    <div className="aspect-[16/10] bg-gradient-to-br from-muted/60 to-background border hairline" />
                    <p className="mt-3 font-mono-pair text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {item.imageHint}
                    </p>
                  </div>
                </aside>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative mb-20">
        <div className="mb-6">
          <div className="flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground font-mono-pair mb-4">
            <span>02</span>
            <span className="h-px w-10 bg-foreground/30" />
            <span>experience</span>
          </div>
        </div>
        <p className="max-w-3xl font-ntype text-base md:text-xl text-muted-foreground leading-relaxed mb-12">
          My work history timeline
        </p>

        <div ref={workRef} className="relative">
          <div className="pointer-events-none absolute left-[272px] -translate-x-1/2 top-4 bottom-4 hidden md:block">
            <svg
              className="h-full w-[40px]"
              viewBox="0 0 40 1000"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M20 0 L20 1000"
                fill="none"
                stroke="hsl(var(--accent-page))"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <motion.path
                ref={workPathRef}
                d="M20 0 L20 1000"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="2.8"
                strokeLinecap="round"
                style={{ pathLength: workScrollYProgress }}
              />
            </svg>
            <span
              className="absolute h-4 w-4 rounded-full bg-background border-2 border-[hsl(var(--accent-page))] shadow-[0_0_0_4px_hsl(var(--background))]"
              style={{
                left: `${workThumbPoint.x}px`,
                top: `${(workThumbPoint.y / 1000) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>

          <ol className="space-y-10 md:space-y-14">
            {experience.map((item) => (
              <li
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-[220px_40px_minmax(0,1fr)] gap-4 md:gap-8 items-start"
              >
                <div className="md:col-start-1 md:justify-self-start md:max-w-xs text-left">
                  <p className="font-display text-lg md:text-xl leading-tight">
                    {item.org}
                  </p>
                  <p className="mt-1 font-mono-pair text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {item.period.from} - {item.period.to}
                  </p>
                </div>

                <div className="hidden md:block md:col-start-2" />

                <div className="md:col-start-3 md:max-w-xl">
                  <p className="font-display text-xl md:text-2xl leading-tight">
                    {item.title}
                  </p>
                  <p className="mt-3 font-ntype text-sm md:text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative mb-20">
        <div className="mb-6">
          <div className="flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground font-mono-pair mb-4">
            <span>03</span>
            <span className="h-px w-10 bg-foreground/30" />
            <span>education</span>
          </div>
        </div>
        <p className="max-w-3xl font-ntype text-base md:text-xl text-muted-foreground leading-relaxed mb-12">
          My academic path.
        </p>
        <ol className="max-w-4xl border-y hairline divide-y divide-border">
          {education.map((item) => (
            <li
              key={item.id}
              className="py-5 md:py-6 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-2 md:gap-6"
            >
              <p className="font-mono-pair text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {item.period.from} - {item.period.to}
              </p>
              <div>
                <p className="font-display text-lg md:text-xl uppercase leading-tight">
                  {item.title}
                </p>
                <p className="mt-2 font-ntype text-sm md:text-base text-muted-foreground">
                  {item.org}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="relative mb-20">
        <div className="mb-6">
          <div className="flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground font-mono-pair mb-4">
            <span>04</span>
            <span className="h-px w-10 bg-foreground/30" />
            <span>interests</span>
          </div>
        </div>
        <p className="max-w-3xl font-ntype text-base md:text-xl text-muted-foreground leading-relaxed mb-8">
          The interests that keep me curious.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 max-w-5xl">
          <div>
            <p className="font-mono-pair text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Reading
            </p>
            <p className="mt-2 font-ntype text-sm md:text-base text-foreground/90">
              History, technology, and long-form essays on systems and society.
            </p>
          </div>
          <div>
            <p className="font-mono-pair text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Writing
            </p>
            <p className="mt-2 font-ntype text-sm md:text-base text-foreground/90">
              Notes on product decisions, implementation trade-offs, and lessons
              from shipping.
            </p>
          </div>
          <div>
            <p className="font-mono-pair text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Exploration
            </p>
            <p className="mt-2 font-ntype text-sm md:text-base text-foreground/90">
              Experimenting with new tools, interaction patterns, and small
              creative side projects.
            </p>
          </div>
          <div>
            <p className="font-mono-pair text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Life
            </p>
            <p className="mt-2 font-ntype text-sm md:text-base text-foreground/90">
              Family, football, and quiet time that keeps perspective and energy
              grounded.
            </p>
          </div>
        </div>
      </section>

      <section className="relative border-t hairline pt-10 max-w-3xl">
        <div className="mb-6">
          <div className="flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground font-mono-pair mb-4">
            <span>05</span>
            <span className="h-px w-10 bg-foreground/30" />
            <span>resume</span>
          </div>
        </div>
        <p className="max-w-3xl font-ntype text-base md:text-xl text-muted-foreground leading-relaxed mb-8">
          Want the full timeline and technical background?
        </p>
        <div className="mt-2">
          <a
            href={PROFILE.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center border hairline px-6 py-3 text-xs uppercase tracking-[0.25em] font-mono-pair hover:bg-foreground hover:text-background transition-colors"
          >
            Download Resume
          </a>
        </div>
      </section>
    </div>
  );
}
