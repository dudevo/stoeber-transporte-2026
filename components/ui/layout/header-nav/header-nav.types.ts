type SubItem = {
  href: string;
  translationKey?: string; // Is optional because a sub-item can have hardcoded text
  text?: string; // Is optional because a sub-item can be translatable
  isGermanOnly?: boolean;
};

// Describes a simple, top-level link
type NavLinkItem = {
  type: "link";
  href: string;
  translationKey: string;
};

// Describes a top-level dropdown menu
type NavDropdownItem = {
  type: "dropdown";
  translationKey: string;
  subItems: SubItem[];
};

// A NavItem can be either a link or a dropdown
export type NavItem = NavLinkItem | NavDropdownItem;

export type NavConfig = NavItem[];
