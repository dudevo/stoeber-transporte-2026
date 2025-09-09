/**
 * Möbellift image data - static configuration
 * Contains only paths and identifiers, no i18n dependencies
 */
export interface LiftImageData {
  src: string;
  translationKey: string; // Key for i18n translation
}

export const LIFT_IMAGES: LiftImageData[] = [
  {
    src: "/images/lift/1.jpg",
    translationKey: "i1",
  },
  {
    src: "/images/lift/2.jpg",
    translationKey: "i2",
  },
  {
    src: "/images/lift/3.jpg",
    translationKey: "i3",
  },
  {
    src: "/images/lift/4.jpg",
    translationKey: "i4",
  },
  {
    src: "/images/lift/5.jpg",
    translationKey: "i5",
  },
  {
    src: "/images/lift/6.jpg",
    translationKey: "i6",
  },
  {
    src: "/images/lift/7.jpg",
    translationKey: "i7",
  },
  {
    src: "/images/lift/8.jpg",
    translationKey: "i8",
  },
];
