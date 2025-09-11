import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { Scale } from "lucide-react";

import FormContainer from "@/components/ui/layout/form-container";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t("agb.meta.title"),
    description: t("agb.meta.desc"),
  };
}

export default async function AGBPage({ params }: Props) {
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
      title={t("agb.h1.1") + " " + t("agb.h1.2")}
      icon={<Scale size={40} color="#274c88" strokeWidth={1.5} />}
    >
      <div style={{ 
        lineHeight: "1.6",
        fontSize: "1rem",
        color: "#333"
      }}>
        <h2 style={headerStyle}>1. {t("agb.h2.1")}</h2>
        <p style={{ marginBottom: "0.75rem" }}>1.1. {t("agb.p1.1")}</p>
        <p>1.2. {t("agb.p1.2")}</p>
        <p>1.3. {t("agb.p1.3")}</p>
        <p>1.4. {t("agb.p1.4")}</p>

        <h2 style={headerStyle}>2. {t("agb.h2.2")}</h2>
        <p>{t("agb.p2")}</p>

        <h2 style={headerStyle}>3. {t("agb.h2.3")}</h2>
        <p>{t("agb.p3")}</p>

        <h2 style={headerStyle}>4. {t("agb.h2.4")}</h2>
        <p>{t("agb.p4")}</p>

        <h2 style={headerStyle}>5. {t("agb.h2.5")}</h2>
        <p>{t("agb.p5")}</p>

        <h2 style={headerStyle}>6. {t("agb.h2.6")}</h2>
        <p>6.1. {t("agb.p6.1")}</p>
        <p>6.2. {t("agb.p6.2")}</p>
        <p>6.3. {t("agb.p6.3")}</p>

        <h2 style={headerStyle}>7. {t("agb.h2.7")}</h2>
        <p>{t("agb.p7")}</p>

        <h2 style={headerStyle}>8. {t("agb.h2.8")}</h2>
        <p>{t("agb.p8")}</p>

        <h2 style={headerStyle}>9. {t("agb.h2.9")}</h2>
        <p>{t("agb.p9")}</p>

        <h2 style={headerStyle}>10. {t("agb.h2.10")}</h2>
        <p>10.1. {t("agb.p10.1")}</p>
        <p>10.2. {t("agb.p10.2")}</p>
        <p>10.3. {t("agb.p10.3")}</p>
        <p>10.4. {t("agb.p10.4")}</p>

        <h2 style={headerStyle}>11. {t("agb.h2.11")}</h2>
        <p>{t("agb.p11.1")}</p>
        <p>11.2. {t("agb.p11.2")}</p>
        <p>11.2.1. {t("agb.p11.31")}</p>
        <p>11.2.2. {t("agb.p11.32")}</p>
        <p>11.2.3. {t("agb.p11.33")}</p>
        <p>11.3. {t("agb.p11.3")}</p>
        <p>11.4. {t("agb.p11.4")}</p>
        <p>11.5. {t("agb.p11.5")}</p>
        <p>11.6. {t("agb.p11.6")}</p>
        <p>11.7. {t("agb.p11.7")}</p>
        <p>11.8. {t("agb.p11.8")}</p>
        <p>11.9. {t("agb.p11.9")}</p>
        <p>11.10. {t("agb.p11.10")}</p>

        <h2 style={headerStyle}>12. {t("agb.h2.12")}</h2>
        <p>12.1. {t("agb.p12.1")}</p>
        <p>12.2. {t("agb.p12.2")}</p>
        <p>12.2.1. {t("agb.p12.21")}</p>
        <p>12.2.2. {t("agb.p12.22")}</p>

        <h2 style={headerStyle}>13. {t("agb.h2.13")}</h2>
        <p>13.1. {t("agb.p13.1")}</p>
        <p>13.2. {t("agb.p13.2")}</p>

        <h2 style={headerStyle}>14. {t("agb.h2.14")}</h2>
        <p>{t("agb.p14")}</p>

        <h2 style={headerStyle}>15. {t("agb.h2.15")}</h2>
        <p>{t("agb.p15")}</p>

        <h2 style={headerStyle}>16. {t("agb.h2.16")}</h2>
        <p>16.1. {t("agb.p16.1")}</p>
        <ul style={{ margin: "16px 0", paddingLeft: "20px" }}>
          <li>{t("agb.li16.1")}</li>
          <li>{t("agb.li16.2")}</li>
          <li>{t("agb.li16.3")}</li>
          <li>{t("agb.li16.4")}</li>
        </ul>
        <p>16.2. {t("agb.p16.2")}</p>
        <p>16.3. {t("agb.p16.3")}</p>

        <div style={{ 
          marginTop: "2rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid #e0e0e0"
        }}>
          <Link
            href="/documents/agb.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              backgroundColor: "#274c88",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Download (PDF)
            <span style={{ marginLeft: "4px" }}>»</span>
          </Link>
        </div>
      </div>
    </FormContainer>
  );
}
