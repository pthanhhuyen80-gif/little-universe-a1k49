import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ParallaxBackground from './components/effects/ParallaxBackground';
import MusicPlayer from './components/common/MusicPlayer';
import { MusicProvider } from './hooks/useMusicPlayer';
import { useActiveSection } from './hooks/useActiveSection';
import Home from './pages/Home';

const SECTION_IDS = ['home', 'the-boys', 'our-days', 'a-note-for-the-boys'];

export default function App() {
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <MusicProvider>
      <div className="relative min-h-screen bg-[#050711] text-[#F1F3FA] overflow-x-hidden">
        {/* Persistent Multi-Layer Cosmic Background: Nebula + Starfield + Shooting Stars */}
        <ParallaxBackground />

        {/* Minimalist Glass Navigation */}
        <Navbar activeSection={activeSection} />

        {/* Main Digital Class Yearbook */}
        <main className="relative z-10">
          <Home />
        </main>

        {/* Footer */}
        <Footer />

        {/* Optional User-Activated Soundtrack Player */}
        <MusicPlayer />
      </div>
    </MusicProvider>
  );
}
