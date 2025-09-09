import { type SliderImage } from "@/components/ui/elements/image-slider";

/**
 * Image data configuration interface
 * Used for combining static data with i18n translations
 */
export interface ImageDataConfig {
  src: string;
  translationKey: string;
}

/**
 * Translation function type for better type safety
 */
export type TranslationFunction = (key: string) => string;

/**
 * Combines static image data with i18n translations
 * 
 * @param imageData - Array of image configurations
 * @param t - Translation function from next-intl
 * @param namespace - Optional namespace for translations (e.g., "images")
 * @param altPrefix - Optional alt text prefix (e.g., "Image of")
 * 
 * @example
 * ```tsx
 * import { LIFT_IMAGES } from "@/constants/lift.constants";
 * import { combineImagesWithTranslations } from "@/lib/utils/image-data";
 * 
 * const t = await getTranslations("mll");
 * const images = combineImagesWithTranslations(
 *   LIFT_IMAGES, 
 *   t, 
 *   "images", 
 *   "Image of"
 * );
 * ```
 */
export function combineImagesWithTranslations(
  imageData: ImageDataConfig[],
  t: TranslationFunction,
  namespace: string = "images",
  altPrefix?: string
): SliderImage[] {
  return imageData.map((image) => {
    const description = t(`${namespace}.${image.translationKey}`);
    const altText = altPrefix 
      ? `${t(`${namespace}.alt`)} ${description}` 
      : description;

    return {
      src: image.src,
      alt: altText,
    };
  });
}

/**
 * Alternative approach: Server-side image data preparation
 * Use this when you want to prepare image data at build time or in server components
 */
export async function prepareImageData(
  imageData: ImageDataConfig[],
  locale: string,
  translationNamespace: string,
  imageNamespace: string = "images",
  altPrefix?: string
) {
  // Dynamic import for server-side usage
  const { getTranslations } = await import("next-intl/server");
  const t = await getTranslations({ locale, namespace: translationNamespace });
  
  return combineImagesWithTranslations(imageData, t, imageNamespace, altPrefix);
}

/**
 * Client-side image data preparation
 * Use this in client components with useTranslations hook
 */
export function prepareClientImageData(
  imageData: ImageDataConfig[],
  t: TranslationFunction,
  imageNamespace: string = "images",
  altPrefix?: string
) {
  return combineImagesWithTranslations(imageData, t, imageNamespace, altPrefix);
}
