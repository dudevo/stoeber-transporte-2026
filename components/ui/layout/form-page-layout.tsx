import Link from "next/link";
import { ChevronRight } from "lucide-react";
import styles from "./form-page-layout.module.scss";
import PageTitle from "../elements/page-title/page-title";
import type {
  FormPageLayoutProps,
  ExternalLink,
  FormCategory,
} from "./form-page-layout.types";

// Re-export types for external usage
export type { FormPageLayoutProps, ExternalLink, FormCategory };

export default function FormPageLayout({
  title,
  titleIcon,
  illustration,
  categories,
  links,
  children,
  blank = false,
}: FormPageLayoutProps) {
  return (
    <section className={styles.container}>
      <div className={styles.contentGrid}>
        {illustration && (
          <aside className={styles.illustration}>{illustration}</aside>
        )}

        <div className={styles.rightContent}>
          <div className={styles.pageTitle}>
            <PageTitle icon={titleIcon}>{title}</PageTitle>
          </div>

          {children && <div className={styles.description}>{children}</div>}

          {/* Render categories if provided */}
          {categories && categories.length > 0 && (
            <div className={styles.categoryGrid}>
              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className={styles.categoryCard}
                  target={blank ? "_blank" : undefined}
                  rel={blank ? "noopener noreferrer" : undefined}
                >
                  <span className={styles.cardTitle}>{category.title}</span>
                  <span className={styles.cardArrow}>»</span>
                </Link>
              ))}
            </div>
          )}

          {/* Render external links if provided */}
          {links && links.length > 0 && (
            <ul className={styles.linksList}>
              {links.map((link) => (
                <li key={link.href} className={styles.linkItem}>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <a
                    href={link.href}
                    title={link.title}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.externalLink}
                  >
                    {link.displayText}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
