import styles from "./check-list.module.scss";

// We can use a simple SVG for the checkmark icon
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

interface CheckListItemProps {
  children: React.ReactNode;
}

export const CheckListItem = ({ children }: CheckListItemProps) => {
  return (
    <li className={styles.item}>
      <span className={styles.iconWrapper}>
        <CheckIcon />
      </span>
      <span>{children}</span>
    </li>
  );
};

interface CheckListProps {
  children: React.ReactNode;
}

export const CheckList = ({ children }: CheckListProps) => {
  return <ul className={styles.list}>{children}</ul>;
};
