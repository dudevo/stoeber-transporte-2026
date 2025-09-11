import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { HandHeart } from "lucide-react";

import FormContainer from "@/components/ui/layout/form-container";
import styles from "./haftung.module.scss";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t("haftung.meta.title"),
    description: t("haftung.meta.desc"),
  };
}

export default async function HaftungPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  return (
    <FormContainer
      title={t("haftung.h1")}
      icon={<HandHeart size={40} color="#274c88" strokeWidth={1.5} />}
    >
      <div className={styles.container}>
        {/* Section 1: Anwendungsbereich */}
        <div className={styles.sectionContent}>
          <h2 className={styles.header}>{t("haftung.h2.1")}</h2>
          <p className={styles.paragraph}>{t("haftung.p1")}</p>
        </div>

        {/* Section 2: Haftungsgrundsätze */}
        <div className={styles.sectionContent}>
          <h2 className={styles.header}>{t("haftung.h2.2")}</h2>
          <p className={styles.paragraph}>{t("haftung.p2")}</p>
        </div>

        {/* Section 3: Haftungshöchstbetrag */}
        <div className={styles.sectionContent}>
          <h2 className={styles.header}>{t("haftung.h2.3")}</h2>
          <p className={styles.paragraph}>
            <span className={styles.bold}>{t("haftung.p3.1")}</span>
          </p>
          <p className={styles.paragraph}>{t("haftung.p3.2")}</p>
        </div>

        {/* Section 4: Wertersatz */}
        <div className={styles.sectionContent}>
          <h2 className={styles.header}>{t("haftung.h2.4")}</h2>
          <p className={styles.paragraph}>{t("haftung.p4")}</p>
        </div>

        {/* Section 5: Haftungsausschluss */}
        <div className={styles.sectionContent}>
          <h2 className={styles.header}>{t("haftung.h2.5")}</h2>
          <p className={styles.paragraph}>{t("haftung.p5")}</p>
        </div>

        {/* Section 6: Besondere Haftungsausschlussgründe */}
        <div className={styles.sectionContent}>
          <h2 className={styles.header}>{t("haftung.h2.6")}</h2>
          <p className={styles.paragraph}>{t("haftung.p6.1")}</p>
          <p className={styles.indentedParagraph}>{t("haftung.p6.2")}</p>
          <p className={styles.indentedParagraph}>{t("haftung.p6.3")}</p>
          <p className={styles.indentedParagraph}>{t("haftung.p6.4")}</p>
          <p className={styles.indentedParagraph}>{t("haftung.p6.5")}</p>
          <p className={styles.indentedParagraph}>{t("haftung.p6.6")}</p>
          <p className={styles.indentedParagraph}>{t("haftung.p6.7")}</p>
          <p className={styles.indentedParagraph}>{t("haftung.p6.8")}</p>
          <p className={styles.paragraph}>{t("haftung.p6.9")}</p>
        </div>

        {/* Section 7: Außervertragliche Ansprüche */}
        <div className={styles.sectionContent}>
          <h2 className={styles.header}>{t("haftung.h2.7")}</h2>
          <p className={styles.paragraph}>{t("haftung.p7")}</p>
        </div>

        {/* Section 8: Wegfall der Haftungsbefreiungen */}
        <div className={styles.sectionContent}>
          <h2 className={styles.header}>{t("haftung.h2.8")}</h2>
          <p className={styles.paragraph}>{t("haftung.p8")}</p>
        </div>

        {/* Section 9: Haftung der Leute */}
        <div className={styles.sectionContent}>
          <h2 className={styles.header}>{t("haftung.h2.9")}</h2>
          <p className={styles.paragraph}>{t("haftung.p9")}</p>
        </div>

        {/* Section 10: Haftung Dritter */}
        <div className={styles.sectionContent}>
          <h2 className={styles.header}>{t("haftung.h2.10")}</h2>
          <p className={styles.paragraph}>{t("haftung.p10.1")}</p>
          <div className={styles.emphasizedText}>
            {t("haftung.span10")}
          </div>
          <p className={styles.paragraph}>{t("haftung.p10.2")}</p>
        </div>

        {/* Section 11: Transportversicherung */}
        <div className={styles.sectionContent}>
          <h2 className={styles.header}>{t("haftung.h2.11")}</h2>
          <p className={styles.paragraph}>{t("haftung.p11")}</p>
        </div>

        {/* Section 12: Schadensanzeige */}
        <div className={styles.sectionContent}>
          <h2 className={styles.header}>{t("haftung.h2.12")}</h2>
          <p className={styles.paragraph}>{t("haftung.p12.1")}</p>
          <p className={styles.indentedParagraph}>{t("haftung.p12.2")}</p>
          <p className={styles.indentedParagraph}>{t("haftung.p12.3")}</p>
          <p className={styles.indentedParagraph}>{t("haftung.p12.4")}</p>
          <p className={styles.indentedParagraph}>{t("haftung.p12.5")}</p>
          <p className={styles.indentedParagraph}>{t("haftung.p12.6")}</p>
          <p className={styles.indentedParagraph}>{t("haftung.p12.7")}</p>
        </div>

        {/* Section 13: Gefährliches Umzugsgut */}
        <div className={styles.sectionContent}>
          <h2 className={styles.header}>{t("haftung.h2.13")}</h2>
          <p className={styles.paragraph}>{t("haftung.p13")}</p>
        </div>

        {/* Section 14: Anweisungen für das Verhalten im Schadenfall */}
        <div className={`${styles.sectionContent} ${styles.instructionsSection}`}>
          <h2 className={styles.header}>{t("haftung.h2.14")}</h2>
          <p className={styles.paragraph}>{t("haftung.p14.1")}</p>
          <p className={styles.paragraph}>
            <span className={styles.bold}>{t("haftung.p14.2")}</span>
          </p>
          <p className={styles.indentedParagraph}>{t("haftung.p14.3")}</p>
          <p className={styles.indentedParagraph}>{t("haftung.p14.4")}</p>
          <p className={styles.indentedParagraph}>{t("haftung.p14.5")}</p>
          <p className={styles.indentedParagraph}>{t("haftung.p14.6")}</p>
          <p className={styles.indentedParagraph}>{t("haftung.p14.7")}</p>
          <p className={styles.paragraph}>
            <span className={styles.bold}>{t("haftung.p14.8")}</span>
          </p>

          {/* Responsive list container */}
          <div className={styles.listContainer}>
            <div className={styles.listColumn}>
              <ul>
                <li>a) {t("haftung.li14.1")}</li>
                <li>b) {t("haftung.li14.2")}</li>
                <li>c) {t("haftung.li14.3")}</li>
                <li>d) {t("haftung.li14.4")}</li>
                <li>e) {t("haftung.li14.5")}</li>
                <li>f) {t("haftung.li14.6")}</li>
                <li>g) {t("haftung.li14.7")}</li>
                <li>h) {t("haftung.li14.8")}</li>
              </ul>
            </div>
            <div className={styles.listColumn}>
              <ul>
                <li>i) {t("haftung.li14.9")}</li>
                <li>j) {t("haftung.li14.10")}</li>
                <li>k) {t("haftung.li14.11")}</li>
                <li>l) {t("haftung.li14.12")}</li>
                <li>m) {t("haftung.li14.13")}</li>
                <li>n) {t("haftung.li14.14")}</li>
                <li>o) {t("haftung.li14.15")}</li>
                <li>p) {t("haftung.li14.16")}</li>
              </ul>
            </div>
          </div>

          <p className={styles.paragraph}>
            <span className={styles.bold}>{t("haftung.p14.9")}</span>
          </p>
          <p className={styles.paragraph}>{t("haftung.p14.10")}</p>
        </div>

        {/* Download Section */}
        <div className={styles.downloadSection}>
          <Link
            href="/documents/haftung.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.downloadButton}
          >
            Download (PDF)
            <span className={styles.downloadIcon}>»</span>
          </Link>
        </div>
      </div>
    </FormContainer>
  );
}
