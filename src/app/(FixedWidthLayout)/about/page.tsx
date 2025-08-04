import { Heading } from "@/components/Heading";
import { Avatar } from "@/components/Avatar";
import { profile, socialUrls } from "@/data/profile";
import { GrCode } from "react-icons/gr";
import { backendStack, devOpsStack, frontendStack, legacyStack } from "@/data/skills";
import { IoLogoJavascript } from "react-icons/io5";
import { FaCloud } from "react-icons/fa6";
import { MdHistory } from "react-icons/md";
import { workExperiences } from "@/data/work-experience";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import {
  PersonStructuredData,
  BreadcrumbListStructuredData,
  ProfessionalServiceStructuredData,
} from "@/components/StructuredData/StructuredData";

export const metadata = {
  title: "About Ping Cheng",
  description:
    "Staff Engineer at REA Group with expertise in Node.js, TypeScript, PHP, Java, and Linux. Experienced in full-stack development, cloud solutions, and enterprise software. Learn about my professional journey and technical skills.",
  keywords: [
    "Ping Cheng",
    "Staff Engineer",
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
      "Staff Engineer at REA Group specializing in modern web technologies, cloud solutions, and enterprise software development. Discover my professional journey and technical expertise.",
    url: "https://www.pingchengtech.com/about",
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
    title: "About Ping Cheng",
    description:
      "Staff Engineer at REA Group specializing in modern web technologies, cloud solutions, and enterprise software development.",
    images: ["/apple-icon.png"],
  },
};

import { getDurationString } from "@/utils/getDurationString";

export default function About() {
  const links = [
    { label: "github", url: socialUrls.github, text: "GitHub", ariaLabel: "Visit my GitHub profile" },
    { label: "linkedin", url: socialUrls.linkedin, text: "LinkedIn", ariaLabel: "Visit my LinkedIn profile" },
    { label: "email", url: `mailto:${profile.email}`, text: profile.email, ariaLabel: `Send email to ${profile.email}` },
  ];

  const skillsArray = [
    ...backendStack,
    ...frontendStack,
    ...devOpsStack,
    ...legacyStack,
  ];

  const breadcrumbItems = [
    { name: "Home", url: "https://www.pingchengtech.com" },
    { name: "About", url: "https://www.pingchengtech.com/about" },
  ];

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
        knowsAbout={skillsArray}
        address={{
          addressLocality: "Melbourne",
          addressRegion: "Victoria",
          addressCountry: "Australia",
        }}
        email={profile.email}
      />
      <BreadcrumbListStructuredData items={breadcrumbItems} />
      <ProfessionalServiceStructuredData
        name="Software Development Services"
        description="Full-stack web development, cloud solutions, and enterprise software development services specializing in Node.js, TypeScript, PHP, Java, and modern web technologies."
        provider={{
          name: profile.fullName,
          url: "https://www.pingchengtech.com",
        }}
        areaServed="Melbourne, Australia"
        serviceType="Software Development"
      />
      <main className="min-h-screen bg-transparent py-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* Hero Section */}
          <section className="card p-8 rounded-lg w-full mb-8 animate-fade-in-scale">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-shrink-0 animate-fade-in animate-delay-200">
                <div className="shadow-lg" style={{ borderRadius: "50%" }}>
                  <Avatar width={120} height={120} alt="Ping Cheng profile photo" />
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <div className="mb-3 animate-fade-in animate-delay-300">
                  <Heading text="Ping Cheng" align="left" />
                </div>
                <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 animate-fade-in animate-delay-400">
                  Staff Engineer at REA Group
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 animate-fade-in animate-delay-500">
                  Experienced full-stack engineer specializing in modern web technologies, cloud solutions, and enterprise software development.
                  Passionate about building scalable systems and leading technical initiatives that drive business value.
                </p>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start animate-fade-in animate-delay-600">
                  {links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      aria-label={link.ariaLabel}
                    >
                      {link.label === 'github' && <FaGithub size={14} />}
                      {link.label === 'linkedin' && <FaLinkedin size={14} />}
                      {link.label === 'email' && '✉️'}
                      <span className="text-xs">{link.text}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="card p-6 rounded-lg w-full mb-8 animate-fade-in animate-delay-700">
            <div className="mb-6 animate-fade-in animate-delay-800">
              <Heading text="Technical Expertise" align="center" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: GrCode, title: "Backend", skills: backendStack },
                { icon: IoLogoJavascript, title: "Frontend", skills: frontendStack },
                { icon: FaCloud, title: "Cloud & DevOps", skills: devOpsStack },
                { icon: MdHistory, title: "Legacy", skills: legacyStack }
              ].map((category, index) => {
                const Icon = category.icon;
                return (
                  <div key={category.title} className={`animate-slide-in-left animate-delay-${900 + (index * 100)}`}>
                    <div className="text-center mb-3">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Icon className="text-base text-gray-600 dark:text-gray-400" aria-hidden="true" />
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                        {category.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {category.skills.map((text) => (
                        <span key={text} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300 rounded-md">
                          {text}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Work Experience Section */}
          <section className="card p-6 rounded-lg w-full animate-fade-in animate-delay-1300">
            <div className="mb-6 animate-fade-in animate-delay-1400">
              <Heading text="Professional Experience" align="center" />
            </div>
            <div className="space-y-6">
              {workExperiences.map((companyItem, companyIdx) => (
                <div key={companyIdx} className={`border-l-2 border-gray-200 dark:border-gray-700 pl-4 animate-slide-in-left animate-delay-${1500 + (companyIdx * 200)}`}>
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                        {companyItem.company.name}
                      </h3>
                      {companyItem.company.linkedInUrl && (
                        <a
                          href={companyItem.company.linkedInUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                          aria-label={`${companyItem.company.name} LinkedIn profile`}
                        >
                          <FaLinkedin size={14} aria-hidden="true" />
                        </a>
                      )}
                    </div>

                    <div className="space-y-3">
                      {companyItem.positions.map((item, idx) => (
                        <div key={idx}>
                          <h4 className="font-medium text-gray-800 dark:text-gray-200 text-sm mb-1">
                            {item.position}
                          </h4>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                            {item.startDate} - {item.endDate} · {getDurationString(item.startDate, item.endDate)}
                          </div>
                          {item.description.length > 0 && (
                            <div className="space-y-1">
                              {item.description.map((line, descIdx) =>
                                line === ":line-break:" ? (
                                  <div key={descIdx} className="h-1"></div>
                                ) : line.startsWith("- ") ? (
                                  <div key={descIdx} className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed ml-3">
                                    • {line.substring(2)}
                                  </div>
                                ) : line.endsWith(":") ? (
                                  <div key={descIdx} className="text-xs font-medium text-gray-700 dark:text-gray-300 mt-2 mb-1">
                                    {line}
                                  </div>
                                ) : (
                                  <div key={descIdx} className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {line}
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
