import { Volume2, VolumeX, Play, Pause, Sparkles } from 'lucide-react';
import { useMusicPlayer } from '../../hooks/useMusicPlayer';

export default function MusicPlayer() {
  const { isPlaying, isMuted, volume, togglePlay, toggleMute, setVolume } =
    useMusicPlayer();

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <div className="cosmic-glass-strong rounded-full px-3.5 py-2 flex items-center gap-3 shadow-2xl border border-[#B8C9FF]/15">
        <button
          type="button"
          onClick={togglePlay}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${isPlaying
            ? 'bg-[#7465C9] text-white shadow-[0_0_16px_rgba(116,101,201,0.5)]'
            : 'bg-[#253B75]/60 text-[#B8C9FF] hover:bg-[#7465C9]/80 hover:text-white'
            }`}
          aria-label={isPlaying ? 'Tạm dừng nhạc nền' : 'Phát nhạc nền'}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5 ml-0.5" />
          )}
        </button>

        <div className="hidden sm:flex flex-col pr-1">
          <span className="font-cosmic text-[10px] font-medium tracking-wider text-[#F1F3FA] flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-[#B8C9FF]" />
            {isPlaying ? 'Thanh Xuân - Da LAB' : 'NHẠC NỀN ĐANG TẮT'}
          </span>
          <span className="text-[10px] text-[#8991A8]">
            {isPlaying ? 'Đang phát' : 'Thanh Xuân - Da LAB'}
          </span>
        </div>

        {/* Volume & Mute */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#B8C9FF]/15">
          <button
            type="button"
            onClick={toggleMute}
            className="text-[#B8C9FF] hover:text-white transition-colors cursor-pointer"
            aria-label={isMuted ? 'Bật tiếng' : 'Tắt tiếng'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-[#8991A8]" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-14 sm:w-16 accent-[#7465C9] cursor-pointer h-1 bg-[#253B75] rounded-lg"
            aria-label="Âm lượng nhạc nền"
          />
        </div>
      </div>
    </div>
  );
}
