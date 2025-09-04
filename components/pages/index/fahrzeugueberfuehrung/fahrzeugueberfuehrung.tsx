import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { Link } from "@/navigation";
import s from "../index.module.scss";
import Img from "../../../../assets/images/fahrzeugueberfuehrung.jpg";

const Fahrzeugueberfuehrung = async () => {
  const t = await getTranslations("index");

  return (
    <section className={`${s.index}`}>
      <div className={`${s.content} container mx-w-1300`}>
        <div className={s.contentLeft}>
          <h2>{t("vehicle transfer")}</h2>
          <p>{t("fz.p1")}</p>
          <p>{t("fz.p2")}</p>
          <div className="btn-group">
            <Link
              className="btn btn-small"
              title={t("fz.title1") || ""}
              href="/produkte/fahrzeugueberfuehrung"
            >
              {t("dl.btn1.text")}
            </Link>
            <Link
              className="btn btn-small reverse"
              title={t("fz.title2") || ""}
              href="/forms/ueberfuehrung"
            >
              {t("dl.btn1.text2")}
            </Link>
          </div>
        </div>

        <div className={`${s.contentRight} ${s.w450}`}>
          <Image src={Img} alt={t("fz.img")} />
        </div>
      </div>
    </section>
  );
};

export default Fahrzeugueberfuehrung;
