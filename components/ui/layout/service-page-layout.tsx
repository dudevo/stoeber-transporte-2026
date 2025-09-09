import Image, { StaticImageData } from "next/image";

import styles from "./service-page-layout.module.scss";
import PageTitle from "../elements/page-title/page-title";

interface ServicePageLayoutProps {
  title?: string;
  imageSrc: StaticImageData | string;
  imageAlt: string;
  imageLicenceText?: string;
  children: React.ReactNode;
}

export default function ServicePageLayout({
  title,
  imageSrc,
  imageAlt,
  imageLicenceText,
  children,
}: ServicePageLayoutProps) {
  return (
    <section className={styles.container}>
      {title && title.length && (
        <div className={styles.pageTitle}>
          <PageTitle>{title}</PageTitle>
        </div>
      )}

      <div className={styles.mainContent}>{children}</div>

      {/* 3. The image remains in its aside element */}
      <aside className={styles.imageContainer}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          quality={80}
        />
        {imageLicenceText && imageLicenceText?.length && (
          <span>({imageLicenceText})</span>
        )}
      </aside>
    </section>
  );
}
