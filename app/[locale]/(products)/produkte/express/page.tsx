// TODO: h1 is too long, should be split in a title and a subtitle

import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Express from "../../../../../assets/images/express-logistik.jpg";
import ServicePageLayout from "@/components/ui/layout/service-page-layout";

type Props = {
  params: Promise<{ locale: string }>; // 👈 mark params as Promise
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; // 👈 await it
  const t = await getTranslations({ locale, namespace: "ex" });

  return {
    title: t("meta.title"),
    description: t("meta.desc"),
  };
}

export default async function ExpressPage({ params }: Props) {
  const { locale } = await params; // 👈 await it
  setRequestLocale(locale);

  const t = await getTranslations("ex");

  return (
    <ServicePageLayout title={t("h1")} imageSrc={Express} imageAlt={t("img")}>
      <p>{t("p1")}</p>
      <p>{t("p2")}</p>
    </ServicePageLayout>
  );
}
