import { getTranslations } from "next-intl/server";
import { FileText } from "lucide-react";
import { Metadata } from "next";

import FormPageLayout from "@/components/ui/layout/form-page-layout";
import {
  buildLocalizedCategories,
  type CategoryConfig,
} from "@/lib/utils/i18n-data";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Stöber Transporte - Anfrage für Umzüge, Beiladungen, Möbellift",
    description:
      "Formulare für Anfragen von Umzügen, Beiladungen, Möbellift, Fahrzeugüberführungen, Transporten und Lagerungen",
  };
}
// Static configuration for form categories
const FORM_CATEGORIES: CategoryConfig[] = [
  {
    key: "ua", // maps to forms.json -> dl.ua
    href: "/forms/umzug",
  },
  {
    key: "ba", // maps to forms.json -> dl.ba
    href: "/forms/beiladung",
  },
  {
    key: "ml", // maps to forms.json -> dl.ml
    href: "/forms/lift",
  },
  {
    key: "ta", // maps to forms.json -> dl.ta
    href: "/forms/transportanfrage",
  },
  {
    key: "fz", // maps to forms.json -> dl.fz
    href: "/forms/ueberfuehrung",
  },
  {
    key: "al", // maps to forms.json -> dl.al
    href: "/forms/lagerung",
  },
];

export default async function FormularePage() {
  const t = await getTranslations();

  // Build localized categories from translation keys (forms.json is merged at root level)
  const categories = buildLocalizedCategories(FORM_CATEGORIES, t, "dl");
  const pageTitle = t("dl.h1.fo"); // "Formulare" from merged forms.json

  return (
    <FormPageLayout
      title={pageTitle}
      illustration={<FileText size={120} color="#274c88" strokeWidth={2} />}
      categories={categories}
    />
  );
}
