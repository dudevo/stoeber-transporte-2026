# ImageSlider Component

A modern, accessible, and feature-rich image slider component built for the Stöber Transporte project.

## Features

- ✅ **Responsive Design** - Works seamlessly on desktop and mobile
- ✅ **Touch/Swipe Support** - Native swipe gestures on mobile devices
- ✅ **Keyboard Navigation** - Arrow keys support for accessibility
- ✅ **Autoplay** - Optional automatic slide progression
- ✅ **Navigation Arrows** - Previous/next buttons
- ✅ **Dot Indicators** - Visual slide indicators with click navigation
- ✅ **Accessibility** - ARIA labels, keyboard support, reduced motion support
- ✅ **Customizable** - Multiple configuration options
- ✅ **Performance Optimized** - Uses Next.js Image component with priority loading

## Basic Usage

```tsx
import { ImageSlider } from "@/components/ui/elements/image-slider";

const images = [
  {
    src: "/images/slide1.jpg",
    alt: "Description of slide 1"
  },
  {
    src: "/images/slide2.jpg", 
    alt: "Description of slide 2"
  },
  {
    src: "/images/slide3.jpg",
    alt: "Description of slide 3"
  }
];

export default function MyPage() {
  return (
    <div className="st-container">
      <ImageSlider images={images} />
    </div>
  );
}
```

## Advanced Usage

```tsx
import { ImageSlider } from "@/components/ui/elements/image-slider";

const images = [
  {
    src: "/images/transport1.jpg",
    alt: "Modern logistics vehicle"
  },
  {
    src: "/images/transport2.jpg",
    alt: "Warehouse operations"
  },
  {
    src: "/images/transport3.jpg",
    alt: "Express delivery service"
  }
];

export default function ServicesPage() {
  return (
    <div className="st-container">
      <ImageSlider 
        images={images}
        autoPlay={true}
        autoPlayInterval={5000}
        showArrows={true}
        showIndicators={true}
        loop={true}
        aspectRatio="16/9"
        rounded={true}
        objectFit="cover"
        className="my-custom-slider"
      />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `SliderImage[]` | **required** | Array of images to display |
| `className` | `string` | `""` | Additional CSS classes |
| `autoPlay` | `boolean` | `true` | Enable automatic slide progression |
| `autoPlayInterval` | `number` | `4000` | Interval between slides in ms |
| `showArrows` | `boolean` | `true` | Show navigation arrows |
| `showIndicators` | `boolean` | `true` | Show dot indicators |
| `loop` | `boolean` | `true` | Enable infinite loop |
| `aspectRatio` | `string` | `"16/9"` | CSS aspect ratio (e.g., "4/3", "1/1") |
| `rounded` | `boolean` | `true` | Apply rounded corners and shadow |
| `objectFit` | `"cover" \| "contain" \| "fill" \| "none" \| "scale-down"` | `"cover"` | Image object-fit behavior |

## SliderImage Type

```tsx
interface SliderImage {
  src: string;        // Image URL
  alt: string;        // Alt text for accessibility
  width?: number;     // Optional width hint
  height?: number;    // Optional height hint
}
```

## Accessibility Features

- **ARIA labels** on all interactive elements
- **Keyboard navigation** with arrow keys
- **Screen reader support** with proper roles and descriptions
- **Focus management** with visible focus indicators
- **Reduced motion support** for users with motion sensitivity preferences
- **High contrast mode** support

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Keyboard navigation support
- Touch/swipe gestures on touch devices

## Styling

The component uses CSS Modules with the project's design system:
- Primary color: #014993 (Stöber Corporate Blue)
- Responsive breakpoints at 768px and 480px
- Smooth transitions with `cubic-bezier(0.4, 0, 0.2, 1)`
- Box shadows using the project's standard shadow definition

## Performance Notes

- First image is loaded with `priority={true}` for faster initial load
- Uses Next.js Image component for automatic optimization
- Smooth animations with `will-change: transform`
- Touch events use `{ passive: true }` for better scroll performance
