import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { usePageAccent, PAGE_ACCENTS } from "@/hooks/use-page-accent";
import { HOME_MOTION_EASE } from "@/components/home-section-motion";
import { ProgressiveImage } from "@/components/progressive-image";
import { PROFILE } from "@/data/portfolio";

type TimelineItem = {
  id: string;
  period: { from: string; to: string };
  title: string;
  org: string;
  orgUrl?: string;
  description?: string;
};

type JourneyItem = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: { label: string; text: string }[];
  imageHint: string;
  imageSrc?: string;
  brandLabel?: string;
};

const aboutIntroEmphasis =
  "font-medium text-foreground underline decoration-dashed decoration-accent-page decoration-2 underline-offset-[5px]";

export default function About() {
  usePageAccent(PAGE_ACCENTS.about);
  const reduceMotion = useReducedMotion() === true;
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
      imageSrc: "/images/programming-origins.webp",
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
      imageSrc: "/images/vois.webp",
    },
    {
      id: "03",
      title: "Life Beyond Code",
      paragraphs: [
        "When I'm not behind a screen, I find balance through reading—particularly history and novels—and listening to music. I also enjoy drawing and have a long-standing passion for watching football.",
        "On a personal note, meeting Radwa Hany was a turning point in my life; I was captivated from the moment we met and knew immediately she was the one. We are married now, and happily busy with the renovations of our apartment. Family always comes first, and I feel incredibly fortunate to see mine growing — gaining not just a partner in Radwa, but a whole new family in hers.",
      ],
      imageHint: "Personal life and grounding",
      imageSrc: "/images/beyond-code.webp",
    },
    {
      id: "04",
      title: "These days",
      paragraphs: [
        "Currently, I serve as a Growth Engineer at Eignspaces. I'm working closely with my friend, Ahmed Elghannam, to scale the company and build in-house products that solve real-world problems. A recent highlight of our work is Reconciled, which was successfully acquired by LaborEdge.",
        "In addition to my engineering work, I am passionate about mentorship. I enjoy guiding junior engineers through the software development lifecycle, helping them navigate their career growth and teaching them how to leverage AI effectively to build high-quality features. Even in my downtime, I’m usually experimenting with new technologies through side projects or sharing my insights through technical blogging.",
      ],
      imageHint: "Growth engineering today",
      brandLabel: "Eignspaces",
    },
  ] as const;

  const experience: TimelineItem[] = [
    {
      id: "1",
      period: { from: "Jan, 2024", to: "present" },
      org: "Eignspaces",
      title: "Growth Engineer",
      description:
        "I built Hivo—mobile-first rentals for Saudi Arabia—and Reconciled (staffing invoice reconciliation, LaborEdge). I'm scaling Eignspaces with enterprise clients and in-house apps",
    },
    {
      id: "2",
      period: { from: "May, 2023", to: "Dec, 2023" },
      org: "Nodogoro",
      orgUrl: "https://www.nodogoro.com/",
      title: "Software Engineer II",
      description:
        "I shipped LLM-powered products: voice- and video-generated notes, resume screening workflows, and a Slack bot answering from multiple sources—OpenAI, LangChain, Next.js",
    },
    {
      id: "3",
      period: { from: "Nov, 2021", to: "May, 2023" },
      org: "New Smart Egypt",
      orgUrl:
        "https://www.linkedin.com/company/new-smart-egypt-integrated-solutions",
      title: "Software Engineer I",
      description:
        "I delivered the ECARD fertilizer mobile app for the Egyptian Company for Agriculture and Rural Development, Ramsis railway Wi-Fi portal (ads, analytics), and ZKTeco with Odoo, Oracle, and Infor",
    },
    {
      id: "4",
      period: { from: "Jul, 2020", to: "Oct, 2021" },
      org: "VOIS",
      orgUrl: "https://www.linkedin.com/company/vois/",
      title: "Software Engineer",
      description:
        "I built and supported web software across an HR management system, a digital twin, and a COVID tracker and monitoring tool for authorities coordinating the pandemic response",
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

  const interestCells = [
    {
      key: "reading",
      label: "Reading",
      body: "History, technology, and long-form essays on systems and society.",
    },
    {
      key: "writing",
      label: "Writing",
      body: "Notes on product decisions, implementation trade-offs, and lessons from shipping.",
    },
    {
      key: "exploration",
      label: "Exploration",
      body: "Experimenting with new tools, interaction patterns, and small creative side projects.",
    },
    {
      key: "life",
      label: "Life",
      body: "Family, football, and quiet time that keeps perspective and energy grounded.",
    },
  ] as const;

  return (
    <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-20 pb-10">
      <div className="absolute inset-x-0 top-0 h-[420px] about-hero-grid-shell overflow-hidden pointer-events-none">
        <div
          className="absolute left-1/2 top-1/2 size-[200vmax] -translate-x-1/2 -translate-y-1/2 grid-vercel-dense-blend rotate-45"
          aria-hidden
        />
      </div>
      <div className="absolute inset-x-0 top-0 h-[420px] accent-glow pointer-events-none" />

      <motion.header
        className="relative mb-16 md:mb-24"
        initial={reduceMotion ? false : { opacity: 0, y: 22 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.58, ease: HOME_MOTION_EASE }}
      >
        <p className="font-mono-pair text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
          01 / about - cd ~/about
        </p>
        <h1 className="font-display text-4xl md:text-6xl leading-[0.95] max-w-4xl">
          <span className="block">
            my <span className="text-accent-page">journey</span>
          </span>
          <span className="block mt-2 md:mt-3">as an engineer.</span>
        </h1>
      </motion.header>

      <section className="relative mb-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18, margin: "0px 0px -56px 0px" }}
          transition={{ duration: 0.52, ease: HOME_MOTION_EASE }}
        >
          <div className="mb-6">
            <div className="flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground font-mono-pair mb-4">
              <span>01</span>
              <span className="h-px w-10 bg-foreground/30" />
              <span>about</span>
            </div>
          </div>
          <p className="mb-4 flex flex-wrap items-baseline gap-x-1.5 text-xl md:text-2xl leading-tight">
            <span className="font-display">&ldquo;hello there&rdquo;</span>
            <sub className="font-mono-pair text-muted-foreground normal-case text-[0.55em] tracking-[0.06em] not-italic">
              Obi-Wan Kenobi
            </sub>
          </p>
          <p className="max-w-2xl font-ntype text-base md:text-xl text-muted-foreground leading-relaxed mb-12">
            I am Ahmed Ismail, a full stack engineer based in{" "}
            <span className={aboutIntroEmphasis}>{PROFILE.location}</span>, with{" "}
            <span className={aboutIntroEmphasis}>
              {PROFILE.yearsOfExperience}+ years of experience
            </span>{" "}
            in the field, working mostly with the{" "}
            <span className={aboutIntroEmphasis}>MERN and PERN</span> stack.
            <br />
            <br />
            Here&apos;s a glimpse into my journey—enjoy the ride.
          </p>
        </motion.div>

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
              <motion.li
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_96px_minmax(0,1fr)] gap-6 md:gap-4 items-start"
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 28, x: idx % 2 === 0 ? -14 : 14 }
                }
                whileInView={
                  reduceMotion ? undefined : { opacity: 1, y: 0, x: 0 }
                }
                viewport={{
                  once: true,
                  amount: 0.14,
                  margin: "0px 0px -48px 0px",
                }}
                transition={{
                  duration: 0.58,
                  ease: HOME_MOTION_EASE,
                  delay: reduceMotion ? 0 : 0.05 + idx * 0.09,
                }}
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
                    <div
                      className={`aspect-[16/10] overflow-hidden border hairline ${
                        item.brandLabel
                          ? "flex items-center justify-center bg-black text-white dark:bg-white dark:text-black"
                          : "bg-muted/30"
                      }`}
                    >
                      {item.brandLabel ? (
                        <div
                          className="flex h-full w-full items-center justify-center"
                          role="img"
                          aria-label={item.imageHint}
                        >
                          <p className="font-display text-2xl md:text-3xl !normal-case px-6 text-center">
                            {item.brandLabel}
                          </p>
                        </div>
                      ) : (
                        <ProgressiveImage
                          alt={item.imageHint}
                          className="h-full w-full object-cover"
                          src={item.imageSrc!}
                          wrapperClassName="h-full w-full min-h-0"
                        />
                      )}
                    </div>
                    <p className="mt-3 font-mono-pair text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {item.imageHint}
                    </p>
                  </div>
                </aside>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <motion.section
        className="relative mb-20"
        initial={reduceMotion ? false : { opacity: 0, y: 36 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1, margin: "0px 0px -64px 0px" }}
        transition={{ duration: 0.54, ease: HOME_MOTION_EASE }}
      >
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
            {experience.map((item, i) => (
              <motion.li
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-[220px_40px_minmax(0,1fr)] gap-4 md:gap-8 items-start"
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  amount: 0.2,
                  margin: "0px 0px -40px 0px",
                }}
                transition={{
                  duration: 0.5,
                  ease: HOME_MOTION_EASE,
                  delay: reduceMotion ? 0 : 0.04 + i * 0.1,
                }}
              >
                <div className="md:col-start-1 md:justify-self-start md:max-w-xs text-left">
                  <p className="font-display text-lg md:text-xl leading-tight">
                    {item.orgUrl ? (
                      <a
                        href={item.orgUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline-offset-4 hover:underline decoration-foreground/35"
                      >
                        {item.org}
                      </a>
                    ) : (
                      item.org
                    )}
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
              </motion.li>
            ))}
          </ol>
        </div>
      </motion.section>

      <motion.section
        className="relative mb-20"
        initial={reduceMotion ? false : { opacity: 0, y: 32 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.11, margin: "0px 0px -64px 0px" }}
        transition={{ duration: 0.52, ease: HOME_MOTION_EASE }}
      >
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
          {education.map((item, i) => (
            <motion.li
              key={item.id}
              className="py-5 md:py-6 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-2 md:gap-6"
              initial={reduceMotion ? false : { opacity: 0, x: -16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{
                once: true,
                amount: 0.22,
                margin: "0px 0px -32px 0px",
              }}
              transition={{
                duration: 0.48,
                ease: HOME_MOTION_EASE,
                delay: reduceMotion ? 0 : 0.05 + i * 0.12,
              }}
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
            </motion.li>
          ))}
        </ol>
      </motion.section>

      <motion.section
        className="relative mb-20"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1, margin: "0px 0px -56px 0px" }}
        transition={{ duration: 0.52, ease: HOME_MOTION_EASE }}
      >
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
          {interestCells.map((cell, i) => (
            <motion.div
              key={cell.key}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.25,
                margin: "0px 0px -32px 0px",
              }}
              transition={{
                duration: 0.46,
                ease: HOME_MOTION_EASE,
                delay: reduceMotion ? 0 : 0.04 + i * 0.075,
              }}
            >
              <p className="font-mono-pair text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {cell.label}
              </p>
              <p className="mt-2 font-ntype text-sm md:text-base text-foreground/90">
                {cell.body}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="relative border-t hairline pt-10 max-w-3xl"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2, margin: "0px 0px -48px 0px" }}
        transition={{ duration: 0.55, ease: HOME_MOTION_EASE }}
      >
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
        <motion.div
          className="mt-2"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.45,
            ease: HOME_MOTION_EASE,
            delay: reduceMotion ? 0 : 0.1,
          }}
        >
          <a
            href={PROFILE.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center border hairline px-6 py-3 text-xs uppercase tracking-[0.25em] font-mono-pair hover:bg-foreground hover:text-background transition-colors"
          >
            Download Resume
          </a>
        </motion.div>
      </motion.section>
    </div>
  );
}
