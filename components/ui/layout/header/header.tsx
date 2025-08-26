"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Logo from "../../../../assets/images/logos/stoeber_start.jpg";
import s from "./header.module.scss";
import LanguageSwitcher from "@/components/common/language-swicher/LanguageSwitcher";
import HeaderNav from "../header-nav/header-nav";

const Header = () => {
  const [small, setSmall] = useState(false);

  const onScroll = () => {
    if (window.scrollY > 7) {
      setSmall(true);
    } else {
      setSmall(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", onScroll);
    }
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${s.header} ${small ? s.unl : ""}`}>
      <div className="st-container st-container--flex">
        <Link href="/">
          <Image
            className={s.logo}
            src={Logo}
            alt="Logo Stöber Transporte"
            title="Stöber Transporte - Umzüge deutschlandweit und Spanien (Festland, Mallorca, Balearen), Fahrzeugüberführung, Möbellift"
          />
        </Link>
        <div className="flex">
          <HeaderNav />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
