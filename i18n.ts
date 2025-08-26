import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = {
    ...(await import(`./messages/${locale}/agb.json`)).default,
    ...(await import(`./messages/${locale}/ds.json`)).default,
    ...(await import(`./messages/${locale}/forms.json`)).default,
    ...(await import(`./messages/${locale}/home.json`)).default,
    ...(await import(`./messages/${locale}/leitbild.json`)).default,
    ...(await import(`./messages/${locale}/liability.json`)).default,
    ...(await import(`./messages/${locale}/nav.json`)).default,
    ...(await import(`./messages/${locale}/notFound.json`)).default,
    ...(await import(`./messages/${locale}/products.json`)).default,
  };

  return {
    locale,
    messages,
  };
});
