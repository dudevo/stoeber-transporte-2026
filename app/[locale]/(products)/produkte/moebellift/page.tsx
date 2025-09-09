// TODO: check icons has not the correct size

import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import PageTitle from "@/components/ui/elements/page-title/page-title";
import s from "../../../../../components/ui/layout/service-page-layout.module.scss";
import InfoBox from "@/components/ui/elements/info-box/info-box";
import {
  CheckList,
  CheckListItem,
} from "@/components/ui/elements/check-list/check-list";
import AnfrageButton from "@/components/ui/elements/anfrage-button/anfrage-button";
import { ImageSlider } from "@/components/ui/elements/image-slider";
import { LIFT_IMAGES } from "@/constants/lift.constants";
import { combineImagesWithTranslations } from "@/lib/utils/image-data";

type Props = {
  params: Promise<{ locale: string }>; // 👈 mark params as Promise
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; // 👈 await it
  const t = await getTranslations({ locale, namespace: "mll" });

  return {
    title: t("meta.title"),
    description: t("meta.desc"),
  };
}

export default async function MoebelliftPage({ params }: Props) {
  const { locale } = await params; // 👈 await it
  setRequestLocale(locale);

  const t = await getTranslations("mll");
  const tuc = await getTranslations("ct");

  // Prepare image data by combining constants with translations
  const sliderImages = combineImagesWithTranslations(
    LIFT_IMAGES,
    t,
    "images", // Uses mll.images.* keys from the JSON
  );

  return (
    <>
      <section className={s.container}>
        <div className={s.pageTitle}>
          <PageTitle>{t("h1")}</PageTitle>
        </div>
        {/* 2. The main content is now in its own div */}
        <div className={s.mainContent}>
          <h2>{t("h2.1")}</h2>
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <AnfrageButton title={t("btn.title")} url="/forms/lift">
            {t("btn.text")}
          </AnfrageButton>
        </div>
        <aside className={s.imageContainer}>
          <ImageSlider
            images={sliderImages}
            aspectRatio="3/4" // Portrait aspect ratio to match lift images (800x1066)
            autoPlayInterval={5000}
            showIndicators={false} // Hide bullet points
            objectFit="cover" // Ensure images fill the container nicely
          />
        </aside>
      </section>
      <section className={s.container}>
        <div className="mainContent">
          <h2>{t("h2.2")}</h2>
          <p>{t("p3")}</p>
          <p>{t("p4")}</p>
          <h2>{t("h2.3")}</h2>
          <p>{t("p5")}</p>
          <h2>{t("h2.4")}</h2>
          <p>{t("p6")}</p>
          <p>{t("p7")}</p>
          <ul>
            <li>{t("ul1.li1")}</li>
            <li>{t("ul1.li2")}</li>
            <li>{t("ul1.li3")}</li>
            <li>{t("ul1.li4")}</li>
            <li>{t("ul1.li5")}</li>
            <li>{t("ul1.li6")}</li>
          </ul>
          <h2>{t("h2.5")}</h2>
          <p>{t("p8")}</p>
          <p>{t("p9")}</p>
          <h2>{t("h2.6")}</h2>
          <p>{t("p10")}</p>
          <ul>
            <li>{t("ul2.li1")}</li>
            <li>{t("ul2.li2")}</li>
            <li>{t("ul2.li3")}</li>
            <li>{t("ul2.li4")}</li>
            <li>{t("ul2.li5")}</li>
          </ul>
          <h2>{t("h2.7")}</h2>
          <p>{t("p11")}</p>
          <p>{t("p12")}</p>
          <ul>
            <li>{t("ul3.li1")}</li>
            <li>{t("ul3.li2")}</li>
            <li>{t("ul3.li3")}</li>
          </ul>
          <h2>{t("h2.8")}</h2>
          <p>{t("p13")}</p>
          <InfoBox title={t("h4")}>{tuc("it")}</InfoBox>
        </div>

        <aside className={s.imageContainer}>
          <h2>{t("h2.10")}</h2>
          <CheckList>
            {Array.from({ length: 5 }, (_, index) => (
              <CheckListItem key={index + 1}>
                {t(`ul.li${index + 1}`)}
              </CheckListItem>
            ))}
          </CheckList>
        </aside>
      </section>
    </>
  );
}
