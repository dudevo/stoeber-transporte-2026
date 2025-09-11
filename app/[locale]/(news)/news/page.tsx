import { setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import NewsList from "@/components/pages/news/news-list/news-list";
import PageTitle from "@/components/ui/elements/page-title/page-title";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  // News is only available in German
  if (locale !== "de") {
    return {
      title: "Page Not Found",
      description: "This page is not available in this language.",
    };
  }

  return {
    title: "Stöber Transporte - News & Aktuelles",
    description: "Aktuelle Nachrichten und Neuigkeiten von Stöber Transporte - Ihr zuverlässiger Partner für Umzüge, Transporte und Logistik",
  };
}

const NewsPage = async ({ params }: Props) => {
  const { locale } = await params;
  setRequestLocale(locale);
  
  // News is only available in German - redirect to 404 for other locales
  if (locale !== "de") {
    notFound();
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      width: '100%', 
      marginLeft: 'auto', 
      marginRight: 'auto', 
      padding: '2rem 1.5rem'
    }}>
      {/* Page Title */}
      <div style={{ marginBottom: '2rem' }}>
        <PageTitle>News & Aktuelles</PageTitle>
      </div>
      
      {/* Intro Text */}
      <div style={{ 
        marginBottom: '3rem', 
        fontSize: '1.1rem', 
        lineHeight: '1.6', 
        color: '#666666',
        textAlign: 'left'
      }}>
        <p style={{ margin: '0' }}>
          Bleiben Sie auf dem Laufenden mit den neuesten Nachrichten, Entwicklungen und Ankündigungen von Stöber Transporte.
        </p>
      </div>
      
      {/* Full-width News Grid */}
      <NewsList />
    </div>
  );
};

export default NewsPage;
