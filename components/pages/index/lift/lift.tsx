import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { Link } from "@/navigation";
import s from "../index.module.scss";
import Kran from "../../../../assets/images/umzugslift-start.jpg";

const Umzugskran = async () => {
  const t = await getTranslations("index");

  return (
    <section className={`${s.index}`}>
      <div className={`${s.content} container mx-w-1300`}>
        <div className={s.contentLeft}>
          <h2>{t("ml.h2")}</h2>
          <p>
            {t("ml.p1")}{" "}
            <Link href="/produkte/umzuege" title={t("dl.btn2.title") || ""}>
              {t("removals")}
            </Link>
            . {t("ml.p2")}
          </p>
          <p>{t("ml.p3")}</p>
          <div className="btn-group">
            <Link
              className="btn btn-small"
              title={t("dl.btn5.title") || ""}
              href="/produkte/moebellift"
            >
              {t("dl.btn1.text")}
            </Link>
            <Link
              className="btn btn-small reverse"
              title={t("li5.title") || ""}
              href="/forms/lift"
            >
              {t("dl.btn1.text2")}
            </Link>
          </div>
        </div>

        <div className={`${s.contentRight} ${s.w450}`}>
          <Image src={Kran} alt={t("ml.title")} />
        </div>
      </div>
    </section>
  );
};

export default Umzugskran;
