// TODO: complete title and check icon must be fixed

import React from "react";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import s from "../../../../../components/ui/layout/service-page-layout.module.scss";
import InfoBox from "@/components/ui/elements/info-box/info-box";
import {
  CheckList,
  CheckListItem,
} from "@/components/ui/elements/check-list/check-list";
import AnfrageButton from "@/components/ui/elements/anfrage-button/anfrage-button";
import TransporteImg from "../../../../../assets/images/fahrzeugueberfuehrung.jpg";
import ServicePageLayout from "@/components/ui/layout/service-page-layout";

type Props = {
  params: Promise<{ locale: string }>; // 👈 mark params as Promise
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; // 👈 await it
  const t = await getTranslations({ locale, namespace: "fz" });

  return {
    title: t("meta.title"),
    description: t("meta.desc"),
  };
}

export default async function FahrzeugÜberfuehrungPage({ params }: Props) {
  const { locale } = await params; // 👈 await it
  setRequestLocale(locale);

  const t = await getTranslations("fz");
  const tuc = await getTranslations("ct");

  return (
    <>
      <ServicePageLayout
        title={t("h1")}
        imageSrc={TransporteImg}
        imageAlt={t("img")}
      >
        <h2>{t("h2.1")}</h2>
        <p>{t("p1")}</p>
        <AnfrageButton title={t("btn.title") || ""} url="/forms/ueberfuehrung">
          {t("btn.text")}
        </AnfrageButton>
      </ServicePageLayout>
      <section className={s.container}>
        {/* 2. The main content is now in its own div */}
        <div className={s.mainContent}>
          <h3>{t("h3.1")}</h3>
          <p>{t("p2")}</p>
          <h3>{t("h3.2")}</h3>
          <p>{t("p3")}</p>
          <h3>{t("h3.3")}</h3>
          <p>{t("p4")}</p>
          <h3>{t("h3.4")}</h3>
          <p>{t("p5")}</p>
          <h3>{t("h3.5")}</h3>
          <p>{t("p6")}</p>
          <h3>{t("h3.6")}</h3>
          <p>{t("p7")}</p>
          <InfoBox title={t("h4")}>{tuc("it")}</InfoBox>
        </div>
        <aside className={s.imageContainer}>
          <h2>{t("h2.2")}</h2>
          <CheckList>
            {Array.from({ length: 7 }, (_, index) => (
              <React.Fragment key={index}>
                <h4>{t(`h3.${index + 7}`)}</h4>
                <CheckListItem>{t(`p${index + 8}`)}</CheckListItem>
              </React.Fragment>
            ))}
          </CheckList>
        </aside>
      </section>
    </>
  );
}
