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

export const metadata = {
  title: "Ping Cheng | Lead Developer, Software Engineer, Melbourne",
  description:
    "Ping Cheng is a lead developer and software engineer in Melbourne, passionate about Node, TypeScript, PHP, Java, and Linux. Building modern digital solutions and enterprise products.",
  keywords: [
    "Ping Cheng",
    "Lead Developer",
    "Software Engineer",
    "Melbourne",
    "Node",
    "TypeScript",
    "PHP",
    "Java",
    "Linux",
    "REA Group",
    "PropTrack",
    "Web Development",
    "Digital Solutions",
  ],
};

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center mx-auto gap-8 page-container">
      {/* Avatar */}
      <Avatar width={192} height={192} />

      {/* Description */}
      <div className={styles.description}>
        <h1>
          Hey, I’m <span className="text-primary">{profile.fullName}</span>.
        </h1>
        <p>
          <span className="text-primary">Lead dev</span>, code lover, and always
          building something cool with the
          <span className="text-primary"> latest tech</span>.
        </p>
        <p>
          Into <span className="text-primary">Node</span>,{" "}
          <span className="text-primary">TypeScript</span>,{" "}
          <span className="text-primary">PHP</span>,{" "}
          <span className="text-primary">Java</span>,{" "}
          <span className="text-primary">Linux</span>, and making things work
          better.
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
