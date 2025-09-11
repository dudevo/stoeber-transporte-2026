import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { Phone, Printer, Mail, Globe, Smartphone, User } from "lucide-react";

import FormContainer from "@/components/ui/layout/form-container";
import UserProfile from "@/components/ui/user-profile";
import Logo from "@/assets/images/logos/logo.png";
import styles from "./kontakt.module.scss";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: `${t("nav.contact")} - Stöber Transporte`,
    description: "Kontaktinformationen von Stöber Transporte - Ihr Partner für Umzüge und Transporte",
  };
}

export default async function KontaktPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  return (
    <FormContainer
      title={t("nav.contact")}
      icon={<Phone size={40} color="#274c88" strokeWidth={1.5} />}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Company Logo Section */}
          <div className={styles.logoSection}>
            <Image
              src={Logo}
              width={120}
              height={120}
              alt="Stöber Transporte Logo"
              className={styles.logo}
              priority
            />
          </div>

          {/* Main Contact Information */}
          <div className={styles.mainContact}>
            <h2 className={styles.companyName}>Stöber Transporte</h2>
            
            <div className={styles.addressSection}>
              <address className={styles.address}>
                <div>Westtangente 4</div>
                <div>D 79395 Neuenburg</div>
              </address>
            </div>

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

          {/* Direct Contact Section */}
          <div className={styles.directContact}>
            <h2 className={styles.sectionTitle}>Direktwahlen</h2>
            
            <div className={styles.directContactContent}>
              <div className={styles.contactDetails}>
                <div className={styles.position}>
                  Geschäftsleitung / Disposition Umzüge
                </div>
                <div className={styles.personName}>Marc Stöber</div>
                
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
                    <Smartphone size={18} className={styles.icon} />
                    <a href="tel:+491717557157">0171 7 55 71 57</a>
                  </div>
                </div>
              </div>

              {/* User Profile Widget */}
              <div className={styles.userProfileSection}>
                <UserProfile
                  email="marc@stoeber-transporte.de"
                  name="Marc Stöber"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormContainer>
  );
}
