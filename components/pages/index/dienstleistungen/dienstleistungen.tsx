import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";

import s from "../index.module.scss";
import { servicesConfig } from "./dienstleistungen-config";
import { renderServiceLinks } from "./render-service-links";

const Dienstleistungen = async () => {
  const t = await getTranslations("index");
  return (
    <section className={`${s.index}`}>
      <div className={`${s.content} container mx-w-1300`}>
        <div className={s.contentLeft}>
          <h2>
            {t("h2.num1")}, <br />
            <span>{t("h2.span")}</span>
          </h2>
          <p>
            {t("p1.num1")}{" "}
            <Link href="/produkte/transporte" title={t("p1.num2") || ""}>
              {t("p1.num2")}
            </Link>
            , {t("p1.num3")}
          </p>
          <p>
            {t("p2.num1")}{" "}
            <Link href="/produkte/umzuege" title={t("removals") || ""}>
              {t("removals")}
            </Link>
            ,{" "}
            <Link
              href="/produkte/fahrzeugueberfuehrung"
              title={t("p2.num2") || ""}
            >
              {t("p2.num2")}
            </Link>{" "}
            {t("p2.num3")}
          </p>
        </div>

        <div className={`${s.contentRight} brn`}>
          <div className={s.anfragen}>
            <ul>{renderServiceLinks({ config: servicesConfig, t })}</ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dienstleistungen;
