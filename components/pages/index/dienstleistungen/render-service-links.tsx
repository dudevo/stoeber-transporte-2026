// Example location: components/Dienstleistungen/render-service-links.tsx

import { ArrowRight } from "lucide-react";
import { Link } from "@/navigation"; // Using the same working Link component
import { ServiceLinkItem } from "./dienstleistungen-config";

// Define the props our renderer will need
interface RenderServiceLinksProps {
  config: ServiceLinkItem[];
  t: (key: string) => string;
}

export const renderServiceLinks = ({ config, t }: RenderServiceLinksProps) => {
  return config.map((item) => (
    <li key={item.key}>
      <Link href={item.href} title={t(`${item.translationKey}.title`) ?? ""}>
        {t(`${item.translationKey}.text`)}
        <ArrowRight />
      </Link>
    </li>
  ));
};
