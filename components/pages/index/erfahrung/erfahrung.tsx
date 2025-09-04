import { getTranslations } from "next-intl/server";
import Image from "next/image";

import s from "../index.module.scss";
import ErfahrungImg from "../../../../assets/images/erfahrung.png";
import { Link } from "@/navigation";

const Erfahrung = async () => {
  const t = await getTranslations("index");
  return (
    <section className={`${s.index}`}>
      <div className={`${s.content} container mx-w-1300`}>
        <div className={s.contentLeft}>
          <h2>{t("er.h2")}</h2>
          <p>
            {t("er.p1")}{" "}
            <Link href="/produkte/transporte" title={t("transports") || ""}>
              {t("transports")}
            </Link>{" "}
            {t("er.or")}{" "}
            <Link href="/produkte/umzuege" title={t("removals") || ""}>
              {t("removals")}
            </Link>{" "}
            {t("er.p2")}
          </p>
          <p>
            {t("er.p3")}{" "}
            <Link href="/produkte/umzuege_spanien" title={t("er.unm") || ""}>
              {t("er.unm")}
            </Link>{" "}
            {t("er.p4")}{" "}
            <Link
              href="/produkte/fahrzeugueberfuehrung"
              title={t("vehicle transfer") || ""}
            >
              {t("er.trf")}
            </Link>{" "}
            {t("er.p5")}{" "}
            <Link href="/produkte/lagerung" title={t("storage") || ""}>
              {t("er.el")}
            </Link>{" "}
            {t("er.p6")}
          </p>
        </div>

        <div className={`${s.contentRight} brn ${s.w450}`}>
          <Image src={ErfahrungImg} alt={t("er.img") || ""} />
        </div>
      </div>
    </section>
  );
};

export default Erfahrung;
