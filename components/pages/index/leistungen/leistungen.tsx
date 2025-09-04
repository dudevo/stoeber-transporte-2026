import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { featuresConfig } from "./features-config";
import s from "./leistungen.module.scss";

const FeaturesSection = async () => {
  const t = await getTranslations();

  return (
    // We'll use the 'leistungen' class for the container section
    <section className={s.leistungen}>
      <div className={`${s.container}`}>
        {featuresConfig.map((feature) => (
          <div key={feature.key} className={`${s.box} bsha`}>
            {/* RECOMMENDED: Wrap the H2 in the same link as the button */}
            <Link
              href={feature.link.href}
              title={t(feature.link.titleKey) ?? ""}
            >
              <h2>{t(feature.h2TitleKey)}</h2>
            </Link>

            <p>{t(feature.pTextKey)}</p>

            {/* The main button at the bottom */}
            <Link
              className={s.button} // Add a specific class for easier styling
              href={feature.link.href}
              title={t(feature.link.titleKey) ?? ""}
            >
              {t(feature.link.textKey)}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
