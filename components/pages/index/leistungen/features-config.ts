// The shape of a single feature box's data
export interface FeatureBoxConfig {
  key: string; // A unique key for React's map function
  h2TitleKey: string;
  pTextKey: string;
  link: {
    href: string; // The canonical (default language) path
    titleKey: string;
    textKey: string;
  };
}

// The configuration array containing data for all four boxes
export const featuresConfig: FeatureBoxConfig[] = [
  {
    key: "removals",
    h2TitleKey: "index.removals",
    pTextKey: "index.dl1",
    link: {
      href: "/produkte/umzuege",
      titleKey: "index.dl.btn1.title",
      textKey: "index.dl.btn1.text",
    },
  },
  {
    key: "spain-removals",
    h2TitleKey: "index.dl.title",
    pTextKey: "index.dl2",
    link: {
      href: "/produkte/umzuege_spanien",
      titleKey: "index.dl.btn2.title",
      textKey: "index.dl.btn1.text",
    },
  },
  {
    key: "cargo",
    h2TitleKey: "index.cargo",
    pTextKey: "index.dl3",
    link: {
      href: "/produkte/beiladung",
      titleKey: "index.dl.btn3.title",
      textKey: "index.dl.btn1.text",
    },
  },
  {
    key: "storage",
    h2TitleKey: "index.storage",
    pTextKey: "index.dl4",
    link: {
      href: "/produkte/lagerung",
      titleKey: "index.dl.btn4.title",
      textKey: "index.dl.btn1.text",
    },
  },
];
