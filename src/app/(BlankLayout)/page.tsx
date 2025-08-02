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
import {
  PersonStructuredData,
  WebsiteStructuredData,
} from "@/components/StructuredData/StructuredData";
import { CyclingTypewriterEffect } from "@/components/TypewriterEffect";

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
  title: "Ping Cheng",
  description:
    "Ping Cheng is a Staff Engineer and software engineer in Melbourne, passionate about Node, TypeScript, PHP, Java, and Linux. Building modern digital solutions and enterprise products.",
  keywords: [
    "Ping Cheng",
    "Staff Engineer",
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
  openGraph: {
    title: "Ping Cheng",
    description:
      "Staff Engineer and software engineer in Melbourne specializing in Node.js, TypeScript, PHP, Java, and Linux. Building modern digital solutions and enterprise products.",
    url: "https://www.pingchengtech.com",
    type: "profile",
    images: [
      {
        url: "/apple-icon.png",
        width: 180,
        height: 180,
        alt: "Ping Cheng - Staff Engineer",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Ping Cheng",
    description:
      "Staff Engineer and software engineer in Melbourne specializing in Node.js, TypeScript, PHP, Java, and Linux.",
    images: ["/apple-icon.png"],
  },
};

export default function Home() {
  return (
    <>
      <PersonStructuredData
        name={profile.fullName}
        jobTitle="Staff Engineer"
        url="https://www.pingchengtech.com"
        image="https://www.pingchengtech.com/apple-icon.png"
        sameAs={[socialUrls.github, socialUrls.linkedin]}
        worksFor={{
          name: "REA Group",
          url: "https://www.rea-group.com",
        }}
        knowsAbout={[
          "Node.js",
          "TypeScript",
          "JavaScript",
          "PHP",
          "Java",
          "Linux",
          "React",
          "Vue.js",
          "AWS",
          "Docker",
          "MySQL",
          "Redis"
        ]}
        address={{
          addressLocality: "Melbourne",
          addressRegion: "Victoria",
          addressCountry: "Australia",
        }}
      />
      <WebsiteStructuredData
        name="Ping Cheng Tech"
        url="https://www.pingchengtech.com"
        description="Personal website and portfolio of Ping Cheng, Staff Engineer and Software Engineer in Melbourne"
        author={{
          name: profile.fullName,
          url: "https://www.pingchengtech.com",
        }}
      />
      <main className="h-screen flex flex-col items-center justify-center mx-auto gap-8 page-container">
        {/* Avatar */}
        <section className="animate-fade-in-scale">
          <Avatar width={192} height={192} priority />
        </section>

        {/* Description */}
        <section className={`${styles.description} animate-fade-in animate-delay-200`}>
          <h1>
            Hey, I&apos;m <span className="text-primary">{profile.fullName}</span>.
          </h1>
          <p>
            <span className="text-primary">Staff Engineer</span>, code lover, and
            always building something cool with the
            <span className="text-primary"> latest tech</span>.
          </p>
          <p className="min-h-[1.5rem]">
            <CyclingTypewriterEffect
              texts={[
                "Building scalable solutions 🚀",
                "Turning ideas into reality ✨",
                "Crafting elegant code 💻",
                "Solving complex problems 🧩",
                "Creating digital experiences 🎨"
              ]}
              typeSpeed={80}
              deleteSpeed={40}
              pauseTime={2000}
              delay={1000}
              className="text-primary font-medium"
            />
          </p>
          <p>
            Into <span className="text-primary">Node</span>,{" "}
            <span className="text-primary">TypeScript</span>,{" "}
            <span className="text-primary">PHP</span>,{" "}
            <span className="text-primary">Java</span>,{" "}
            <span className="text-primary">Linux</span>, and making things work
            better.
          </p>
        </section>

        {/* Social links */}
        <nav className="flex flex-wrap content-around text-lg justify-center animate-fade-in animate-delay-400" aria-label="Social links and navigation">
          {links.map(({ href, label, icon }, index) => (
            <div
              key={label}
              className={`animate-fade-in animate-delay-${500 + (index * 100)}`}
            >
              <SocialLink href={href} label={label} icon={icon} />
            </div>
          ))}
        </nav>
      </main>
    </>
  );
}
