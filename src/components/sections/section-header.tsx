interface Props {
  index: string;
  label: string;
  title: string;
  /** Optional editorial line under the title (NType82). */
  subtitle?: string;
}

export default function SectionHeader({
  index,
  label,
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground font-mono-pair mb-4">
        <span>{index}</span>
        <span className="h-px w-10 bg-foreground/30" />
        <span>{label}</span>
      </div>
      <h2 className="font-display text-2xl md:text-4xl uppercase tracking-tight">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 max-w-2xl font-ntype text-base md:text-lg text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
