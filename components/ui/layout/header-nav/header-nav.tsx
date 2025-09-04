"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X } from "lucide-react";

// Local imports
import Logo from "@/assets/images/logos/logo.png";
import s from "./header-nav.module.scss";
import { navConfig } from "./header-nav-config";
import LanguageSwitcher from "@/components/common/language-switcher/language-switcher";
import { renderNavItems } from "./render-nav-items";
import { Link } from "@/navigation";

const HeaderNav = () => {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const handleMobileSubMenuToggle = (index: number) => {
    setOpenSubMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenSubMenuIndex(null);
  };

  const openMobileMenu = () => {
    const firstDropdownIndex = navConfig.findIndex(
      (item) => item.type === "dropdown",
    );
    setOpenSubMenuIndex(firstDropdownIndex !== -1 ? firstDropdownIndex : null);
    setMobileMenuOpen(true);
  };

  return (
    <nav className={s.navigation}>
      {/* --- Desktop Navigation --- */}
      <div className={s.nav__desktop}>
        {/* THIS IS THE PART THAT WAS MISSING. IT IS NOW RESTORED. */}
        <ul>
          {renderNavItems({
            navConfig,
            t,
            s,
            isMobile: false,
            locale,
            openSubMenuIndex,
            handleMobileSubMenuToggle,
            closeMobileMenu,
          })}
          <li className={s.languageSwitcherWrapper}>
            <LanguageSwitcher />
          </li>
        </ul>
      </div>

      {/* --- Mobile navigation --- */}
      <div className={s.nav__mobile}>
        <button
          onClick={openMobileMenu}
          className={s.hamburgerButton}
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>
        <div
          className={`${s.mobileMenuOverlay} ${isMobileMenuOpen ? s.isOpen : ""}`}
        >
          <header className={s.mobileMenuHeader}>
            <Link href="/" onClick={closeMobileMenu}>
              <Image
                src={Logo}
                alt={t("cimg1")}
                className={s.mobileLogoImage}
                priority
              />
            </Link>
            <button
              onClick={closeMobileMenu}
              className={s.closeButton}
              aria-label="Close menu"
            >
              <X size={32} />
            </button>
          </header>
          <ul className={s.mobileMenuList}>
            {renderNavItems({
              navConfig,
              t,
              s,
              isMobile: true,
              locale,
              openSubMenuIndex,
              handleMobileSubMenuToggle,
              closeMobileMenu,
            })}
          </ul>
          <footer className={s.mobileMenuFooter}>
            <LanguageSwitcher />
          </footer>
        </div>
      </div>
    </nav>
  );
};

export default HeaderNav;
