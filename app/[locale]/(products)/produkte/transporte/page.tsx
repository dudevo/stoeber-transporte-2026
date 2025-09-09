import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import InfoBox from "@/components/ui/elements/info-box/info-box";
import TransporteImg from "../../../../../assets/images/transporte-aller-art.jpg";
import ServicePageLayout from "@/components/ui/layout/service-page-layout";
import AnfrageButton from "@/components/ui/elements/anfrage-button/anfrage-button";

type Props = {
  params: Promise<{ locale: string }>; // 👈 mark params as Promise
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; // 👈 await it
  const t = await getTranslations({ locale, namespace: "tp" });

  return {
    title: t("meta.title"),
    description: t("meta.desc"),
  };
}

export default async function TransportPage({ params }: Props) {
  const { locale } = await params; // 👈 await it
  setRequestLocale(locale);

  const t = await getTranslations("tp");
  const tuc = await getTranslations("ct");

  return (
    <ServicePageLayout
      title={t("h1")}
      imageSrc={TransporteImg}
      imageAlt={t("img")}
    >
      <p>{t("p1")}</p>
      <p>{t("p2")}</p>
      <p>{t("p3")}</p>
      <AnfrageButton title={t("btn.title") || ""} url="/forms/transportanfrage">
        {t("btn.text")}
      </AnfrageButton>
      <InfoBox title={t("h4")}>{tuc("it")}</InfoBox>
    </ServicePageLayout>
  );
}
