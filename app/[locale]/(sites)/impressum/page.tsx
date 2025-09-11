import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Phone, Printer, Mail, Globe, FileText } from "lucide-react";

import FormContainer from "@/components/ui/layout/form-container";
import Logo from "@/assets/images/logos/logo.png";
import AMOE from "@/assets/images/amoe-gross.jpg";
import styles from "./impressum.module.scss";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: `${t("index.footer.imp")} - Stöber Transporte`,
    description: "Impressum von Stöber Transporte - Rechtliche Informationen und Kontaktdaten",
  };
}

export default async function ImpressumPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  return (
    <FormContainer
      title={t("index.footer.imp")}
      icon={<FileText size={40} color="#274c88" strokeWidth={1.5} />}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Company Logo Section */}
          <div className={styles.logoSection}>
            <Image
              src={Logo}
              width={200}
              height={200}
              alt="Stöber Transporte - Ihr Umzug & Transport Partner im Dreiländereck"
              className={styles.logo}
              priority
            />
          </div>

          {/* Main Content */}
          <div className={styles.mainContent}>
            {/* Main Address */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t("index.imp.h2pa")}</h2>
              <div className={styles.addressBox}>
                <div>Stöber Transporte</div>
                <div>Westtangente 4</div>
                <div>D 79395 Neuenburg</div>
              </div>
            </div>

            {/* Spain Address */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t("index.imp.h2pas")}</h2>
              <div className={styles.addressBox}>
                <div>Stöber Transporte</div>
                <div>Poligono Son Noguera</div>
                <div>Calle Son Fosquet Nr 7 Local Nr 2</div>
                <div>ES 07620 Llucmajor</div>
              </div>
            </div>

            {/* Second Office Address */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t("index.imp.h2pa2")}</h2>
              <div className={styles.addressBox}>
                <div>Stöber Transporte</div>
                <div>Weilertalstrasse 41/1</div>
                <div>D 79410 Badenweiler</div>
              </div>
            </div>

            {/* Managing Director */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t("index.imp.h2gs")}</h2>
              <div className={styles.managerName}>Marc Stöber</div>
            </div>

            {/* Communication */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t("index.imp.h2c")}</h2>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <Phone size={18} className={styles.icon} />
                  <a href="tel:+4976317400600">07631 7400600</a>
                </div>
                <div className={styles.contactItem}>
                  <Printer size={18} className={styles.icon} />
                  <span>07631 7400629</span>
                </div>
                <div className={styles.contactItem}>
                  <Mail size={18} className={styles.icon} />
                  <a href="mailto:team@stoeber-transporte.de">team@stoeber-transporte.de</a>
                </div>
                <div className={styles.contactItem}>
                  <Globe size={18} className={styles.icon} />
                  <a href="https://www.stoeber-transporte.de" target="_blank" rel="noopener noreferrer">
                    www.stoeber-transporte.de
                  </a>
                </div>
              </div>
            </div>

            {/* Liability Notice */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>{t("index.imp.h2hi")}</h2>
              <p className={styles.liabilityText}>{t("index.imp.phi")}</p>
            </div>

            {/* AMOE Membership */}
            <div className={styles.section}>
              <div className={styles.amoeSection}>
                <a 
                  rel="noreferrer" 
                  target="_blank" 
                  href="https://www.umzug.org"
                  className={styles.amoeLink}
                >
                  <Image
                    src={AMOE}
                    alt={t("index.footer.img2")}
                    title={t("index.footer.img2")}
                    width={200}
                    height={150}
                    className={styles.amoeImage}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormContainer>
  );
}
