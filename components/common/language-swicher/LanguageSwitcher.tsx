// "use client";
//
// import { useLocale } from "next-intl";
// // Your original, working imports are preserved.
// import { useRouter, usePathname } from "next/navigation";
// import s from "./language-switcher.module.scss";
//
// // We'll use a small config array to build the UI dynamically
// const languages = [
//   { code: "de", label: "DE" },
//   { code: "en", label: "EN" },
//   { code: "es", label: "ES" },
// ];
//
// export default function LanguageSwitcher() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const locale = useLocale();
//
//   // Your original navigation logic, adapted into a reusable function
//   const handleLanguageChange = (nextLocale: string) => {
//     // Prevent navigation if the locale is already active
//     if (nextLocale === locale) return;
//
//     const newPath = pathname.startsWith(`/${locale}`)
//       ? pathname.substring(locale.length + 1)
//       : pathname;
//
//     router.push(`/${nextLocale}${newPath}`);
//   };
//
//   return (
//     <nav className={s.switcher} aria-label="Language switcher">
//       <ul className={s.languageList}>
//         {languages.map((lang, index) => {
//           const isActive = lang.code === locale;
//           return (
//             <li key={lang.code}>
//               {/* Add a separator for all but the first item */}
//               {index > 0 && <span className={s.separator}>|</span>}
//               <button
//                 onClick={() => handleLanguageChange(lang.code)}
//                 className={`${s.button} ${isActive ? s.active : ""}`}
//                 // Disable the button for the currently active language
//                 disabled={isActive}
//                 aria-current={isActive ? "page" : undefined}
//               >
//                 {lang.label}
//               </button>
//             </li>
//           );
//         })}
//       </ul>
//     </nav>
//   );
// }

"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation"; // Correct for v4
import { useTransition } from "react";
import s from "./language-switcher.module.scss";

const languages = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  // 1. Add the useTransition hook
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (nextLocale: string) => {
    if (nextLocale === locale) return;

    const newPath = pathname.startsWith(`/${locale}`)
      ? pathname.substring(locale.length + 1)
      : pathname;

    // 2. Wrap the router call in startTransition
    startTransition(() => {
      // Use router.replace to avoid adding a new entry to the browser's history stack
      router.replace(`/${nextLocale}${newPath || "/"}`);
    });
  };

  return (
    <nav className={s.switcher} aria-label="Language switcher">
      <ul className={s.languageList}>
        {languages.map((lang, index) => {
          const isActive = lang.code === locale;
          return (
            <li key={lang.code}>
              {index > 0 && <span className={s.separator}>|</span>}
              <button
                onClick={() => handleLanguageChange(lang.code)}
                className={`${s.button} ${isActive ? s.active : ""}`}
                // 3. Optionally disable the buttons during the transition
                disabled={isActive || isPending}
                aria-current={isActive ? "page" : undefined}
              >
                {lang.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
