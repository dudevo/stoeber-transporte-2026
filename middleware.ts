import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["de", "en", "es"],

  // The default locale is used when no locale is specified
  defaultLocale: "de",

  // The locale prefix is only added for non-default locales.
  localePrefix: "as-needed",

  // It's often helpful to disable this when using `as-needed`
  localeDetection: false,
});

export const config = {
  // --- THIS IS THE FIX ---
  // A more robust matcher that includes paths without a locale prefix.
  // It excludes common Next.js folders, API routes, and static files.
  matcher: [
    "/",
    "/(de|en|es)/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
