import styles from "./page-title.module.scss";

interface PageTitleProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function PageTitle({ children, icon }: PageTitleProps) {
  return (
    <h1 className={styles.title}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </h1>
  );
}
