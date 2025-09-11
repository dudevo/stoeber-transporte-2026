import { getTranslations } from "next-intl/server";
import { FileDown } from "lucide-react";
import { Metadata } from "next";

import FormPageLayout from "@/components/ui/layout/form-page-layout";
import {
  buildLocalizedCategories,
  type CategoryConfig,
} from "@/lib/utils/i18n-data";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Stöber Transporte - Downloads wichtiger Formulare",
    description:
      "Formulare für Anfragen von Umzügen, Beiladungen, Möbellift, Fahrzeugüberführungen und Transporten zum Download",
  };
}
// Static configuration for form categories
const FORM_CATEGORIES: CategoryConfig[] = [
  {
    key: "ua", // maps to forms.json -> dl.ua
    href: "/documents/umzugs.pdf",
  },
  {
    key: "ba", // maps to forms.json -> dl.ba
    href: "/documents/beiladung.pdf",
  },
  {
    key: "ll", // maps to forms.json -> dl.ml
    href: "/documents/leermeldung.pdf",
  },
  {
    key: "ta", // maps to forms.json -> dl.ta
    href: "/documents/transportanfrage.pdf",
  },
];

export default async function DownloadPage() {
  const t = await getTranslations();

  // Build localized categories from translation keys (forms.json is merged at root level)
  const categories = buildLocalizedCategories(FORM_CATEGORIES, t, "dl");
  const pageTitle = "Downloads";

  return (
    <FormPageLayout
      blank
      title={pageTitle}
      illustration={<FileDown size={120} color="#274c88" strokeWidth={2} />}
      categories={categories}
    />
  );
}
