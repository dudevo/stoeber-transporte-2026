// TODO: check icon size and font-size in checklist must be fixed

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
import TransporteImg from "../../../../../assets/images/entruempelungen_haushaltsaufloesungen.jpg";

type Props = {
  params: Promise<{ locale: string }>; // 👈 mark params as Promise
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; // 👈 await it
  const t = await getTranslations({ locale, namespace: "et" });

  return {
    title: t("meta.title"),
    description: t("meta.desc"),
  };
}

export default async function EntruempelungPage({ params }: Props) {
  const { locale } = await params; // 👈 await it
  setRequestLocale(locale);

  const t = await getTranslations("et");
  const tuc = await getTranslations("ct");

  return (
    <section className={s.container}>
      <div className={s.pageTitle}>
        <PageTitle>{t("h1")}</PageTitle>
      </div>
      {/* 2. The main content is now in its own div */}
      <div className={s.mainContent}>
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
        <h2>{t("h2")}</h2>
        <p>{t("p3")}</p>
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
        <span>(image@adobe-stock: #238010974-biggi62)</span>
        <CheckList>
          {Array.from({ length: 5 }, (_, index) => (
            <CheckListItem key={index + 1}>{t(`li${index + 1}`)}</CheckListItem>
          ))}
        </CheckList>
      </aside>
    </section>
  );
}
