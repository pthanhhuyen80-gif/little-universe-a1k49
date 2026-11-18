import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

interface MusicContextValue {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  togglePlay: () => void;
  toggleMute: () => void;
  setVolume: (vol: number) => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

const AUDIO_SRC = '/images/audios/thanhxuan.mp3';

export function MusicProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.5);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasExplicitActionRef = useRef(false);

  const startPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;
    try {
      audio.volume = isMuted ? 0 : volume;
      audio.muted = isMuted;
      await audio.play();
      setIsPlaying(true);
      return true;
    } catch {
      return false;
    }
  }, [isMuted, volume]);

  // Smart First-Interaction Autoplay
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    let cleanedUp = false;

    const cleanupListeners = () => {
      document.removeEventListener('click', handleFirstInteraction, true);
      document.removeEventListener('touchstart', handleFirstInteraction, true);
      document.removeEventListener('keydown', handleFirstInteraction, true);
    };

    const handleFirstInteraction = () => {
      if (cleanedUp || hasExplicitActionRef.current) {
        cleanupListeners();
        return;
      }
      cleanupListeners();
      void startPlayback();
    };

    // Attempt initial autoplay on load
    audio
      .play()
      .then(() => {
        if (!cleanedUp) {
          setIsPlaying(true);
        }
      })
      .catch(() => {
        // Browser blocked autoplay — wait for first user interaction
        if (!cleanedUp) {
          document.addEventListener('click', handleFirstInteraction, true);
          document.addEventListener('touchstart', handleFirstInteraction, true);
          document.addEventListener('keydown', handleFirstInteraction, true);
        }
      });

    return () => {
      cleanedUp = true;
      cleanupListeners();
    };
    // Run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlay = () => {
    hasExplicitActionRef.current = true;
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = isMuted ? 0 : volume;
      audio.muted = isMuted;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  const setVolume = (vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setVolumeState(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.muted = false;
    }
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  };

  return (
    <MusicContext.Provider
      value={{ isPlaying, isMuted, volume, togglePlay, toggleMute, setVolume }}
    >
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusicPlayer() {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    throw new Error('useMusicPlayer must be used within MusicProvider');
  }
  return ctx;
}
