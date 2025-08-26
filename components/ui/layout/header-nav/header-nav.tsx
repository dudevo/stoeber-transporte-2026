import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import Logo from "../../assets/images/logos/logo.png";
import s from "./header-nav.module.scss";
import { useTranslations } from "next-intl";

const HeaderNav = () => {
  const t = useTranslations("nav");
  const [menu, setMenu] = useState(5);

  console.log(t("home"));

  const handleClick = (menu: number) => {
    setMenu(menu);
  };

  return <nav className={s.navigation}> test</nav>;
};

export default HeaderNav;
