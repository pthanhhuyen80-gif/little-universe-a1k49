import { classMeta } from '../../data/memories';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#B8C9FF]/10 py-10 px-4 sm:px-6 lg:px-8 text-center">
      <p className="font-display font-semibold text-sm text-[#F1F3FA] tracking-wider uppercase mb-1">
        {classMeta.websiteName} — {classMeta.editionLabel}
      </p>
      <p className="font-cosmic text-[10px] tracking-[0.2em] text-[#8991A8] uppercase">
        {classMeta.className} · {classMeta.schoolYear} · 19/11
      </p>
    </footer>
  );
}
