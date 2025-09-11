// TODO: -> not responsive
// TODO: -> check if in all pages generateMetadata function exists
// TODO: -> add google analytics
// TODO: -> add cookie-consent-banner
// TODO: -> check, if pages can be cached

import Dienstleistungen from "@/components/pages/index/dienstleistungen/dienstleistungen";
import Erfahrung from "@/components/pages/index/erfahrung/erfahrung";
import Fahrzeugueberfuehrung from "@/components/pages/index/fahrzeugueberfuehrung/fahrzeugueberfuehrung";
import Hero from "@/components/pages/index/hero/hero";
import Leistungen from "@/components/pages/index/leistungen/leistungen";
import Umzugskran from "@/components/pages/index/lift/lift";
import Spanien from "@/components/pages/index/spanien/spanien";

export default async function HomePage() {
  return (
    <>
      <Hero />
      <Dienstleistungen />
      <Leistungen />
      <Fahrzeugueberfuehrung />
      <Spanien />
      <Umzugskran />
      <Erfahrung />
    </>
  );
}
