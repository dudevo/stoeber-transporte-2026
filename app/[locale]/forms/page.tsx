import { getTranslations } from "next-intl/server";
import FormPageLayout from "@/components/ui/layout/form-page-layout";
import { buildLocalizedCategories, type CategoryConfig } from "@/lib/utils/i18n-data";
import { FileText } from "lucide-react";

// Static configuration for form types
const FORM_TYPES: CategoryConfig[] = [
  { key: "ua", href: "/forms/umzug" },
  { key: "ba", href: "/forms/beiladung" },
  { key: "ml", href: "/forms/lift" },
  { key: "ta", href: "/forms/transportanfrage" },
  { key: "fz", href: "/forms/ueberfuehrung" },
  { key: "al", href: "/forms/lagerung" },
];

export default async function FormsPage() {
  const t = await getTranslations();

  const categories = buildLocalizedCategories(FORM_TYPES, t, "dl");
  const pageTitle = t("dl.h1.fo");

  return (
    <FormPageLayout
      title={pageTitle}
      illustration={<FileText size={120} color="#274c88" strokeWidth={1.5} />}
      categories={categories}
    >
      {/* Description text can be localized later */}
    </FormPageLayout>
  );
}