import { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { PhotoItem } from '../../types';

interface PhotoLightboxProps {
  photo: PhotoItem | null;
  collectionTitle?: string;
  currentIndex: number;
  totalCount: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function PhotoLightbox({
  photo,
  collectionTitle,
  currentIndex,
  totalCount,
  onClose,
  onPrev,
  onNext,
}: PhotoLightboxProps) {
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!photo) return null;

  const captionText = photo.caption?.trim();

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff > 50) onPrev();
    if (diff < -50) onNext();
    touchStartX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#050711]/94 backdrop-blur-2xl"
      />

      {/* Top Bar */}
      <div className="fixed top-5 left-5 right-5 sm:left-8 sm:right-8 z-50 flex items-center justify-between gap-4">
        <div className="font-cosmic text-[10px] sm:text-[11px] tracking-wider text-[#B8C9FF] uppercase truncate">
          {collectionTitle ? `${collectionTitle} · ` : ''}
          ẢNH {String(currentIndex + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full cosmic-glass text-xs font-cosmic text-[#F1F3FA] hover:border-[#7465C9] transition-colors cursor-pointer shrink-0"
          aria-label="Đóng xem ảnh"
        >
          <span>ĐÓNG</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Prev / Next Controls */}
      <button
        type="button"
        onClick={onPrev}
        className="fixed left-3 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full cosmic-glass text-[#B8C9FF] hover:text-white hover:border-[#7465C9] transition-all cursor-pointer"
        aria-label="Ảnh trước"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={onNext}
        className="fixed right-3 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full cosmic-glass text-[#B8C9FF] hover:text-white hover:border-[#7465C9] transition-all cursor-pointer"
        aria-label="Ảnh tiếp theo"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Center Image Frame */}
      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
        <div className="w-full max-h-[75vh] rounded-2xl overflow-hidden cosmic-glass border border-[#B8C9FF]/20 shadow-[0_24px_80px_rgba(5,7,17,0.95)] flex items-center justify-center">
          {photo.src ? (
            <img
              src={photo.src}
              alt={photo.alt || captionText || photo.placeholderLabel}
              className="max-h-[75vh] w-auto object-contain"
            />
          ) : (
            <div className="w-full h-[52vh] bg-gradient-to-br from-[#0B1025] via-[#050711] to-[#253B75]/35 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#7465C9]/15 border border-[#B8C9FF]/25 flex items-center justify-center mb-4">
                <Camera className="w-8 h-8 text-[#B8C9FF]" />
              </div>
              <span className="font-cosmic text-xs tracking-wider text-[#F1F3FA] uppercase mb-2">
                ẢNH MẪU: {photo.placeholderLabel}
              </span>
              <span className="text-xs text-[#8991A8] max-w-md">
                Thay đường dẫn <code className="text-[#B8C9FF]">src</code> trong{' '}
                <code className="text-[#B8C9FF]">src/data/memories.ts</code> bằng ảnh thật của lớp.
              </span>
            </div>
          )}
        </div>

        {/* Full Caption */}
        {captionText && (
          <div className="mt-5 text-center px-4 max-w-2xl">
            <p className="font-body text-base sm:text-lg text-[#F1F3FA] leading-relaxed">
              {captionText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
