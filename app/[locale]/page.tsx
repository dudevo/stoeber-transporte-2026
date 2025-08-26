// app/[locale]/page.tsx

import { Button } from "@/components/ui/button";
import { Locale, useLocale, useTranslations } from "next-intl";
// 1. Import 'getTranslations' and 'setRequestLocale' from 'next-intl/server'
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";

// Remove the unused `use` from "react" import if it's there

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("index");
  // const t = await getTranslations("Index");
  console.log(t);

  return (
    <main style={{ padding: "40px" }}>
      <h1>{t("h1")}</h1>
      <p>{t("index.h2.num1")}</p>
      <Button>test</Button>
    </main>
    // <main style={{ padding: "40px" }}>
    //   <h1>{t("description")}</h1>
    //   <p>{t("index.h2.num1")}</p>
    //   <Button>test</Button>
    // </main>
  );
  // const t = await getTranslations("Nav");
  //
  // return (
  //   <div
  //     style={{ padding: "40px", fontFamily: "sans-serif", fontSize: "1.5rem" }}
  //   >
  //     <h1>i18n Isolation Test</h1>
  //     <hr />
  //     <p>
  //       <strong>Locale from URL (params.locale):</strong>{" "}
  //       <span style={{ color: "blue" }}>{locale}</span>
  //     </p>
  //     <p>
  //       <strong>Translated text from `Nav.json`:</strong>{" "}
  //       <span style={{ color: "green" }}>{t("homeLink")}</span>
  //     </p>
  //     <hr />
  //     <p>
  //       Check your server console. The log from `i18n.ts` should match the
  //       locale from the URL.
  //     </p>
  //   </div>
  // );
  // const t = useTranslations("Index");
  // const locale = useLocale();
  //
  // return (
  //   <>
  //     {" "}
  //     <p>{t("description")}</p>
  //     <p>
  //       <Link href="/about" locale={locale as any}>
  //         {t("navigateToAbout")}
  //       </Link>
  //     </p>
  //   </>
  // );
}
