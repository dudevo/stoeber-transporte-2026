// TODO: layout must be fixed

import { Metadata } from "next";

import StellenangeboteImg from "../../../../../assets/images/stellenangebote.jpg";
import ServicePageLayout from "@/components/ui/layout/service-page-layout";
import { Icon } from "@/components/ui/elements/icon/icon";
import { getJobs } from "@/app/(lib)/actions/jobs.actions";
import { JobList } from "@/components/pages/info/jobs/job-list";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Stöber Transporte - Stellenangebote",
    description:
      "Stöber Transporte Stellenangebote - Werden Sie ein Teil unseres Teams",
  };
}

const Jobs = async () => {
  const jobs = await getJobs();

  return (
    <ServicePageLayout
      title="Stellenangebote"
      imageSrc={StellenangeboteImg}
      imageAlt="Stöber Transporte Stellenangebote - Werden Sie ein Teil unseres Teams"
      imageLicenceText="Bild@adobe-stock: #186250260-Africa Studio"
    >
      <h2>Werde ein Teil unseres Teams</h2>
      <p>
        Eine gute Firma lebt von guten Mitarbeitern, deshalb suchen wir DICH!
      </p>
      <p>
        DU suchst einen sicheren, abwechslungsreichen, wertgeschätzten und
        leistungsgerecht bezahlten Arbeitsplatz?
      </p>
      <p className="ma-bo1">
        ....dann melde dich bei uns, wir freuen uns auf Deine Bewerbung per
        E-Mail.
      </p>
      <ul>
        <li>Stöber Transporte</li>
        <li>Marc Stöber</li>
        <li>Westtangente 4</li>
        <li>79395 Neuenburg am Rhein</li>
      </ul>
      <ul>
        <li className="ma-bo1">
          <Icon name="mail" /> personal@stoeber-transporte.de
        </li>
        <li>
          <Icon name="phone" />
          +49 7631 7400 610
        </li>
      </ul>
      <h2 className="ma-boto2">Aktuelle Stellenangebote</h2>
      <JobList jobs={jobs} />
    </ServicePageLayout>
  );
};

export default Jobs;
