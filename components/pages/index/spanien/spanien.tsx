import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/navigation";
import s from "./spanien.module.scss";
import BGImage from "../../../../assets/images/umzug_spanien_start.jpg";

const Spanien = async () => {
  const t = await getTranslations("index");

  return (
    <section className={s.spanien}>
      {/* The Next.js Image component acts as the background */}
      <Image
        src={BGImage}
        alt="Küstenstraße in den Bergen von Spanien"
        fill
        sizes="100vw"
        quality={80}
        style={{ objectFit: "cover" }}
      />
      {/* The overlay sits on top of the image */}
      <div className={s.overlay}>
        <div className={s.textContainer}>
          <h2>{t("spain.title")}</h2>
          <p>{t("spain.p")}</p>
          <Link href="/produkte/umzuege_spanien" className={s.button}>
            {t("dl.btn1.text")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Spanien;
