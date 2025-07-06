import Link from "next/link";
import styles from "./style.module.css";

export type SocialLinkProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const isExternalLink = (url: string) => {
  return url.startsWith("http://") || url.startsWith("https://");
};

export const SocialLink = ({ href, label, icon }: SocialLinkProps) => {
  if (isExternalLink(href)) {
    return (
      <a
        className={styles.socialLink}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} (opens in new tab)`}
      >
        <span aria-hidden="true">{icon}</span> {label}
      </a>
    );
  }

  return (
    <Link 
      className={styles.socialLink} 
      href={href}
      prefetch={true}
      aria-label={label}
    >
      <span aria-hidden="true">{icon}</span> {label}
    </Link>
  );
};
