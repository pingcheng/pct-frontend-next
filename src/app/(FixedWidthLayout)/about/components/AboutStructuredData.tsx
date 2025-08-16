import {
  BreadcrumbListStructuredData,
  ProfessionalServiceStructuredData,
} from "@/components/StructuredData/StructuredData";
import { PersonStructuredDataProvider } from "@/components/StructuredData/PersonStructuredDataProvider";
import { profile } from "@/data/profile";
import { backendStack, devOpsStack, frontendStack, legacyStack } from "@/data/skills";
import { URLS } from "@/constants/urls";

export function AboutStructuredData() {
  const skillsArray = [
    ...backendStack,
    ...frontendStack,
    ...devOpsStack,
    ...legacyStack,
  ];

  const breadcrumbItems = [
    { name: "Home", url: URLS.WEBSITE.BASE },
    { name: "About", url: URLS.WEBSITE.ABOUT },
  ];

  return (
    <>
      <PersonStructuredDataProvider 
        knowsAbout={skillsArray}
        includeEmail={true}
      />
      <BreadcrumbListStructuredData items={breadcrumbItems} />
      <ProfessionalServiceStructuredData
        name="Software Development Services"
        description="Full-stack web development, cloud solutions, and enterprise software development services specializing in Node.js, TypeScript, PHP, Java, and modern web technologies."
        provider={{
          name: profile.fullName,
          url: URLS.WEBSITE.BASE,
        }}
        areaServed="Melbourne, Australia"
        serviceType="Software Development"
      />
    </>
  );
}