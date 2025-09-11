import { FileText } from "lucide-react";
import styles from "./form-container.module.scss";

interface FormContainerProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function FormContainer({ 
  title, 
  children, 
  icon = <FileText size={40} color="#274c88" strokeWidth={1.5} />
}: FormContainerProps) {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          {icon}
        </div>
        <h1 className={styles.title}>{title}</h1>
      </div>
      
      <div className={styles.formContent}>
        {children}
      </div>
    </section>
  );
}
