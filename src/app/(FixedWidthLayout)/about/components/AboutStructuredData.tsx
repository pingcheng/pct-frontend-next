import {
  PersonStructuredData,
  BreadcrumbListStructuredData,
  ProfessionalServiceStructuredData,
} from "@/components/StructuredData/StructuredData";
import { profile, socialUrls } from "@/data/profile";
import { backendStack, devOpsStack, frontendStack, legacyStack } from "@/data/skills";

export function AboutStructuredData() {
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
    </>
  );
}