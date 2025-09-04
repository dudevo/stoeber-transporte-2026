import { getTranslations } from "next-intl/server";
import Image from "next/image";

import s from "./hero.module.scss";
import BGImage from "../../../../assets/images/stoeber-transporte-opt.jpg";

const Hero = async () => {
  const t = await getTranslations("index");

  return (
    <section className={s.showCase}>
      <Image
        src={BGImage}
        fill // 3. `fill` makes the image fill its parent container
        sizes="100vw" // 4. Crucial for performance: tells browser the image is always 100% of viewport width
        priority // 5. MOST IMPORTANT FOR SEO/LCP: Preloads the image
        style={{ objectFit: "cover" }}
        alt={`Bild von Stöber Transporte: Umzüge deutschlandweit, Spanien (Mallorca, Festland & Balearische Inseln)`}
      />
      <div className={s.info}>
        <div className={s.info__header}>
          {/* <div className={`${s.info__headerContainer} container ju-ct`}> */}
          <div className={`${s.info__headerContainer}`}>
            <h1>{t("h1")}</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
