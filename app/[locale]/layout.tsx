import { NextIntlClientProvider } from "next-intl";

import "../globals.scss";
import Balken from "@/components/ui/elements/balken/balken";
import Header from "@/components/ui/layout/header/header";
import { routing } from "@/routing";
import Footer from "@/components/ui/layout/footer/footer";
import Providers from "../(lib)/providers";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout(props: Props) {
  const params = await Promise.resolve(props.params);
  const { locale } = params;
  const { children } = props;

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
        <NextIntlClientProvider locale={locale}>
          <Header />
          <Balken></Balken>
          <Providers>{children}</Providers>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
