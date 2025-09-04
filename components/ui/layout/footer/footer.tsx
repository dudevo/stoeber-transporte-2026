"use client";

import Image from "next/image";
import Script from "next/script";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/navigation"; // Use the locale-aware Link from next-intl setup

// Icons imported from lucide-react
import { Phone, Mail, Printer, ArrowRight } from "lucide-react";

import s from "./footer.module.scss";
import Logo from "@/assets/images/logos/logo.png"; // Assuming paths are correct from src/
import Amoe from "@/assets/images/amoe.jpg";

export default function Footer() {
  // Pointing to the "index" namespace as per your file
  const t = useTranslations("index");
  const locale = useLocale();

  // Data array for links, with keys mapped directly to your 'footer' object
  const footerLinks = [
    { textKey: "imp", href: "/impressum" },
    { textKey: "agb", href: "/agb" },
    { textKey: "ds", href: "/datenschutz" },
    { textKey: "sa", href: "/info/stellenangebote", isGermanOnly: true },
    { textKey: "hi", href: "/haftung" },
    {
      textKey: "amo", // This key is not in your file, so the text will be hardcoded below
      href: "https://www.amoe.de/schlichtungsstelle",
      isExternal: true,
    },
  ];

  return (
    <>
      <footer className={s.info}>
        <div className={`${s.container} st-container`}>
          {/* Part 1: Main Logo */}
          <div className={s.logoWrapper}>
            <Link href="/" className={s.logoLink}>
              <Image src={Logo} alt={t("footer.img")} className={s.logoImage} />
            </Link>
          </div>

          {/* Part 2: All Text Content */}
          <div className={s.contentWrapper}>
            {/* Internal Column A: Address & Contact */}
            <div className={s.infoColumn}>
              <address className={s.address}>
                <h4>{t("footer.h4")}</h4>
                <p>Westtangente 4</p>
                <p>D-79395 Neuenburg</p>
              </address>
              <ul className={s.contactList}>
                <li>
                  <a href="tel:+4976317400600">
                    <Phone size={16} />
                    <span>+49 (0)7631 7400600</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+4976317400629">
                    <Printer size={16} />
                    <span>+49 (0)7631 7400629</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:team@stoeber-transporte.de">
                    <Mail size={16} />
                    <span>team(at)stoeber-transporte.de</span>
                  </a>
                </li>
              </ul>
            </div>
            {/* Internal Column B: Links */}
            <div>
              <ul className={s.linksList}>
                {footerLinks.map((link) => {
                  if (link.isGermanOnly && locale !== "de") {
                    return null;
                  }
                  // Special handling for AMO link text which is not in the file
                  const linkText =
                    link.textKey === "amo"
                      ? "AMÖ-Schlichtungsstelle"
                      : t(`footer.${link.textKey}`);
                  return (
                    <li key={link.textKey}>
                      <ArrowRight size={14} />
                      {link.isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {linkText}
                        </a>
                      ) : (
                        <Link href={link.href}>{linkText}</Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Part 3: Partner Logo */}
          <div className={s.partnerWrapper}>
            <a
              href="https://www.amoe.de/"
              target="_blank"
              rel="noopener noreferrer"
              title={t("footer.img2")}
            >
              <Image
                src={Amoe}
                alt={t("footer.img2")}
                className={s.amoeImage}
              />
            </a>
          </div>
        </div>
      </footer>

      {/* Kite Widget Script Loading */}
      <Script id="kite-config" strategy="lazyOnload">
        {`
          window.kiteConfig = {
            host: "kite.wildix.com",
            src: "static/js/libs/widget.min.js",
            serialOrPbxName: "221100006aa5",
            extension: "10",
            language: "",
            autoConnect: true,
            autoLogin: false,
            autoLoginName: "",
            autoLoginEmail: "",
            askGeolocation: false,
            askNotification: false,
            isExpanded: false,
            expandTimeout: "",
            openInNewWindow: false,
            position: "bottom",
            newDesign: true,
            hoverTitle: "Stöber Tranporte",
            buttonIcon: "phone",
            buttonIconColor: "#014993",
            bottomOffset: "25px",
            rightOffset: "25px",
          };
        `}
      </Script>
      <Script
        id="kite-widget"
        src="https://kite.wildix.com/static/js/libs/widget.min.js"
        strategy="lazyOnload"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://kite.wildix.com/static/css/widget.css"
      />
    </>
  );
}
