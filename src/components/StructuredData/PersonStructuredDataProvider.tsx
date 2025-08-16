import { PersonStructuredData } from "./StructuredData";
import { profile, socialUrls } from "@/data/profile";
import { URLS } from "@/constants/urls";

interface PersonStructuredDataProviderProps {
  /**
   * Override the default skills array. If not provided, uses a basic set of skills.
   * For detailed skills, pass the combined skills from data files.
   */
  knowsAbout?: string[];
  
  /**
   * Include email in the structured data (optional)
   */
  includeEmail?: boolean;
  
  /**
   * Override default job title
   */
  jobTitle?: string;
}

export function PersonStructuredDataProvider({ 
  knowsAbout,
  includeEmail = false,
  jobTitle = "Staff Engineer"
}: PersonStructuredDataProviderProps) {
  // Default basic skills if none provided
  const defaultSkills = [
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
  ];

  return (
    <PersonStructuredData
      name={profile.fullName}
      jobTitle={jobTitle}
      url={URLS.WEBSITE.BASE}
      image={URLS.ASSETS.APPLE_ICON}
      sameAs={[socialUrls.github, socialUrls.linkedin]}
      worksFor={{
        name: "REA Group",
        url: URLS.COMPANY.REA_GROUP,
      }}
      knowsAbout={knowsAbout || defaultSkills}
      address={{
        addressLocality: "Melbourne",
        addressRegion: "Victoria",
        addressCountry: "Australia",
      }}
      {...(includeEmail && { email: profile.email })}
    />
  );
}