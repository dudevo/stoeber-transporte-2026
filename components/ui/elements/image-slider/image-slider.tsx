"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./image-slider.module.scss";
import { ChevronLeft, ChevronRight, Dot } from "lucide-react";
import Image from "next/image";

export interface SliderImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ImageSliderProps {
  images: SliderImage[];
  className?: string;
  title?: string; // Optional accessible title for the slider
  autoPlay?: boolean;
  autoPlayInterval?: number; // ms
  showArrows?: boolean;
  showIndicators?: boolean;
  loop?: boolean;
  aspectRatio?: string; // e.g. "16/9", "4/3", "1/1"
  rounded?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

export default function ImageSlider({
  images,
  className,
  title,
  autoPlay = true,
  autoPlayInterval = 4000,
  showArrows = true,
  showIndicators = true,
  loop = true,
  aspectRatio = "16/9",
  rounded = true,
  objectFit = "cover",
}: ImageSliderProps) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInteractive = images.length > 1;

  const goTo = (next: number) => {
    const len = images.length;
    if (loop) {
      setIndex((next + len) % len);
    } else {
      setIndex(Math.max(0, Math.min(next, len - 1)));
    }
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // Autoplay
  useEffect(() => {
    if (!autoPlay || !isInteractive) return;
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (loop ? (i + 1) % images.length : Math.min(i + 1, images.length - 1)));
    }, autoPlayInterval);
    return () => {
      timerRef.current && clearInterval(timerRef.current);
    };
  }, [autoPlay, autoPlayInterval, images.length, loop, isInteractive]);

  // Pause on hover
  const onMouseEnter = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };
  const onMouseLeave = () => {
    if (autoPlay && isInteractive) {
      timerRef.current = setInterval(() => {
        setIndex((i) => (loop ? (i + 1) % images.length : Math.min(i + 1, images.length - 1)));
      }, autoPlayInterval);
    }
  };

  // Swipe support
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !isInteractive) return;

    let startX = 0;
    let delta = 0;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      delta = 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      delta = e.touches[0].clientX - startX;
    };
    const onTouchEnd = () => {
      if (Math.abs(delta) > 50) {
        if (delta < 0) next();
        else prev();
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [isInteractive]);

  // Keyboard navigation
  useEffect(() => {
    if (!isInteractive) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isInteractive, index]);

  const trackStyle = useMemo<React.CSSProperties>(() => ({
    transform: `translateX(-${index * 100}%)`,
  }), [index]);

  return (
    <div
      className={[styles.slider, rounded ? styles.rounded : "", className || ""].join(" ")}
      style={{ aspectRatio }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={title || "Image slider"}
    >
      <div className={styles.viewport}>
        <div className={styles.track} style={trackStyle}>
          {images.map((img, i) => (
            <div className={styles.slide} key={img.src} aria-hidden={i !== index}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 992px) 90vw, 400px"
                style={{ objectFit }}
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {showArrows && isInteractive && (
        <>
          <button
            className={`${styles.nav} ${styles.navLeft}`}
            onClick={prev}
            aria-label="Previous slide"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            className={`${styles.nav} ${styles.navRight}`}
            onClick={next}
            aria-label="Next slide"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

      {showIndicators && isInteractive && (
        <div className={styles.dots} role="tablist" aria-label="Slide indicators">
          {images.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === index ? styles.active : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              role="tab"
              aria-selected={i === index}
            >
              <Dot size={18} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

