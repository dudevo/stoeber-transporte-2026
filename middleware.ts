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
  // Matcher that excludes static assets, API routes, and Next.js internal files
  matcher: [
    "/",
    "/(de|en|es)/:path*",
    "/((?!api|_next/static|_next/image|images|favicon.ico|.*\\..*).*)",
  ],
};
