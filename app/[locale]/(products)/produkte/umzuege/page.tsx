import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import PageTitle from "@/components/ui/elements/page-title/page-title";
import s from "../../../../../components/ui/layout/service-page-layout.module.scss";
import { Link } from "@/navigation";
import InfoBox from "@/components/ui/elements/info-box/info-box";
import {
  CheckList,
  CheckListItem,
} from "@/components/ui/elements/check-list/check-list";
import ServicePageLayout from "@/components/ui/layout/service-page-layout";
import TransporteImg from "../../../../../assets/images/umzug-verpackung.jpg";
import UmzugLagerung from "../../../../../assets/images/umzug-lagerung.jpg";
import Renovierung from "../../../../../assets/images/renovierung.jpg";

type Props = {
  params: Promise<{ locale: string }>; // 👈 mark params as Promise
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; // 👈 await it
  const t = await getTranslations({ locale, namespace: "uz" });

  return {
    title: t("meta.title"),
    description: t("meta.desc"),
  };
}

export default async function UmzugsPage({ params }: Props) {
  const { locale } = await params; // 👈 await it
  setRequestLocale(locale);

  const t = await getTranslations("uz");
  const tuc = await getTranslations("ct");

  return (
    <>
      <section className={s.container}>
        <div className={s.pageTitle}>
          <PageTitle>{t("h1")}</PageTitle>
        </div>
        {/* 2. The main content is now in its own div */}
        <div className={s.mainContent}>
          <p>{t("p1")}</p>
          <p>
            {t("p2.1")}{" "}
            <Link
              href="/produkte/entruempelungen_haushaltsaufloesungen"
              title={t("p2.title") || ""}
            >
              {t("p2.2")}
            </Link>
            {t("p2.3")}
          </p>
          <p>
            {t("p3.1")}{" "}
            <Link href="/produkte/umzuege_spanien" title={t("p3.title") || ""}>
              {t("p3.2")}
            </Link>
            {t("p3.3")}
          </p>
          <p>{t("p4")}</p>

          <InfoBox title={t("h4")}>{tuc("it")}</InfoBox>
        </div>
        <aside className={s.imageContainer}>
          <h2>{t("h2.1")}</h2>
          <CheckList>
            {Array.from({ length: 10 }, (_, index) => (
              <CheckListItem key={index + 1}>
                {t(`ul1.li${index + 1}`)}
              </CheckListItem>
            ))}
          </CheckList>
        </aside>
      </section>
      <ServicePageLayout
        imageSrc={TransporteImg}
        imageAlt={t("images.img1")}
        imageLicenceText="(image@adobe-stock: #51999399-savoieleysse)"
      >
        <h2>{t("h2.2")}</h2>
        <h3>{t("h3.1")}</h3>
        <p>{t("p5")}</p>
        <p>{t("p6")}</p>
        {locale === "de" && (
          <p>
            Alternativ können Sie Packmaterial und Zubehör auch in unserem{" "}
            <Link
              href="/shop"
              title="Shop für Zebhör und Verpackungsmaterial für Ihren Umzug"
            >
              Shop
            </Link>{" "}
            erwerben.
          </p>
        )}
        <CheckList>
          {Array.from({ length: 8 }, (_, index) => (
            <CheckListItem key={index + 1}>
              {t(`ul2.li${index + 1}`)}
            </CheckListItem>
          ))}
        </CheckList>
      </ServicePageLayout>
      <ServicePageLayout
        imageSrc={UmzugLagerung}
        imageAlt={t("images.img2")}
        imageLicenceText="(image@adobe-stock: #287147519-romaset)"
      >
        <h2>{t("h2.3")}</h2>
        <h3>{t("h3.2")}</h3>
        <p>
          {t("p7.1")}{" "}
          <Link href="/produkte/lagerung" title={t("p7.title") || ""}>
            {t("p7.2")}
          </Link>{" "}
          {t("p7.3")}
        </p>
        <CheckList>
          {Array.from({ length: 4 }, (_, index) => (
            <CheckListItem key={index + 1}>
              {t(`ul3.li${index + 1}`)}
            </CheckListItem>
          ))}
        </CheckList>
      </ServicePageLayout>
      <ServicePageLayout
        imageSrc={Renovierung}
        imageAlt={t("images.img3")}
        imageLicenceText="(image@adobe-stock: #256933686-ANR Production)"
      >
        <h2>{t("h2.4")}</h2>
        <h3>{t("h3.3")}</h3>
        <p>{t("p8")}</p>
        <p>
          {t("p9.1")}{" "}
          <Link
            href="/produkte/entruempelungen_haushaltsaufloesungen"
            title={t("p9.title") || ""}
          >
            {t("p9.2")}
          </Link>
          .
        </p>
        <CheckList>
          {Array.from({ length: 4 }, (_, index) => (
            <CheckListItem key={index + 1}>
              {t(`ul4.li${index + 1}`)}
            </CheckListItem>
          ))}
        </CheckList>
        <h2>{t("h2.5")}</h2>
        <h3>{t("h3.4")}</h3>
        <CheckList>
          {Array.from({ length: 6 }, (_, index) => (
            <CheckListItem key={index + 1}>
              {t(`ul5.li${index + 1}`)}
            </CheckListItem>
          ))}
        </CheckList>
        <h2>{t("h2.6")}</h2>
        <h3>{t("h3.5")}</h3>
        <p>{t("p10")}</p>

        <h3>{t("h3.6")}</h3>
        <p>{t("p11")}</p>

        <h3>{t("h3.7")}</h3>
        <p>{t("p12")}</p>

        <h3>{t("h3.8")}</h3>
        <p>
          {t("p13.1")}{" "}
          <Link
            href="/produkte/entruempelungen_haushaltsaufloesungen"
            title={t("p13.title") || ""}
          >
            {t("p13.2")}
          </Link>{" "}
          {t("p13.3")}
        </p>

        <h3>{t("h3.9")}</h3>
        <p>
          {t("p14.1")}{" "}
          <Link
            href="/produkte/entruempelungen_haushaltsaufloesungen"
            title={t("p14.title") || ""}
          >
            {t("p14.2")}
          </Link>{" "}
          {t("p14.3")}
        </p>

        <h3>{t("h3.10")}</h3>
        <p>
          {t("p15.1")}{" "}
          <Link href="/produkte/moebellift" title={t("p15.title") || ""}>
            {t("p15.2")}
          </Link>
          ,{t("p15.3")}
        </p>

        <h3>{t("h3.11")}</h3>
        <p>{t("p16")}</p>

        <h3>{t("h3.12")}</h3>
        <p>
          {t("p17")}{" "}
          {locale === "de" ? <Link href="/shop">{t("p18")}</Link> : t("p18")}{" "}
          {t("p19")}
        </p>
      </ServicePageLayout>
    </>
  );
}
