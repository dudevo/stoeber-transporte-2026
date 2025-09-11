import { getTranslations } from "next-intl/server";
import { Link as LinkIcon } from "lucide-react";
import { Metadata } from "next";

import FormPageLayout from "@/components/ui/layout/form-page-layout";
import type { ExternalLink } from "@/components/ui/layout/form-page-layout.types";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Stöber Transporte - Links",
    description: "Stöber Transporte - Links von unseren Partnern",
  };
}
// Static external links data
const EXTERNAL_LINKS: ExternalLink[] = [
  {
    title: "Badische Zeitung",
    href: "https://www.badische-zeitung.de",
    displayText: "badische-zeitung.de",
  },
  {
    title: "Arriva Service",
    href: "http://www.arriva-service.de",
    displayText: "arriva-service.de",
  },
  {
    title: "Der Sonntag",
    href: "http://www.der-sonntag.de",
    displayText: "der-sonntag.de",
  },
];

export default async function LinksPage() {
  const t = await getTranslations();

  // Get localized title and description from translations
  const pageTitle = t("dl.h1.li"); // "Links" from merged forms.json
  const description = t("links.desc"); // Description from merged forms.json

  return (
    <FormPageLayout
      title={pageTitle}
      illustration={<LinkIcon size={120} color="#274c88" strokeWidth={1.5} />}
      links={EXTERNAL_LINKS}
    >
      <p>{description}</p>
    </FormPageLayout>
  );
}
