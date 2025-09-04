import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";

import Lkw from "../../../../../assets/images/lkw.jpg";
import ServicePageLayout from "@/components/ui/layout/service-page-layout";

type Props = {
  params: Promise<{ locale: string }>; // 👈 mark params as Promise
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; // 👈 await it
  const t = await getTranslations({ locale, namespace: "leitbild" });

  return {
    title: t("pl.meta.title"),
    description: t("pl.meta.desc"),
  };
}

const Planung = async ({ params }: Props) => {
  const { locale } = await params; // 👈 await it
  setRequestLocale(locale);

  const t = await getTranslations("leitbild");

  return (
    <ServicePageLayout title={t("pl.h1")} imageSrc={Lkw} imageAlt={t("pl.img")}>
      <p>{t("pl.p1")}</p>
      <p>{t("pl.p2")}</p>
      <p>{t("pl.p3")}</p>
    </ServicePageLayout>
  );
};

export default Planung;
