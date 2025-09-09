// app/(components)/jobs/JobList.tsx
import { IJobs } from "@/types/jobs.interface";
import styles from "./job-list.module.scss";
import { Icon } from "@/components/ui/elements/icon/icon";
import { CheckListItem } from "@/components/ui/elements/check-list/check-list";

interface JobListProps {
  jobs: IJobs[];
}

// Helper function to render a list section if the data exists
const ListSection = ({ title, items }: { title: string; items: string[] }) => {
  if (!items || items.length === 0) {
    return null; // Don't render anything if the list is empty
  }

  return (
    <>
      <h4 className={styles.sectionTitle}>{title}</h4>
      <ul className={styles.detailsList}>
        {items.map((item, index) => (
          <CheckListItem key={index}>{item}</CheckListItem>
        ))}
      </ul>
    </>
  );
};

export const JobList = ({ jobs }: JobListProps) => {
  if (!jobs || jobs.length === 0) {
    return (
      <div className={styles.noJobs}>
        <p>Aktuell sind keine Stellen ausgeschrieben.</p>
        <p>Schauen Sie bald wieder vorbei!</p>
      </div>
    );
  }

  return (
    <div className={styles.jobListContainer}>
      {jobs.map((job) => (
        <article key={job._id} className={styles.jobCard}>
          <h3 className={styles.jobTitle}>{job.title}</h3>
          <p className={styles.jobDescription}>{job.description}</p>

          <div className={styles.jobMeta}>
            <div className={styles.metaItem}>
              <Icon name="calendar" size={16} />
              <span>
                <strong>Beginn:</strong>{" "}
                {new Date(job.beginning).toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className={styles.metaItem}>
              <Icon name="clock" size={16} />
              <span>
                <strong>Arbeitszeit:</strong> {job.workingTime}
              </span>
            </div>
          </div>

          <ListSection title="Dein Profil" items={job.profil} />
          <ListSection title="Deine Aufgaben" items={job.aufgaben} />
          <ListSection title="Wir bieten" items={job.angebot} />
        </article>
      ))}
    </div>
  );
};
