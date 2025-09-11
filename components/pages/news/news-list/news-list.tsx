"use client";

import NewsArticleCard from "../news-article-card/news-article-card";
import styles from "./news-list.module.scss";
import { getAllArticles } from "../../../../lib/news-data";

const NewsList = () => {
  const articles = getAllArticles();
  
  if (!articles || articles.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Keine News verfügbar.</p>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <div className={styles.grid}>
        {articles.map((article) => (
          <NewsArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
};

export default NewsList;
