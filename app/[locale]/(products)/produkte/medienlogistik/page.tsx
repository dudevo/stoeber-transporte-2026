import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import MedienLogistik from "../../../../../assets/images/medienlogistik.jpg";
import ServicePageLayout from "@/components/ui/layout/service-page-layout";

type Props = {
  params: Promise<{ locale: string }>; // 👈 mark params as Promise
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; // 👈 await it
  const t = await getTranslations({ locale, namespace: "ml" });

  return {
    title: t("meta.title"),
    description: t("meta.desc"),
  };
}

export default async function MedienLogistikPage({ params }: Props) {
  const { locale } = await params; // 👈 await it
  setRequestLocale(locale);

  const t = await getTranslations("ml");

  return (
    <ServicePageLayout
      title={t("h1")}
      imageSrc={MedienLogistik}
      imageAlt={t("img")}
    >
      <p>{t("p1")}</p>
      <p>{t("p2")}</p>
      <p>{t("p3")}</p>
      <p>
        <strong>{t("p4")}</strong>
      </p>
    </ServicePageLayout>
  );
}
