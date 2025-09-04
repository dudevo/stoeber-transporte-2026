import Image, { StaticImageData } from "next/image";
import styles from "./service-page-layout.module.scss";
import PageTitle from "../elements/page-title/page-title";

interface ServicePageLayoutProps {
  title: string;
  imageSrc: StaticImageData | string;
  imageAlt: string;
  children: React.ReactNode;
}

export default function ServicePageLayout({
  title,
  imageSrc,
  imageAlt,
  children,
}: ServicePageLayoutProps) {
  return (
    <section className={styles.container}>
      {/* 1. The PageTitle is now a direct child of the grid container */}
      <div className={styles.pageTitle}>
        <PageTitle>{title}</PageTitle>
      </div>

      {/* 2. The main content is now in its own div */}
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
      </aside>
    </section>
  );
}
