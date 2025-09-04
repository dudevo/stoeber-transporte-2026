import { ChevronDown, ChevronUp } from "lucide-react";

import { NavConfig, NavItem } from "./header-nav.types";
import { Link } from "@/navigation";

// Define the props our rendering function will need
interface RenderNavItemsProps {
  navConfig: NavConfig;
  t: (key: string) => string;
  s: { [key: string]: string };
  isMobile: boolean;
  locale: string;
  openSubMenuIndex: number | null;
  handleMobileSubMenuToggle: (index: number) => void;
  closeMobileMenu: () => void;
}

export const renderNavItems = ({
  navConfig,
  t,
  s,
  isMobile,
  locale,
  openSubMenuIndex,
  handleMobileSubMenuToggle,
  closeMobileMenu,
}: RenderNavItemsProps) => {
  return navConfig.map((item: NavItem, index: number) => {
    // --- Dropdown Item ---
    if (item.type === "dropdown") {
      const filteredSubItems = item.subItems.filter(
        (sub) => !sub.isGermanOnly || locale === "de",
      );
      if (filteredSubItems.length === 0) return null;

      const isMobileSubMenuOpen = openSubMenuIndex === index;

      return (
        <li key={item.translationKey} className={s.dropdown}>
          <h3
            onClick={
              isMobile ? () => handleMobileSubMenuToggle(index) : undefined
            }
          >
            <span>{t(item.translationKey)}</span>
            {isMobile ? (
              isMobileSubMenuOpen ? (
                <ChevronUp className={s.icon} />
              ) : (
                <ChevronDown className={s.icon} />
              )
            ) : (
              <ChevronDown className={s.icon} />
            )}
          </h3>

          <ul
            className={
              isMobile
                ? `${s.mobileSubMenu} ${isMobileSubMenuOpen ? s.isOpen : ""}`
                : s.dropdownContent
            }
          >
            {filteredSubItems.map((subItem) => (
              <li key={subItem.href + (subItem.text || subItem.translationKey)}>
                <Link href={subItem.href} onClick={closeMobileMenu}>
                  {subItem.text ? subItem.text : t(subItem.translationKey!)}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      );
    }

    return (
      <li key={item.translationKey}>
        <Link href={item.href} onClick={closeMobileMenu}>
          {t(item.translationKey)}
        </Link>
      </li>
    );
  });
};
