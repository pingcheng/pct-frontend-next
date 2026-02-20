import { HeroSection } from "./components/HeroSection";
import { SkillsSection } from "./components/SkillsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { AboutStructuredData } from "./components/AboutStructuredData";

export const metadata = {
  title: "About Ping Cheng",
  description:
    "Principal Engineer at REA Group with expertise in Node.js, TypeScript, PHP, Java, and Linux. Experienced in full-stack development, cloud solutions, and enterprise software. Learn about my professional journey and technical skills.",
  keywords: [
    "Ping Cheng",
    "Principal Engineer",
    "Software Engineer",
    "Melbourne",
    "Full Stack Developer",
    "Cloud Engineer",
    "REA Group",
    "PropTrack",
    "Node.js",
    "TypeScript",
    "PHP",
    "Java",
    "DevOps",
  ],
  openGraph: {
    title: "About Ping Cheng",
    description:
      "Principal Engineer at REA Group specializing in modern web technologies, cloud solutions, and enterprise software development. Discover my professional journey and technical expertise.",
    url: "https://www.pingchengtech.com/about",
    type: "profile",
    images: [
      {
        url: "/apple-icon.png",
        width: 180,
        height: 180,
        alt: "Ping Cheng - Principal Engineer",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "About Ping Cheng",
    description:
      "Principal Engineer at REA Group specializing in modern web technologies, cloud solutions, and enterprise software development.",
    images: ["/apple-icon.png"],
  },
};

export default function About() {
  return (
    <>
      <AboutStructuredData />
      <main className="min-h-screen bg-transparent py-8">
        <div className="max-w-4xl mx-auto px-6">
          <HeroSection />
          <SkillsSection />
          <ExperienceSection />
        </div>
      </main>
    </>
  );
}
