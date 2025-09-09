import { Link } from "@/navigation";
import styles from "./anfrage-button.module.scss";

type Props = { title: string; url: string; children: React.ReactNode };

const AnfrageButton = ({ title, url, children }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Link className="btn btn-small" title={title || ""} href={url}>
        {children}
      </Link>
    </div>
  );
};

export default AnfrageButton;
