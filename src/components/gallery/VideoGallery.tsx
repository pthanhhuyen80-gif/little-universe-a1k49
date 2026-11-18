import { Film, Play } from 'lucide-react';
import { VideoItem } from '../../types';

interface VideoGalleryProps {
  videos: VideoItem[];
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <div
          key={video.id}
          className="rounded-2xl overflow-hidden cosmic-glass border border-[#B8C9FF]/14 hover:border-[#7465C9]/55 transition-all duration-300 flex flex-col"
        >
          <div className="relative aspect-video w-full bg-[#050711] overflow-hidden flex items-center justify-center">
            {video.src ? (
              <video
                src={`${video.src}#t=0.5`}
                poster={video.thumbnail || undefined}
                controls
                preload="metadata"
                playsInline
                aria-label={video.alt || video.caption}
                className="w-full h-full object-contain bg-black"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#0B1025] via-[#050711] to-[#253B75]/35 flex flex-col items-center justify-center p-6 text-center relative">
                {video.thumbnail && (
                  <img
                    src={video.thumbnail}
                    alt={video.alt || video.caption}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                  />
                )}
                <div className="absolute inset-0 cosmic-grid opacity-30" />
                <div className="relative z-10 w-14 h-14 rounded-full bg-[#7465C9]/25 border border-[#B8C9FF]/30 flex items-center justify-center mb-3 shadow-[0_0_24px_rgba(116,101,201,0.35)]">
                  <Play className="w-6 h-6 text-[#F1F3FA] ml-0.5" />
                </div>
                <span className="relative z-10 font-cosmic text-[11px] tracking-widest text-[#F1F3FA] uppercase mb-1 flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-[#B8C9FF]" />
                  {video.placeholderLabel}
                </span>
              </div>
            )}
          </div>

          {video.caption?.trim() && (
            <div className="px-5 py-4 border-t border-[#B8C9FF]/10 flex-1">
              <p className="font-body text-xs sm:text-sm text-[#F1F3FA]/90 leading-relaxed">
                {video.caption.trim()}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
