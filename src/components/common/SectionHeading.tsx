interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl'}>
      <span className="font-cosmic text-[11px] tracking-[0.24em] text-[#7465C9] uppercase block mb-3">
        {label}
      </span>
      <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#F1F3FA] tracking-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-[#8991A8] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
