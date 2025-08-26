// middleware.ts
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["de", "en", "es"],

  // The default locale is used when no locale is specified
  // in the URL. This is the key to your requirement.
  defaultLocale: "de",

  // This prevents the middleware from detecting the user's browser language
  // and automatically redirecting. This is CRITICAL for your use case.
  localeDetection: false,

  // The locale prefix is only added for non-default locales.
  // So `/` will be German, and `/en` will be English.
  localePrefix: "as-needed",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(de|en|es)/:path*"],
};
