export interface ServiceLinkItem {
  key: string;
  href: string;
  translationKey: string;
}

// Export the configuration array as the single source of truth
export const servicesConfig: ServiceLinkItem[] = [
  {
    key: "umzug",
    href: "/forms/umzug",
    translationKey: "li1",
  },
  {
    key: "beiladung",
    href: "/forms/beiladung",
    translationKey: "li2",
  },
  {
    key: "fahrzeugueberfuehrung",
    href: "/forms/beiladung",
    translationKey: "li3",
  },
  {
    key: "transportanfrage",
    href: "/forms/transportanfrage",
    translationKey: "li4",
  },
  {
    key: "lift",
    href: "/forms/lift",
    translationKey: "li5",
  },
];
