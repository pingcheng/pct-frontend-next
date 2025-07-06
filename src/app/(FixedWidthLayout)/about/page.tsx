import { Heading } from "@/components/Heading";
import { Avatar } from "@/components/Avatar";
import { profile, socialUrls } from "@/data/profile";
import { DataRow } from "@/components/DataRow";
import { GrCode } from "react-icons/gr";
import { backendStack, devOpsStack, frontendStack } from "@/data/skills";
import { IoLogoJavascript } from "react-icons/io5";
import { FaCloud } from "react-icons/fa6";
import { workExperiences } from "@/data/work-experience";
import { Chip } from "@/components/Chip";
import { FaLinkedin } from "react-icons/fa";
import {
  PersonStructuredData,
  BreadcrumbListStructuredData,
  ProfessionalServiceStructuredData,
} from "@/components/StructuredData/StructuredData";

export const metadata = {
  title: "About Ping Cheng",
  description:
    "Lead developer at REA Group with expertise in Node.js, TypeScript, PHP, Java, and Linux. Experienced in full-stack development, cloud solutions, and enterprise software. Learn about my professional journey and technical skills.",
  keywords: [
    "Ping Cheng",
    "Lead Developer",
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
      "Lead developer at REA Group specializing in modern web technologies, cloud solutions, and enterprise software development. Discover my professional journey and technical expertise.",
    url: "https://www.pingchengtech.com/about",
    type: "profile",
    images: [
      {
        url: "/apple-icon.png",
        width: 180,
        height: 180,
        alt: "Ping Cheng - Lead Developer",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "About Ping Cheng",
    description:
      "Lead developer at REA Group specializing in modern web technologies, cloud solutions, and enterprise software development.",
    images: ["/apple-icon.png"],
  },
};

import { getDurationString } from "@/utils/getDurationString";

export default function About() {
  const links = [
    { label: "github", url: socialUrls.github, text: "GitHub Profile", ariaLabel: "Visit my GitHub profile" },
    { label: "linkedin", url: socialUrls.linkedin, text: "LinkedIn Profile", ariaLabel: "Visit my LinkedIn profile" },
    { label: "email", url: `mailto:${profile.email}`, text: profile.email, ariaLabel: `Send email to ${profile.email}` },
  ];

  const skillsArray = [
    ...backendStack,
    ...frontendStack,
    ...devOpsStack,
  ];

  const breadcrumbItems = [
    { name: "Home", url: "https://www.pingchengtech.com" },
    { name: "About", url: "https://www.pingchengtech.com/about" },
  ];

  return (
    <>
      <PersonStructuredData
        name={profile.fullName}
        jobTitle="Lead Developer"
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
      <main className="min-h-screen bg-transparent flex flex-col items-center justify-center">
      <article className="card p-8 rounded-2xl bg-opacity-90 max-w-xl w-full mx-auto mt-4 animate-fade-in-scale">
        <div className="animate-fade-in">
          <Heading text="About me" align="center" />
        </div>
        <section className="flex flex-col items-center gap-4 mt-4 mb-6 animate-fade-in animate-delay-200">
          <div className="shadow-lg" style={{ borderRadius: "50%" }}>
            <Avatar width={128} height={128} alt="Ping Cheng profile photo" />
          </div>
        </section>
        <section className="w-full animate-fade-in animate-delay-300" aria-label="Contact information and professional details">
          {links.map((link, index) => (
            <div key={link.label} className={`animate-slide-in-left animate-delay-${400 + (index * 100)}`}>
              <DataRow label={link.label}>
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                >
                  {link.text}
                </a>
              </DataRow>
            </div>
          ))}

          <DataRow label="skills">
            <div className="mb-4 pb-2 last:mb-0 last:pb-0">
              <h3 className="inline-flex items-center gap-2 font-semibold text-accent">
                <GrCode aria-hidden="true" /> Backend
              </h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {backendStack.map((text) => (
                  <Chip key={text}>{text}</Chip>
                ))}
              </div>
            </div>

            <div className="mb-4 pb-2 last:mb-0 last:pb-0">
              <h3 className="inline-flex items-center gap-2 font-semibold text-accent">
                <IoLogoJavascript aria-hidden="true" /> Frontend
              </h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {frontendStack.map((text) => (
                  <Chip key={text}>{text}</Chip>
                ))}
              </div>
            </div>

            <div className="mb-2">
              <h3 className="inline-flex items-center gap-2 font-semibold text-accent">
                <FaCloud aria-hidden="true" /> Cloud & DevOps
              </h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {devOpsStack.map((text) => (
                  <Chip key={text}>{text}</Chip>
                ))}
              </div>
            </div>
          </DataRow>

          <DataRow label="work">
            <div className="flex flex-col gap-6">
              {workExperiences.map((companyItem, companyIdx) => (
                <div
                  key={companyIdx}
                  className="flex flex-col gap-1 py-2 border-b-1 last:border-b-0 border-dashed"
                >
                  <h3 className="font-semibold text-base text-accent leading-tight">
                    {companyItem.company.name}
                    {companyItem.company.linkedInUrl && (
                      <a
                        href={companyItem.company.linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-500 hover:text-blue-700 align-middle inline-block"
                        aria-label={`${companyItem.company.name} LinkedIn profile`}
                      >
                        <FaLinkedin size={18} aria-hidden="true" />
                      </a>
                    )}
                  </h3>
                  {companyItem.positions.map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-0.5 mt-1 mb-2">
                      <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                        {item.position}
                      </span>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {item.startDate} - {item.endDate}{" "}
                        <span className="text-gray-500">
                          ({getDurationString(item.startDate, item.endDate)})
                        </span>
                      </div>
                      {item.description.length > 0 && (
                        <div className="mt-1 text-xs text-gray-600 dark:text-gray-300 leading-relaxed space-y-1">
                          {item.description.map((line, descIdx) =>
                            line === ":line-break:" ? (
                              <br key={descIdx} />
                            ) : (
                              <div key={descIdx}>{line}</div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </DataRow>
        </section>
      </article>
    </main>
    </>
  );
}
