import { Camera, Maximize2 } from 'lucide-react';
import { PhotoItem } from '../../types';

interface PhotoGalleryProps {
  photos: PhotoItem[];
  onSelectPhoto: (photo: PhotoItem) => void;
  layout?: 'masonry' | 'grid-2';
}

const PLACEHOLDER_ASPECTS = [
  'aspect-[4/3]',
  'aspect-[4/5]',
  'aspect-square',
  'aspect-[16/10]',
];

export default function PhotoGallery({
  photos,
  onSelectPhoto,
  layout = 'masonry',
}: PhotoGalleryProps) {
  const containerClass =
    layout === 'grid-2'
      ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
      : 'columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5';

  return (
    <div className={containerClass}>
      {photos.map((photo, index) => {
        const placeholderAspect =
          layout === 'grid-2'
            ? 'aspect-[16/10]'
            : PLACEHOLDER_ASPECTS[index % PLACEHOLDER_ASPECTS.length];

        const captionText = photo.caption?.trim();

        return (
          <button
            key={photo.id}
            type="button"
            onClick={() => onSelectPhoto(photo)}
            className="break-inside-avoid group text-left w-full rounded-2xl overflow-hidden cosmic-glass border border-[#B8C9FF]/12 hover:border-[#7465C9]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(116,101,201,0.22)] cursor-pointer flex flex-col"
          >
            <div className="relative w-full bg-[#050711] overflow-hidden flex items-center justify-center">
              {photo.src ? (
                <img
                  src={photo.src}
                  alt={photo.alt || captionText || photo.placeholderLabel}
                  loading="lazy"
                  className="w-full h-auto block group-hover:scale-[1.03] transition-transform duration-700"
                />
              ) : (
                <div
                  className={`w-full ${placeholderAspect} bg-gradient-to-br from-[#0B1025] via-[#050711] to-[#253B75]/35 flex flex-col items-center justify-center p-6 text-center relative`}
                >
                  <div className="absolute inset-0 cosmic-grid opacity-35" />
                  <div className="relative z-10 w-12 h-12 rounded-xl bg-[#7465C9]/15 border border-[#B8C9FF]/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Camera className="w-5 h-5 text-[#B8C9FF]" />
                  </div>
                  <span className="relative z-10 font-cosmic text-[10px] tracking-widest text-[#B8C9FF] uppercase">
                    {photo.placeholderLabel}
                  </span>
                </div>
              )}

              <div className="absolute top-3 right-3 p-2 rounded-full bg-[#050711]/75 border border-[#B8C9FF]/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5 text-[#B8C9FF]" />
              </div>
            </div>

            {captionText && (
              <div className="px-4 py-3.5 border-t border-[#B8C9FF]/10 w-full">
                <p className="font-body text-xs sm:text-sm text-[#F1F3FA]/90 group-hover:text-white leading-relaxed">
                  {captionText}
                </p>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
