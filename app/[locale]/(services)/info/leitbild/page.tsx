import { setRequestLocale, getTranslations } from "next-intl/server";
import { Metadata } from "next";

import LeitbildImg from "../../../../../assets/images/leitbild.jpg";
import ServicePageLayout from "@/components/ui/layout/service-page-layout";

type Props = {
  params: Promise<{ locale: string }>; // 👈 mark params as Promise
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; // 👈 await it
  const t = await getTranslations({ locale, namespace: "leitbild" });

  return {
    title: t("meta.title"),
    description: t("meta.desc"),
  };
}

const Leitbild = async ({ params }: Props) => {
  const { locale } = await params; // 👈 await it
  setRequestLocale(locale);

  const t = await getTranslations("leitbild");

  return (
    <ServicePageLayout
      title={t("h1")}
      imageSrc={LeitbildImg}
      imageAlt={t("img")}
    >
      <h2>{t("h2.1")}</h2>
      <p>{t("p1")}</p>
      <h2>{t("h2.2")}</h2>
      <p>{t("p2")}</p>
      <h2>{t("h2.3")}</h2>
      <p>{t("p3")}</p>
      <h2>{t("h2.4")}</h2>
      <p>{t("p4")}</p>
      <h2>{t("h2.5")}</h2>
      <p>{t("p5")}</p>
      <h2>{t("h2.6")}</h2>
      <p>{t("p6")}</p>
      <h2>{t("h2.7")}</h2>
      <p>{t("p7")}</p>
      <h2>{t("h2.8")}</h2>
      <p>{t("p8")}</p>
      <h2>{t("h2.9")}</h2>
      <p>{t("p9")}</p>
    </ServicePageLayout>
  );
};

export default Leitbild;
