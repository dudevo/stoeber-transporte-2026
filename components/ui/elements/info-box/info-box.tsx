import styles from "./info-box.module.scss";

interface InfoBoxProps {
  title: string;
  children: React.ReactNode;
}

export default function InfoBox({ title, children }: InfoBoxProps) {
  return (
    <div className={styles.infoBox}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
