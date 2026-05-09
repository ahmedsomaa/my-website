import { FormEvent, useState } from "react";
import { usePageAccent, PAGE_ACCENTS } from "@/hooks/use-page-accent";
import { PROFILE } from "@/data/portfolio";

export default function Contact() {
  usePageAccent(PAGE_ACCENTS.contact);
  const [sent, setSent] = useState(false);

  const calendlyReady = PROFILE.calendlyUrl && PROFILE.calendlyUrl !== "#";

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const trap = String(data.get("company") ?? "");
    if (trap) return;

    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const body = String(data.get("message") ?? "").trim();
    if (!from || !body) return;

    const subject = encodeURIComponent(`Portfolio — ${name || "Contact"}`);
    const mailBody = encodeURIComponent(`${body}\n\n— ${name}\n${from}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${mailBody}`;
    setSent(true);
  }

  return (
    <div className="relative mx-auto max-w-4xl px-6 md:px-10 pt-20 pb-10">
      <div className="absolute inset-x-0 top-0 h-[420px] notification-dots pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[420px] accent-glow pointer-events-none" />
      <header className="relative mb-16 md:mb-20">
        <p className="font-mono-pair text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
          04 / contact — compose ~/message
        </p>
        <h1 className="font-display text-4xl md:text-6xl leading-[0.95] max-w-4xl">
          my <span className="text-accent-page">inbox</span> is open — say
          hello.
        </h1>
      </header>

      <div className="relative w-full space-y-10 border hairline bg-background p-6 md:p-10">
        {calendlyReady ? (
          <a
            href={PROFILE.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex border hairline px-5 py-3 text-xs uppercase tracking-[0.25em] font-mono-pair hover:bg-foreground hover:text-background transition-colors"
          >
            Schedule a 15-min intro
          </a>
        ) : null}

        <form onSubmit={onSubmit} className="space-y-5">
          <p className="font-mono-pair text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            message
          </p>

          <label className="sr-only" htmlFor="contact-company">
            Company
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="absolute opacity-0 pointer-events-none h-0 w-0"
            aria-hidden
          />

          <div>
            <label
              htmlFor="contact-name"
              className="block font-mono-pair text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2"
            >
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              className="w-full border hairline bg-background px-4 py-3 font-ntype text-sm outline-none focus:border-ts-blue/60"
            />
          </div>
          <div>
            <label
              htmlFor="contact-email"
              className="block font-mono-pair text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2"
            >
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              className="w-full border hairline bg-background px-4 py-3 font-ntype text-sm outline-none focus:border-ts-blue/60"
            />
          </div>
          <div>
            <label
              htmlFor="contact-message"
              className="block font-mono-pair text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              className="w-full border hairline bg-background px-4 py-3 font-ntype text-sm outline-none focus:border-ts-blue/60 resize-y min-h-[120px]"
            />
          </div>

          <button
            type="submit"
            className="border hairline px-6 py-3 text-xs uppercase tracking-[0.25em] font-mono-pair hover:bg-foreground hover:text-background transition-colors"
          >
            Contact me
          </button>

          {sent && (
            <p
              className="font-ntype text-sm text-muted-foreground"
              role="status"
            >
              Thanks — your mail client should open. I’ll reply within 24h when
              this lands in my inbox.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
