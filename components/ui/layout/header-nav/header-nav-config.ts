import { NavItem } from "./header-nav.types";

export const navConfig: NavItem[] = [
  {
    type: "link",
    href: "/",
    translationKey: "home",
  },
  {
    type: "dropdown",
    translationKey: "products",
    subItems: [
      { href: "/produkte/umzuege", translationKey: "removals" },
      { href: "/produkte/transporte", translationKey: "transports" },
      { href: "/produkte/medienlogistik", translationKey: "media logistics" }, // Corrected
      { href: "/produkte/express", translationKey: "express" },
      { href: "/produkte/moebellift", translationKey: "furniture lift" }, // Corrected
      {
        href: "/produkte/fahrzeugueberfuehrung",
        translationKey: "vehicle transfer",
      }, // Corrected
      { href: "/produkte/beiladung", translationKey: "cargo" },
      { href: "/produkte/lagerung", translationKey: "storage" },
      {
        href: "/produkte/entruempelungen_haushaltsaufloesungen",
        translationKey: "clearing out",
      }, // Corrected
    ],
  },
  {
    type: "dropdown",
    translationKey: "interactive",
    subItems: [
      { href: "/interaktiv/formulare", translationKey: "forms" }, // This item IS translated
      { href: "/interaktiv/forms", text: "Downloads" }, // This is a HARDCODED string
      { href: "/interaktiv/links", text: "Links" }, // This is a HARDCODED string
      { href: "/shop", text: "Shop", isGermanOnly: true }, // HARDCODED and only for 'de' locale
    ],
  },
  {
    type: "dropdown",
    translationKey: "news & info", // Corrected
    subItems: [
      { href: "/info/planung", translationKey: "planning" },
      { href: "/info/leitbild", translationKey: "mission statement" }, // Corrected
      {
        href: "/info/stellenangebote",
        translationKey: "job offers",
        isGermanOnly: true,
      }, // Corrected
      { href: "/news", translationKey: "news", isGermanOnly: true },
    ],
  },
  {
    type: "link",
    href: "/kontakt",
    translationKey: "contact",
  },
];
