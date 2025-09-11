import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { getArticleBySlug, getRelatedArticles, getAllArticles } from "../../../../../lib/news-data";
import PageTitle from "@/components/ui/elements/page-title/page-title";
import NewsArticleCard from "@/components/pages/news/news-article-card/news-article-card";
import styles from "./article.module.scss";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const articles = getAllArticles();
  
  // Generate params for all locales, but only German will actually work
  const locales = ['de', 'en', 'es'];
  const params = [];
  
  for (const locale of locales) {
    for (const article of articles) {
      params.push({
        locale,
        slug: article.slug
      });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  
  // News is only available in German
  if (locale !== "de") {
    return {
      title: "Page Not Found",
      description: "This page is not available in this language.",
    };
  }

  const article = getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: `${article.title} - Stöber Transporte News`,
    description: article.teaser,
  };
}

const ArticleDetailPage = async ({ params }: Props) => {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  
  // News is only available in German - redirect to 404 for other locales
  if (locale !== "de") {
    notFound();
  }

  const article = getArticleBySlug(slug);
  
  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(slug, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div style={{ 
      maxWidth: '1200px', 
      width: '100%', 
      marginLeft: 'auto', 
      marginRight: 'auto', 
      padding: '2rem 1.5rem'
    }}>
      {/* Breadcrumbs */}
      <nav style={{ 
        marginBottom: '2rem', 
        fontSize: '0.9rem', 
        color: '#666666' 
      }}>
        <Link href="/news" style={{ color: '#004a99', textDecoration: 'none' }}>
          ← Zurück zu News & Aktuelles
        </Link>
      </nav>

      {/* Article Header */}
      <article>
        <header style={{ marginBottom: '3rem' }}>
          {/* Category Badge */}
          <div style={{ marginBottom: '1rem' }}>
            <span style={{
              display: 'inline-block',
              background: '#004a99',
              color: '#ffffff',
              fontSize: '0.75rem',
              fontWeight: '700',
              padding: '6px 12px',
              borderRadius: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {article.category}
            </span>
          </div>
          
          {/* Title */}
          <PageTitle>{article.title}</PageTitle>
          
          {/* Article Meta */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            marginTop: '1rem',
            fontSize: '0.9rem',
            color: '#666666'
          }}>
            <time dateTime={article.date}>
              {formatDate(article.date)}
            </time>
            {article.author && (
              <>
                <span>•</span>
                <span>Von {article.author}</span>
              </>
            )}
            {article.readTime && (
              <>
                <span>•</span>
                <span>{article.readTime} Lesezeit</span>
              </>
            )}
          </div>
        </header>

        {/* Featured Image */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '400px',
          marginBottom: '3rem',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <Image
            src={article.image}
            alt={article.title}
            fill
            style={{ objectFit: 'cover' }}
            quality={90}
            priority
          />
        </div>

        {/* Article Content */}
        <div style={{
          maxWidth: '800px',
          fontSize: '1.1rem'
        }}>
          <div 
            className={styles.articleContent}
            dangerouslySetInnerHTML={{ __html: article.content }}
            style={{
              marginBottom: '4rem'
            }}
          />
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section style={{ marginTop: '4rem' }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#333333',
            marginBottom: '2rem',
            fontFamily: '"Poppins", sans-serif'
          }}>
            Weitere Artikel
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {relatedArticles.map((relatedArticle) => (
              <NewsArticleCard key={relatedArticle.slug} article={relatedArticle} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ArticleDetailPage;
