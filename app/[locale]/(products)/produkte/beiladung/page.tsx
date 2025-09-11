// TODO: font size and check icon size must be fixed

import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import s from "../../../../../components/ui/layout/service-page-layout.module.scss";
import InfoBox from "@/components/ui/elements/info-box/info-box";
import {
  CheckList,
  CheckListItem,
} from "@/components/ui/elements/check-list/check-list";
import PageTitle from "@/components/ui/elements/page-title/page-title";
import { Link } from "@/navigation";
import AnfrageButton from "@/components/ui/elements/anfrage-button/anfrage-button";
import TransporteImg from "../../../../../assets/images/beiladung.jpg";

type Props = {
  params: Promise<{ locale: string }>; // 👈 mark params as Promise
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; // 👈 await it
  const t = await getTranslations({ locale, namespace: "bl" });

  return {
    title: t("meta.title"),
    description: t("meta.desc"),
  };
}

export default async function BeiladungPage({ params }: Props) {
  const { locale } = await params; // 👈 await it
  setRequestLocale(locale);

  const t = await getTranslations("bl");
  const tuc = await getTranslations("ct");

  return (
    <section className={s.container}>
      <div className={s.pageTitle}>
        <PageTitle>{t("h1")}</PageTitle>
      </div>
      {/* 2. The main content is now in its own div */}
      <div className={s.mainContent}>
        <p>
          {t("p1.1")}{" "}
          <Link href="/produkte/umzuege" title={t("p1.2") || ""}>
            {t("p1.2")}
          </Link>
          {t("p1.3")}
        </p>
        <p>
          {t("p2.1")}{" "}
          <Link href="/produkte/transporte" title={t("p2.2") || ""}>
            {t("p2.2")}
          </Link>{" "}
          {t("p2.3")}
        </p>
        <p>{t("p3")}</p>
        <p>{t("p4")}</p>
        <AnfrageButton title={t("btn.title") || ""} url="/forms/beiladung">
          {t("btn.text")}
        </AnfrageButton>
        <InfoBox title={t("h4")}>{tuc("it")}</InfoBox>
      </div>
      <aside className={s.imageContainer}>
        <Image
          src={TransporteImg}
          alt={t("img")}
          className={s.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          quality={80}
        />
        <CheckList>
          {Array.from({ length: 5 }, (_, index) => (
            <CheckListItem key={index + 1}>{t(`li${index + 1}`)}</CheckListItem>
          ))}
        </CheckList>
      </aside>
    </section>
  );
}
