import { profile, socialUrls } from "@/data/profile";
import styles from "./style.module.css";
import { FiGithub, FiSmile } from "react-icons/fi";
import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import { IoLogoLinkedin } from "react-icons/io5";
import { BsCollectionFill } from "react-icons/bs";
import {
  SocialLink,
  SocialLinkProps,
} from "@/components/SocialLink/SocialLink";

const links: SocialLinkProps[] = [
  {
    href: socialUrls.github,
    label: "Github",
    icon: <FiGithub />,
  },
  {
    href: socialUrls.linkedin,
    label: "LinkedIn",
    icon: <IoLogoLinkedin />,
  },
  {
    href: "/portfolio",
    label: "Portfolio",
    icon: <BsCollectionFill />,
  },
  {
    href: "/about",
    label: "About",
    icon: <FiSmile />,
  },
];

export default function Home() {
  return (
    <main
      className="h-screen flex flex-col items-center justify-center mx-auto gap-8 max-w-lg"
      style={{
        maxWidth: "90%",
      }}
    >
      {/* Avatar */}
      <Avatar width={192} height={192} />

      {/* Description */}
      <div className={styles.description}>
        <h1>
          Hi! It is <span className="text-primary">{profile.fullName}</span>{" "}
          here.
        </h1>
        <p>
          I am a high passionate{" "}
          <span className="text-primary">software engineer</span>, enjoy the
          latest techs and bring them into reality.
        </p>
        <p>
          Focusing on{" "}
          <span className="text-primary">
            Node/TS/JS, Java, PHP, Linux, Server management
          </span>
          , etc...
        </p>
      </div>

      {/* Social links */}
      <div className="flex flex-wrap content-around text-lg justify-center">
        {links.map(({ href, label, icon }) => (
          <SocialLink key={label} href={href} label={label} icon={icon} />
        ))}
      </div>
    </main>
  );
}
