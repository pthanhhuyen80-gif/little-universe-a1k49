import { ClassMeta, PhotoItem, VideoItem } from '../types';

export const classMeta: ClassMeta = {
  websiteName: 'LITTLE UNIVERSE',
  editionLabel: "THE BOYS' EDITION",
  tagline: 'Một năm lớp 12, dành riêng cho những chàng trai A1-K49.',
  supportingMessage:
    'Một món quà nhỏ nhân ngày 19/11, lưu lại những gương mặt và khoảnh khắc đáng nhớ của các bạn nam A1-K49.',
  className: 'A1-K49',
  schoolYear: 'LỚP 12',
};

/**
 * SECTION 02 — THE BOYS (11 ảnh thực tế tại public/images/boys/)
 */
export const theBoysPhotos: PhotoItem[] = [
  {
    id: 'boys-01',
    src: '/images/boys/g1.jpg',
    section: 'the-boys',
    placeholderLabel: 'g1.jpg',
    caption: 'Những gương mặt làm nên một phần rất riêng của A1-K49.',
    alt: 'Ảnh nhóm các bạn nam A1-K49 số 01',
  },
  {
    id: 'boys-02',
    src: '/images/boys/g2.jpg',
    section: 'the-boys',
    placeholderLabel: 'g2.jpg',
    caption: 'Mỗi người một vẻ, nhưng đều là những cái tên quen thuộc.',
    alt: 'Ảnh nhóm các bạn nam A1-K49 số 02',
  },
  {
    id: 'boys-03',
    src: '/images/boys/g3.jpg',
    section: 'the-boys',
    placeholderLabel: 'g3.jpg',
    caption: 'Một đội hình không cần giới thiệu quá nhiều.',
    alt: 'Ảnh nhóm các bạn nam A1-K49 số 03',
  },
  {
    id: 'boys-04',
    src: '/images/boys/g4.jpg',
    section: 'the-boys',
    placeholderLabel: 'g4.jpg',
    caption: 'Những chàng trai của năm lớp 12.',
    alt: 'Ảnh nhóm các bạn nam A1-K49 số 04',
  },
  {
    id: 'boys-05',
    src: '/images/boys/g5.jpg',
    section: 'the-boys',
    placeholderLabel: 'g5.jpg',
    caption: 'Có những gương mặt chỉ cần nhìn là nhận ra ngay.',
    alt: 'Ảnh nhóm các bạn nam A1-K49 số 05',
  },
  {
    id: 'boys-06',
    src: '/images/boys/g6.jpg',
    section: 'the-boys',
    placeholderLabel: 'g6.jpg',
    caption: 'Một tấm hình, nhiều cá tính khác nhau.',
    alt: 'Ảnh nhóm các bạn nam A1-K49 số 06',
  },
  {
    id: 'boys-07',
    src: '/images/boys/g7.jpg',
    section: 'the-boys',
    placeholderLabel: 'g7.jpg',
    caption: 'Những nhân vật không thể thiếu trong câu chuyện A1-K49.',
    alt: 'Ảnh nhóm các bạn nam A1-K49 số 07',
  },
  {
    id: 'boys-08',
    src: '/images/boys/g8.jpg',
    section: 'the-boys',
    placeholderLabel: 'g8.jpg',
    caption: 'Trông rất tài phiệt:)))',
    alt: 'Ảnh nhóm các bạn nam A1-K49 số 08',
  },
  {
    id: 'boys-09',
    src: '/images/boys/g9.jpg',
    section: 'the-boys',
    placeholderLabel: 'g9.jpg',
    caption: 'Một góc nhỏ dành riêng cho các bạn nam.',
    alt: 'Ảnh nhóm các bạn nam A1-K49 số 09',
  },
  {
    id: 'boys-10',
    src: '/images/boys/g10.jpg',
    section: 'the-boys',
    placeholderLabel: 'g10.jpg',
    caption: 'Những người đã cùng xuất hiện trong năm tháng ấy.',
    alt: 'Ảnh nhóm các bạn nam A1-K49 số 10',
  },
  {
    id: 'boys-11',
    src: '/images/boys/g11.jpg',
    section: 'the-boys',
    placeholderLabel: 'g11.jpg',
    caption: "Và đây là những chàng trai của THE BOYS' EDITION.",
    alt: 'Ảnh nhóm các bạn nam A1-K49 số 11',
  },
  {
    id: 'boys-12',
    src: '/images/boys/g12.jpg',
    section: 'the-boys',
    placeholderLabel: 'g12.jpg',
    caption: '',
    alt: 'Ảnh nhóm các bạn nam A1-K49 số 12',
  },
  {
    id: 'boys-13',
    src: '/images/boys/g13.jpg',
    section: 'the-boys',
    placeholderLabel: 'g13.jpg',
    caption: '',
    alt: 'Ảnh nhóm các bạn nam A1-K49 số 13',
  },
  {
    id: 'boys-14',
    src: '/images/boys/g14.jpg',
    section: 'the-boys',
    placeholderLabel: 'g14.jpg',
    caption: '',
    alt: 'Ảnh nhóm các bạn nam A1-K49 số 14',
  },
  {
    id: 'boys-15',
    src: '/images/boys/g15.jpg',
    section: 'the-boys',
    placeholderLabel: 'g15.jpg',
    caption: '',
    alt: 'Ảnh nhóm các bạn nam A1-K49 số 15',
  },
  {
    id: 'boys-16',
    src: '/images/boys/g16.jpg',
    section: 'the-boys',
    placeholderLabel: 'g16.jpg',
    caption: '',
    alt: 'Ảnh nhóm các bạn nam A1-K49 số 16',
  },
];

/**
 * SECTION 03A — DAILY REWIND (3 video thực tế tại public/images/audios/)
 */
export const dailyRewindVideos: VideoItem[] = [
  {
    id: 'video-01',
    src: '/images/audios/audio1.mp4',
    thumbnail: null,
    placeholderLabel: 'audio1.mp4',
    caption: 'Những điều bình thường, sau này nhìn lại có khi lại thấy nhớ.',
    alt: 'Video khoảnh khắc thường ngày của lớp A1-K49 số 01',
  },
  {
    id: 'video-02',
    src: '/images/audios/audio2.mp4',
    thumbnail: null,
    placeholderLabel: 'audio2.mp4',
    caption: 'Một chút nhộn nhịp trong những ngày lớp 12.',
    alt: 'Video khoảnh khắc thường ngày của lớp A1-K49 số 02',
  },
  {
    id: 'video-03',
    src: '/images/audios/audio3.mp4',
    thumbnail: null,
    placeholderLabel: 'audio3.mp4',
    caption: 'Không phải ngày nào cũng đặc biệt, nhưng ngày nào cũng có chuyện để nhớ.',
    alt: 'Video khoảnh khắc thường ngày của lớp A1-K49 số 03',
  },
];

/**
 * SECTION 03B — TOGETHER IN ONE FRAME (4 ảnh tập thể thực tế tại public/images/class/)
 */
export const togetherInOneFramePhotos: PhotoItem[] = [
  {
    id: 'class-01',
    src: '/images/class/p1.jpg',
    section: 'together-in-one-frame',
    placeholderLabel: 'p1.jpg',
    caption: 'Bức ảnh kỷ yếu chỉ cần 3 giây để chụp nhưng lưu giữ kỷ niệm của 3 năm thanh xuân.',
    alt: 'Ảnh tập thể lớp A1-K49 số 01',
  },
  {
    id: 'class-02',
    src: '/images/class/p2.jpg',
    section: 'together-in-one-frame',
    placeholderLabel: 'p2.jpg',
    caption: 'Một tập thể, nhiều cá tính và vô số câu chuyện.',
    alt: 'Ảnh tập thể lớp A1-K49 số 02',
  },
  {
    id: 'class-03',
    src: '/images/class/p3.jpg',
    section: 'together-in-one-frame',
    placeholderLabel: 'p3.jpg',
    caption: 'Có thể mỗi người sẽ đi một hướng, nhưng từng có chung một khoảng trời.',
    alt: 'Ảnh tập thể lớp A1-K49 số 03',
  },
  {
    id: 'class-04',
    src: '/images/class/p4.jpg',
    section: 'together-in-one-frame',
    placeholderLabel: 'p4.jpg',
    caption: 'Một tấm ảnh để sau này nhìn lại và nhớ rằng đã từng có những ngày như thế.',
    alt: 'Ảnh tập thể lớp A1-K49 số 04',
  },
];
