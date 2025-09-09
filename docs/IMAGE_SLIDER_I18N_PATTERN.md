# ImageSlider + i18n Best Practice Pattern

This document explains the recommended approach for using the ImageSlider component with internationalization in the Stöber Transporte project.

## Problem Statement

Previously, constants files contained i18n translation calls, creating tight coupling and making the code hard to test and maintain. The image slider needed a flexible way to handle multilingual alt texts and titles without polluting constants with i18n dependencies.

## Solution Architecture

We've implemented a **separation of concerns** approach:

1. **Constants** contain only static data (paths, keys)
2. **Utility functions** combine constants with translations
3. **Components** remain flexible and reusable
4. **Pages** orchestrate the data flow

## File Structure

```
/constants/
  lift.constants.ts           # Static image data only
  
/lib/utils/
  image-data.ts               # i18n combination utilities
  
/components/ui/elements/
  image-slider/               # Reusable slider component
  
/messages/[locale]/
  products.json               # Translation strings
```

## Implementation Guide

### 1. Constants File (Clean Static Data)

```typescript
// /constants/lift.constants.ts
export interface LiftImageData {
  src: string;
  translationKey: string;
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
  // ... more images
];
```

### 2. Translation Structure

```json
{
  "mll": {
    "images": {
      "alt": "Bild von einem",
      "i1": "Möbellift an einem Bürogebäude",
      "i2": "Möbellift in einer engen Gasse",
      "i3": "Möbellift in schwer zugänglichen Gebäuden"
    }
  }
}
```

### 3. Utility Function Usage

```typescript
// In your page component
import { LIFT_IMAGES } from "@/constants/lift.constants";
import { combineImagesWithTranslations } from "@/lib/utils/image-data";

export default async function MyPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations("mll");

  // Combine static data with translations
  const sliderImages = combineImagesWithTranslations(
    LIFT_IMAGES,
    t,
    "images" // namespace within mll translations
  );

  return (
    <ImageSlider 
      images={sliderImages}
      title={t("h1")}
      aspectRatio="4/3"
    />
  );
}
```

## Available Utility Functions

### `combineImagesWithTranslations()`

Primary function for combining image data with translations:

```typescript
combineImagesWithTranslations(
  imageData: ImageDataConfig[],
  t: TranslationFunction,
  namespace: string = "images",
  altPrefix?: string
): SliderImage[]
```

**Parameters:**
- `imageData`: Array of image configurations from constants
- `t`: Translation function from next-intl
- `namespace`: Translation namespace (default: "images")
- `altPrefix`: Optional prefix for alt text

### `prepareImageData()` (Server-side)

For server components with locale parameter:

```typescript
const images = await prepareImageData(
  LIFT_IMAGES,
  locale,
  "mll",        // translation namespace
  "images",     // image sub-namespace
  "Image of"    // alt prefix
);
```

### `prepareClientImageData()` (Client-side)

For client components using `useTranslations()`:

```typescript
"use client";
import { useTranslations } from "next-intl";

export default function ClientComponent() {
  const t = useTranslations("mll");
  
  const images = prepareClientImageData(
    LIFT_IMAGES,
    t,
    "images"
  );

  return <ImageSlider images={images} />;
}
```

## ImageSlider Component Props

The enhanced ImageSlider component supports:

```typescript
interface ImageSliderProps {
  images: SliderImage[];           // Required: Array of images
  className?: string;              // Optional: CSS classes
  title?: string;                  // Optional: Accessible title
  autoPlay?: boolean;              // Default: true
  autoPlayInterval?: number;       // Default: 4000ms
  showArrows?: boolean;           // Default: true
  showIndicators?: boolean;       // Default: true
  loop?: boolean;                 // Default: true
  aspectRatio?: string;           // Default: "16/9"
  rounded?: boolean;              // Default: true
  objectFit?: ObjectFit;          // Default: "cover"
}
```

## Usage Examples

### Basic Usage

```tsx
import { ImageSlider } from "@/components/ui/elements/image-slider";
import { LIFT_IMAGES } from "@/constants/lift.constants";
import { combineImagesWithTranslations } from "@/lib/utils/image-data";

export default async function BasicExample({ params }) {
  const t = await getTranslations("mll");
  const images = combineImagesWithTranslations(LIFT_IMAGES, t, "images");

  return <ImageSlider images={images} />;
}
```

### Advanced Usage with Custom Configuration

```tsx
export default async function AdvancedExample({ params }) {
  const t = await getTranslations("mll");
  const images = combineImagesWithTranslations(LIFT_IMAGES, t, "images");

  return (
    <ImageSlider
      images={images}
      title={t("h1")}
      aspectRatio="21/9"
      autoPlay={true}
      autoPlayInterval={6000}
      showArrows={true}
      showIndicators={true}
      loop={true}
      rounded={true}
      objectFit="cover"
      className="my-custom-class"
    />
  );
}
```

### With Different Product Categories

```tsx
// For different products, create separate constants
import { TRANSPORT_IMAGES } from "@/constants/transport.constants";

export default async function TransportPage({ params }) {
  const t = await getTranslations("transport");
  
  const images = combineImagesWithTranslations(
    TRANSPORT_IMAGES,
    t,
    "gallery" // different namespace
  );

  return <ImageSlider images={images} title={t("pageTitle")} />;
}
```

## Migration Guide

To migrate existing image slider implementations:

### Before (Bad Practice)
```typescript
// constants/old-images.ts - DON'T DO THIS
const images = [
  {
    src: "/image1.jpg",
    alt: t("alt.image1"), // ❌ i18n in constants
  }
];
```

### After (Best Practice)
```typescript
// constants/clean-images.ts - ✅ Clean separation
export const PRODUCT_IMAGES = [
  {
    src: "/image1.jpg",
    translationKey: "image1",
  }
];

// In your component - ✅ Combine at runtime
const images = combineImagesWithTranslations(
  PRODUCT_IMAGES,
  t,
  "images"
);
```

## Benefits

1. **Separation of Concerns**: Constants contain only static data
2. **Testability**: Easy to unit test without i18n dependencies  
3. **Maintainability**: Changes to translations don't affect constants
4. **Flexibility**: Same constants can be used with different translation approaches
5. **Type Safety**: Full TypeScript support throughout the chain
6. **Performance**: Translations are resolved at component level, not import time
7. **Reusability**: Utility functions work across different product categories

## Performance Considerations

- Translation resolution happens at render time, not import time
- Constants can be tree-shaken if unused
- First image loads with priority for better Core Web Vitals
- Utility functions have minimal overhead

## Accessibility Features

- Proper ARIA labels using translated titles
- Keyboard navigation support
- Screen reader compatibility
- Reduced motion support
- High contrast mode support

This pattern ensures clean, maintainable, and internationalized image sliders across the entire project.
