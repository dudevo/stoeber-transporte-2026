import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Shield } from "lucide-react";

import FormContainer from "@/components/ui/layout/form-container";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t("datenschutz.meta.title"),
    description: t("datenschutz.meta.desc"),
  };
}

export default async function DatenschutzPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  const headerStyle = {
    color: "#274c88", 
    fontSize: "1.25rem", 
    fontWeight: "600",
    marginTop: "1.5rem",
    marginBottom: "0.75rem"
  };

  return (
    <FormContainer
      title={t("datenschutz.h1")}
      icon={<Shield size={40} color="#274c88" strokeWidth={1.5} />}
    >
      <div style={{ 
        lineHeight: "1.6",
        fontSize: "1rem",
        color: "#333"
      }}>
        <h2 style={headerStyle}>{t("datenschutz.h2.1")}</h2>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p1.1")}</p>
        <ul style={{ margin: "16px 0", paddingLeft: "20px", marginBottom: "0.75rem" }}>
          <li>Stöber Transporte</li>
          <li>Marc Stöber</li>
          <li>Weilertalstrasse 41/1</li>
          <li>79410 Badenweiler</li>
        </ul>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p1.2")}</p>

        <h2 style={headerStyle}>{t("datenschutz.h2.2")}</h2>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p2")}</p>

        <h2 style={headerStyle}>{t("datenschutz.h2.3")}</h2>
        <p style={{ marginBottom: "0.75rem" }}>
          {t("datenschutz.p3")}{" "}
          <a
            target="_blank"
            href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html"
            style={{ color: "#274c88", textDecoration: "underline" }}
            rel="noopener noreferrer"
          >
            {t("datenschutz.a3")}
          </a>
          .
        </p>

        <h2 style={headerStyle}>{t("datenschutz.h2.4")}</h2>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p4")}</p>

        <h2 style={headerStyle}>{t("datenschutz.h2.5")}</h2>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p5")}</p>

        <h2 style={headerStyle}>{t("datenschutz.h2.6")}</h2>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p6")}</p>

        <h2 style={headerStyle}>{t("datenschutz.h2.7")}</h2>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p7.1")}</p>
        <ul style={{ margin: "16px 0", paddingLeft: "20px", marginBottom: "0.75rem" }}>
          <li>{t("datenschutz.li7.1")}</li>
          <li>{t("datenschutz.li7.2")}</li>
          <li>{t("datenschutz.li7.3")}</li>
          <li>{t("datenschutz.li7.4")}</li>
          <li>{t("datenschutz.li7.5")}</li>
          <li>{t("datenschutz.li7.6")}</li>
          <li>{t("datenschutz.li7.7")}</li>
          <li>{t("datenschutz.li7.8")}</li>
        </ul>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p7.2")}</p>

        <h2 style={headerStyle}>{t("datenschutz.h2.8")}</h2>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p8.1")}</p>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p8.2")}</p>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p8.3")}</p>

        <h2 style={headerStyle}>{t("datenschutz.h2.9")}</h2>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p9.1")}</p>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p9.2")}</p>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p9.3")}</p>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p9.4")}</p>

        <h2 style={headerStyle}>{t("datenschutz.h2.10")}</h2>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p10.1")}</p>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p10.2")}</p>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p10.3")}</p>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p10.4")}</p>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p10.5")}</p>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p10.6")}</p>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p10.7")}</p>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p10.8")}</p>

        <h2 style={headerStyle}>{t("datenschutz.h2.11")}</h2>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p11.1")}</p>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p11.2")}</p>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p11.3")}</p>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p11.4")}</p>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p11.5")}</p>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p11.6")}</p>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p11.7")}</p>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p11.8")}</p>
        <p style={{ marginBottom: "0.75rem" }}>{t("datenschutz.p11.9")}</p>

        <div style={{ 
          marginTop: "2rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid #e0e0e0"
        }}>
          <p style={{ fontSize: "0.875rem", color: "#666" }}>
            {t("datenschutz.p9.5")}{" "}
            <a 
              target="_blank" 
              href="https://mein-datenschutzbeauftragter.de"
              style={{ color: "#274c88", textDecoration: "underline" }}
              rel="noopener noreferrer"
            >
              mein-datenschutzbeauftragter.de
            </a>
          </p>
        </div>
      </div>
    </FormContainer>
  );
}
