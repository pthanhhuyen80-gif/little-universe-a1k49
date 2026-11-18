import { useState, useEffect } from 'react';
import { Menu, X, Music, VolumeX, Sparkles } from 'lucide-react';
import { useMusicPlayer } from '../../hooks/useMusicPlayer';

interface NavbarProps {
  activeSection: string;
}

const NAV_ITEMS = [
  { id: 'home', label: 'TRANG CHỦ', href: '#home' },
  { id: 'the-boys', label: 'CÁC BẠN NAM', href: '#the-boys' },
  { id: 'our-days', label: 'NHỮNG NGÀY THÁNG', href: '#our-days' },
  { id: 'a-note-for-the-boys', label: 'LỜI NHẮN', href: '#a-note-for-the-boys' },
];

export default function Navbar({ activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isPlaying, isMuted, togglePlay } = useMusicPlayer();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
        ? 'bg-[#050711]/82 backdrop-blur-xl border-b border-[#B8C9FF]/12 py-3.5 shadow-lg'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LITTLE UNIVERSE Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-3 group"
        >
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7465C9] to-[#253B75] flex items-center justify-center border border-[#B8C9FF]/30 shadow-[0_0_20px_rgba(116,101,201,0.4)] group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-[#F1F3FA]" />
          </span>
          <span className="font-display font-bold text-sm sm:text-base tracking-wider text-[#F1F3FA] uppercase">
            LITTLE UNIVERSE
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-full cosmic-glass">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-4 py-1.5 rounded-full font-cosmic text-[11px] font-medium tracking-wider uppercase transition-all duration-300 ${isActive
                  ? 'bg-[#7465C9] text-white shadow-[0_0_20px_rgba(116,101,201,0.45)]'
                  : 'text-[#8991A8] hover:text-[#F1F3FA] hover:bg-white/5'
                  }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Music Toggle & Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-cosmic text-[10px] font-medium tracking-wider uppercase border transition-all cursor-pointer ${isPlaying && !isMuted
              ? 'bg-[#7465C9]/25 border-[#7465C9] text-[#F1F3FA] shadow-[0_0_16px_rgba(116,101,201,0.35)]'
              : 'bg-[#0B1025]/80 border-[#B8C9FF]/20 text-[#B8C9FF] hover:border-[#7465C9]'
              }`}
            aria-label="Bật hoặc tắt nhạc nền"
          >
            {isPlaying && !isMuted ? (
              <Music className="w-3.5 h-3.5 text-[#B8C9FF] animate-pulse" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-[#8991A8]" />
            )}
            <span className="hidden sm:inline">
              {isPlaying ? 'NHẠC: BẬT' : 'NHẠC: TẮT'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl cosmic-glass text-[#B8C9FF] hover:text-white transition-colors cursor-pointer"
            aria-label="Mở menu điều hướng"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden mt-2 mx-4 p-4 rounded-2xl cosmic-glass-strong space-y-1.5 border border-[#B8C9FF]/20 shadow-2xl">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`block px-4 py-3 rounded-xl font-cosmic text-xs tracking-wider uppercase transition-all ${isActive
                  ? 'bg-[#7465C9]/30 text-white border border-[#7465C9]/50'
                  : 'text-[#8991A8] hover:text-[#F1F3FA] hover:bg-white/5'
                  }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
