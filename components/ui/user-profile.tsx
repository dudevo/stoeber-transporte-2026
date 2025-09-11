import Image from "next/image";
import { MessageCircle, Calendar } from "lucide-react";
import styles from "./user-profile.module.scss";
import Avatar from "@/assets/images/wildix/avatar.png";

type UserProfileProps = {
  name: string;
  email: string;
};

/**
 * A component for displaying a user profile widget with contact options.
 * @param {object} props - The component properties.
 * @param {string} props.name - The user's name.
 * @param {string} props.email - The user's email address, used for links.
 */
const UserProfile = ({ name, email }: UserProfileProps) => {
  // Create dynamic links based on user email
  const chatUrl = `https://app.x-bees.com/kite/${email}`;
  const scheduleUrl = `https://app.x-bees.com/kite/${email}/schedule`;

  return (
    <div className={styles.container}>
      {/* Header section with avatar and name */}
      <div className={styles.userInfo}>
        <Image
          src={Avatar}
          alt={`Avatar von ${name}`}
          width={60}
          height={60}
          className={styles.avatar}
        />
        <div className={styles.name}>{name}</div>
      </div>

      {/* Action buttons section */}
      <div className={styles.actions}>
        {/* Chat button */}
        <a
          href={chatUrl}
          className={styles.actionButton}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={16} className={styles.actionIcon} />
          <span>Chatten</span>
        </a>

        {/* Schedule appointment button */}
        <a
          href={scheduleUrl}
          className={styles.actionButton}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Calendar size={16} className={styles.actionIcon} />
          <span>Einen Termin planen</span>
        </a>
      </div>
    </div>
  );
};

export default UserProfile;
