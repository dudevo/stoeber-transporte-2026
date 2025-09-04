"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useTransition, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

import s from "./language-switcher.module.scss";
import { useMediaQuery } from "@/hooks/use-media-query"; // Adjust path if needed

const languages = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

// Helper hook to detect clicks outside an element
const useClickOutside = (ref: any, handler: () => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  // State for desktop dropdown
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Hook to render different JSX based on viewport
  const isDesktop = useMediaQuery("(min-width: 901px)");

  // Close dropdown when clicking outside
  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleLanguageChange = (nextLocale: string) => {
    if (nextLocale === locale) return;

    const newPath = pathname.startsWith(`/${locale}`)
      ? pathname.substring(locale.length + 1)
      : pathname;

    startTransition(() => {
      router.replace(`/${nextLocale}${newPath || "/"}`);
    });

    // Close dropdown after selection
    setIsOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === locale);

  // --- Render Desktop Dropdown ---
  if (isDesktop) {
    return (
      <div className={s.switcher} ref={dropdownRef}>
        <button
          className={s.dropdownTrigger}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{currentLanguage?.label}</span>
          <ChevronDown
            size={16}
            className={`${s.chevron} ${isOpen ? s.chevronOpen : ""}`}
          />
        </button>

        {isOpen && (
          <ul className={s.dropdownPanel}>
            {languages.map((lang) => {
              const isActive = lang.code === locale;
              return (
                <li key={lang.code}>
                  <button
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`${s.dropdownItem} ${isActive ? s.activeItem : ""}`}
                    disabled={isActive || isPending}
                  >
                    {lang.label}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }

  // --- Render Mobile Segmented Control ---
  return (
    <div className={s.switcher} aria-label="Language switcher">
      <ul className={s.languageList}>
        {languages.map((lang) => {
          const isActive = lang.code === locale;
          return (
            <li key={lang.code}>
              <button
                onClick={() => handleLanguageChange(lang.code)}
                className={`${s.button} ${isActive ? s.active : ""}`}
                disabled={isActive || isPending}
                aria-current={isActive ? "page" : undefined}
              >
                {lang.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
