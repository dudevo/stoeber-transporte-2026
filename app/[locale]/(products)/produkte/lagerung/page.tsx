// TODO: size of check icons must be fixed

import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import s from "../../../../../components/ui/layout/service-page-layout.module.scss";
import InfoBox from "@/components/ui/elements/info-box/info-box";
import {
  CheckList,
  CheckListItem,
} from "@/components/ui/elements/check-list/check-list";
import AnfrageButton from "@/components/ui/elements/anfrage-button/anfrage-button";
import ServicePageLayout from "@/components/ui/layout/service-page-layout";
import Corlette from "../../../../../assets/images/corlette.jpg";

type Props = {
  params: Promise<{ locale: string }>; // 👈 mark params as Promise
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; // 👈 await it
  const t = await getTranslations({ locale, namespace: "la" });

  return {
    title: t("meta.title"),
    description: t("meta.desc"),
  };
}

export default async function LagerungPage({ params }: Props) {
  const { locale } = await params; // 👈 await it
  setRequestLocale(locale);

  const t = await getTranslations("la");
  const tuc = await getTranslations("ct");

  return (
    <>
      <ServicePageLayout
        title={t("h1")}
        imageSrc={Corlette}
        imageAlt={t("img")}
      >
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
        <AnfrageButton title={t("btn.title") || ""} url="/forms/lagerung">
          {t("btn.text")}
        </AnfrageButton>
      </ServicePageLayout>
      <section className={s.container}>
        <div className={s.mainContent}>
          <h2>{t("h2.1")}</h2>
          <p>{t("p3")}</p>
          <p>{t("p4")}</p>
        </div>

        <aside className={s.imageContainer}>
          <CheckList>
            {Array.from({ length: 4 }, (_, index) => (
              <CheckListItem key={index + 1}>
                {t(`ul1.li${index + 1}`)}
              </CheckListItem>
            ))}
          </CheckList>
        </aside>
      </section>
      <section className={s.container}>
        <div className={s.mainContent}>
          <h2>{t("h2.2")}</h2>
          <p>{t("p5")}</p>
          <p>{t("p6")}</p>
          <InfoBox title={t("h4")}>{tuc("it")}</InfoBox>
        </div>

        <aside className={s.imageContainer}>
          <CheckList>
            {Array.from({ length: 4 }, (_, index) => (
              <CheckListItem key={index + 1}>
                {t(`ul2.li${index + 1}`)}
              </CheckListItem>
            ))}
          </CheckList>
        </aside>
      </section>
    </>
  );
}
