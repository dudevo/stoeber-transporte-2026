"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./news-article-card.module.scss";
import DefaultNewsImage from "../../../../assets/images/stoeber-transporte-small.jpg";
import { StaticImageData } from "next/image";

interface NewsArticle {
  slug: string;
  title: string;
  teaser: string;
  date: string;
  category: string;
  image?: StaticImageData | string;
}

interface NewsArticleCardProps {
  article: NewsArticle;
}

const NewsArticleCard = ({ article }: NewsArticleCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className={styles.card}>
      {/* Preview Image */}
      <div className={styles.imageContainer}>
        <Image
          src={article.image || DefaultNewsImage}
          alt={article.title}
          width={400}
          height={220}
          className={styles.previewImage}
          quality={80}
          placeholder="blur"
        />
        <div className={styles.categoryBadge}>
          <span className={styles.category}>{article.category}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className={styles.cardContent}>
        <div className={styles.header}>
          <time className={styles.date} dateTime={article.date}>
            {formatDate(article.date)}
          </time>
        </div>
        
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.teaser}>{article.teaser}</p>
        
        <div className={styles.footer}>
          <Link href={`/news/${article.slug}`} className={styles.readMore}>
            Weiterlesen
            <svg className={styles.arrow} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default NewsArticleCard;
