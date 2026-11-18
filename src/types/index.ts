export type MediaSection = 'the-boys' | 'together-in-one-frame';

export interface PhotoItem {
  id: string;
  src: string | null;
  section: MediaSection;
  placeholderLabel: string;
  caption: string;
  alt: string;
}

export interface VideoItem {
  id: string;
  src: string | null;
  thumbnail?: string | null;
  placeholderLabel: string;
  caption: string;
  alt: string;
}

export interface ClassMeta {
  websiteName: string;
  editionLabel: string;
  tagline: string;
  supportingMessage: string;
  className: string;
  schoolYear: string;
}
