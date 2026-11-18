import { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Camera, Maximize2, Sparkles } from 'lucide-react';
import {
  classMeta,
  theBoysPhotos,
  dailyRewindVideos,
  togetherInOneFramePhotos,
} from '../data/memories';
import { PhotoItem } from '../types';
import PhotoGallery from '../components/gallery/PhotoGallery';
import VideoGallery from '../components/gallery/VideoGallery';
import PhotoLightbox from '../components/gallery/PhotoLightbox';
import SectionHeading from '../components/common/SectionHeading';
import PageTransition from '../components/common/PageTransition';
import HeroSpaceBackdrop from '../components/effects/HeroSpaceBackdrop';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [lightboxData, setLightboxData] = useState<{
    photo: PhotoItem;
    collectionTitle: string;
  } | null>(null);

  useEffect(() => {
    if (reducedMotion || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.cosmic-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 84%',
              once: true,
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Danh sách 15 ảnh duy nhất để điều hướng mượt mà trong Lightbox
  const allPhotosFlat = useMemo(() => {
    return [
      ...theBoysPhotos.map((p) => ({
        photo: p,
        collectionTitle: 'NHỮNG CHÀNG TRAI A1-K49',
      })),
      ...togetherInOneFramePhotos.map((p) => ({
        photo: p,
        collectionTitle: 'TOGETHER IN ONE FRAME',
      })),
    ];
  }, []);

  const currentLightboxIndex = useMemo(() => {
    if (!lightboxData) return -1;
    return allPhotosFlat.findIndex(
      (item) => item.photo.id === lightboxData.photo.id
    );
  }, [lightboxData, allPhotosFlat]);

  const handlePrevPhoto = () => {
    if (currentLightboxIndex === -1) return;
    const prevIdx =
      currentLightboxIndex > 0 ? currentLightboxIndex - 1 : allPhotosFlat.length - 1;
    setLightboxData(allPhotosFlat[prevIdx]);
  };

  const handleNextPhoto = () => {
    if (currentLightboxIndex === -1) return;
    const nextIdx =
      currentLightboxIndex < allPhotosFlat.length - 1 ? currentLightboxIndex + 1 : 0;
    setLightboxData(allPhotosFlat[nextIdx]);
  };

  const scrollToTheBoys = () => {
    document.getElementById('the-boys')?.scrollIntoView({ behavior: 'smooth' });
  };

  const closingPhoto = togetherInOneFramePhotos[0];

  return (
    <PageTransition>
      <div ref={pageRef} className="relative">
        {/* ============================================================
            SECTION 01 — HOME
        ============================================================ */}
        <section
          id="home"
          className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center overflow-hidden"
        >
          {/* Deep Space Nebula, Center Readability Vignette & Floating 3D-Styled Planets */}
          <HeroSpaceBackdrop />

          {/* Foreground Hero Content */}
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full cosmic-glass text-[10px] sm:text-[11px] font-cosmic tracking-[0.2em] text-[#B8C9FF] uppercase mb-7">
              <Sparkles className="w-3.5 h-3.5 text-[#7465C9]" />
              <span>
                {classMeta.editionLabel} · {classMeta.className} · 19/11
              </span>
            </div>

            <h1 className="font-display font-bold text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#F1F3FA] uppercase leading-[0.95] mb-6 drop-shadow-[0_8px_36px_rgba(5,7,17,0.95)]">
              LITTLE{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B8C9FF] via-[#7465C9] to-[#B8C9FF]">
                UNIVERSE
              </span>
            </h1>

            <p className="font-quote italic text-2xl sm:text-4xl text-[#F1F3FA] max-w-2xl mx-auto mb-4 leading-snug drop-shadow">
              "{classMeta.tagline}"
            </p>

            <p className="text-xs sm:text-sm text-[#B8C9FF]/85 max-w-xl mx-auto mb-10 leading-relaxed">
              {classMeta.supportingMessage}
            </p>

            <button
              type="button"
              onClick={scrollToTheBoys}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#253B75] to-[#7465C9] text-white font-cosmic text-xs font-semibold tracking-[0.16em] uppercase border border-[#B8C9FF]/30 shadow-[0_0_38px_rgba(116,101,201,0.45)] hover:shadow-[0_0_55px_rgba(184,201,255,0.6)] hover:scale-[1.03] active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span>KHÁM PHÁ THE BOYS&apos; EDITION</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </section>

        {/* ============================================================
            SECTION 02 — THE BOYS (11 Image Cards)
        ============================================================ */}
        <section
          id="the-boys"
          className="scroll-mt-20 relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
          <div className="cosmic-reveal mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#B8C9FF]/12">
            <div>
              <span className="font-cosmic text-[11px] tracking-[0.2em] text-[#7465C9] uppercase block mb-3">
                02 // THE BOYS · {classMeta.className}
              </span>
              <h2 className="font-display font-bold text-4xl sm:text-6xl text-[#F1F3FA] tracking-tight uppercase leading-[1.04] mb-4">
                NHỮNG CHÀNG TRAI A1-K49
              </h2>
              <p className="text-sm sm:text-base text-[#8991A8] max-w-2xl leading-relaxed">
                Ký ức vốn dĩ đẹp đẽ vì ta mãi chẳng thể quay về.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-cosmic tracking-wider text-[#8991A8] uppercase">
              <span className="px-3 py-1 rounded-full cosmic-glass text-[#F1F3FA]">
                {theBoysPhotos.length} KHUNG HÌNH
              </span>
              <span className="px-3 py-1 rounded-full cosmic-glass text-[#B8C9FF]">
                BOYS&apos; DAY 19/11
              </span>
            </div>
          </div>

          <div className="cosmic-reveal">
            <PhotoGallery
              photos={theBoysPhotos}
              layout="masonry"
              onSelectPhoto={(photo) =>
                setLightboxData({
                  photo,
                  collectionTitle: 'NHỮNG CHÀNG TRAI A1-K49',
                })
              }
            />
          </div>
        </section>

        {/* ============================================================
            SECTION 03 — OUR DAYS (4 Videos + 4 Whole-Class Photos)
        ============================================================ */}
        <section
          id="our-days"
          className="scroll-mt-20 relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24"
        >
          <div className="cosmic-reveal">
            <SectionHeading
              label="03 // OUR DAYS · A1-K49"
              title="NHỮNG NGÀY THÁNG CỦA A1-K49"
              subtitle="Không phải ngày nào cũng có điều gì đặc biệt. Nhưng đôi khi, chính những khoảnh khắc bình thường lại là điều đáng nhớ nhất."
            />
          </div>

          {/* A. DAILY REWIND (4 Videos) */}
          <div className="cosmic-reveal">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-5 border-b border-[#B8C9FF]/12">
              <div>
                <span className="font-cosmic text-[10px] tracking-[0.22em] text-[#7465C9] uppercase block mb-2">
                  A // DAILY REWIND
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-4xl text-[#F1F3FA] tracking-tight">
                  MỘT CHÚT NHỮNG NGÀY THƯỜNG.
                </h3>
              </div>
              <span className="font-cosmic text-[10px] tracking-widest text-[#8991A8] uppercase">
                {dailyRewindVideos.length} THƯỚC PHIM
              </span>
            </div>

            <VideoGallery videos={dailyRewindVideos} />
          </div>

          {/* B. TOGETHER IN ONE FRAME (4 Whole-Class Photos) */}
          <div className="cosmic-reveal">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 pb-5 border-b border-[#B8C9FF]/12">
              <div>
                <span className="font-cosmic text-[10px] tracking-[0.22em] text-[#7465C9] uppercase block mb-2">
                  B // TOGETHER IN ONE FRAME
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-4xl text-[#F1F3FA] tracking-tight">
                  Đứng đúng một góc, chụp đúng một kiểu, chụp một lần. Kỷ niệm cả đời!
                </h3>
              </div>
              <span className="font-cosmic text-[10px] tracking-widest text-[#8991A8] uppercase">
                {togetherInOneFramePhotos.length} ẢNH TẬP THỂ
              </span>
            </div>

            <PhotoGallery
              photos={togetherInOneFramePhotos}
              layout="grid-2"
              onSelectPhoto={(photo) =>
                setLightboxData({
                  photo,
                  collectionTitle: 'TOGETHER IN ONE FRAME',
                })
              }
            />
          </div>
        </section>

        {/* ============================================================
            SECTION 04 — A NOTE FOR THE BOYS
        ============================================================ */}
        <section
          id="a-note-for-the-boys"
          className="scroll-mt-20 relative py-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center"
        >
          <div className="cosmic-reveal space-y-10">
            <span className="font-cosmic text-[11px] tracking-[0.22em] text-[#7465C9] uppercase inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#B8C9FF]" />
              04 // A NOTE FOR THE BOYS · 19/11
            </span>

            <h2 className="font-display font-bold text-4xl sm:text-6xl text-[#F1F3FA] tracking-tight uppercase leading-[1.04]">
              GỬI NHỮNG CHÀNG TRAI A1-K49
            </h2>

            <p className="font-quote italic text-2xl sm:text-3xl text-[#B8C9FF] leading-relaxed max-w-3xl mx-auto">
              "Mỗi cuộc gặp gỡ đều có ngày tạm biệt, nhưng điều quan trọng là chúng ta đã cùng nhau viết nên những trang đẹp nhất của tuổi trẻ. Dù mai này mỗi người một nơi, thanh xuân này sẽ mãi là một phần của A1-K49."
            </p>

            {/* Closing Visual (Existing Whole-Class Photo) */}
            {closingPhoto && (
              <button
                type="button"
                onClick={() =>
                  setLightboxData({
                    photo: closingPhoto,
                    collectionTitle: 'TOGETHER IN ONE FRAME',
                  })
                }
                className="group relative w-full max-w-3xl mx-auto rounded-3xl overflow-hidden cosmic-glass border border-[#B8C9FF]/18 hover:border-[#7465C9]/65 transition-all duration-500 shadow-[0_24px_80px_rgba(5,7,17,0.9)] cursor-pointer block text-left"
              >
                <div className="relative w-full bg-[#050711] overflow-hidden flex items-center justify-center">
                  {closingPhoto.src ? (
                    <img
                      src={closingPhoto.src}
                      alt={closingPhoto.alt}
                      loading="lazy"
                      className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-700"
                    />
                  ) : (
                    <div className="aspect-[16/9] w-full bg-gradient-to-br from-[#0B1025] via-[#050711] to-[#253B75]/45 flex flex-col items-center justify-center p-8 text-center relative">
                      <div className="absolute inset-0 cosmic-grid opacity-35" />
                      <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#7465C9]/20 border border-[#B8C9FF]/25 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Camera className="w-7 h-7 text-[#B8C9FF]" />
                      </div>
                      <span className="relative z-10 font-cosmic text-xs tracking-widest text-[#F1F3FA] uppercase mb-1">
                        {closingPhoto.placeholderLabel}
                      </span>
                      <span className="relative z-10 text-xs text-[#8991A8]">
                        Ảnh tập thể A1-K49 ({closingPhoto.caption})
                      </span>
                    </div>
                  )}

                  <div className="absolute top-4 right-4 p-2.5 rounded-full bg-[#050711]/75 border border-[#B8C9FF]/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4 text-[#B8C9FF]" />
                  </div>
                </div>
              </button>
            )}

            {/* Closing Message */}
            <div className="space-y-3 pt-4">
              <p className="font-display font-bold text-xl sm:text-3xl text-[#F1F3FA] tracking-wide max-w-3xl mx-auto leading-snug">
                Chúc các chàng trai A1-K49 luôn vững vàng trên hành trình phía trước. Và đừng quên giữ liên lạc nhé!
              </p>
              <p className="font-cosmic text-xs tracking-[0.22em] text-[#8991A8] uppercase">
                {classMeta.websiteName} · {classMeta.editionLabel} · {classMeta.className}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Full-Screen Photo Lightbox */}
      <PhotoLightbox
        photo={lightboxData?.photo ?? null}
        collectionTitle={lightboxData?.collectionTitle}
        currentIndex={currentLightboxIndex >= 0 ? currentLightboxIndex : 0}
        totalCount={allPhotosFlat.length}
        onClose={() => setLightboxData(null)}
        onPrev={handlePrevPhoto}
        onNext={handleNextPhoto}
      />
    </PageTransition>
  );
}
