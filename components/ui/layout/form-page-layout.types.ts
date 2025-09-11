import type { LocalizedCategory } from "@/lib/utils/i18n-data";

// Re-export for backward compatibility
export interface FormCategory {
  title: string;
  href: string;
}

export interface ExternalLink {
  title: string;
  href: string;
  displayText: string;
}

export interface FormPageLayoutProps {
  title: string;
  titleIcon?: React.ReactNode;
  illustration?: React.ReactNode; // large icon/graphic on the left
  categories?: LocalizedCategory[]; // now optional
  links?: ExternalLink[]; // new optional prop for external links
  children?: React.ReactNode;
  blank?: boolean; // if true, links open in new window
}
