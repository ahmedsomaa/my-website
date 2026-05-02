import SectionHeader from "./SectionHeader";

export default function Intro() {
  return (
    <section className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
      <SectionHeader index="01" label="who" title="Hello, Ahmed Ismail here!" />

      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-7 space-y-6 text-sm md:text-base font-ntype leading-relaxed">
          <p>
            I’m a software engineer with{" "}
            <span className="text-accent-page">7+ years</span> of experience
            shipping products across startups and enterprises. I care about
            typography, taxonomy, and the quiet decisions that make interfaces
            feel inevitable.
          </p>
          <p className="text-muted-foreground">
            My work sits at the intersection of{" "}
            <span className="text-brand-css">design</span> and{" "}
            <span className="text-brand-ts">engineering</span>. I write{" "}
            <span className="text-brand-ts">TypeScript</span> that reads like
            prose, sketch interfaces in code, and treat documentation as a
            first-class artifact.
          </p>
          <p className="text-muted-foreground">
            Based in Tanta, Egypt — working with teams everywhere.
          </p>
        </div>
        <aside className="md:col-span-5 border hairline p-6 font-ntype text-xs md:text-sm">
          <p className="uppercase tracking-[0.25em] text-muted-foreground mb-4">
            // signal
          </p>
          <ul className="space-y-3">
            <li className="flex justify-between gap-4">
              <span className="text-muted-foreground">role</span>
              <span>Software / Design Engineer</span>
            </li>
            <li className="flex justify-between gap-4">
              <span className="text-muted-foreground">stack</span>
              <span>
                <span className="text-brand-ts">TS</span> ·{" "}
                <span className="text-brand-react">React</span> ·{" "}
                <span className="text-brand-node">Node</span> · Rust
              </span>
            </li>
            <li className="flex justify-between gap-4">
              <span className="text-muted-foreground">focus</span>
              <span>Product · DX · Systems</span>
            </li>
            <li className="flex justify-between gap-4">
              <span className="text-muted-foreground">status</span>
              <span className="text-accent-page">open to selective work</span>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
