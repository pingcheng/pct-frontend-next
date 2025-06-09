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

export const metadata = {
  title: "About me",
};

export default function About() {
  const links = [
    { label: "github", url: socialUrls.github },
    { label: "linkedin", url: socialUrls.linkedin },
    { label: "email", url: `mailto:${profile.email}`, text: profile.email },
  ];

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center">
      <div className="card p-8 rounded-2xl bg-opacity-90 max-w-xl w-full mx-auto mt-4">
        <Heading text="About me" align="center" />
        <div className="flex flex-col items-center gap-4 mt-4 mb-6">
          <div className="shadow-lg" style={{ borderRadius: "50%" }}>
            <Avatar width={128} height={128} />
          </div>
        </div>
        <div className="w-full">
          {links.map((link) => (
            <DataRow key={link.label} label={link.label}>
              <a href={link.url} target="_blank" rel="noopener">
                {link.text ?? link.url}
              </a>
            </DataRow>
          ))}

          <DataRow label="skills">
            <div className="mb-4 pb-2 last:mb-0 last:pb-0">
              <span className="inline-flex items-center gap-2 font-semibold text-accent">
                <GrCode /> Backend
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {backendStack.map((text) => (
                  <Chip key={text}>{text}</Chip>
                ))}
              </div>
            </div>

            <div className="mb-4 pb-2 last:mb-0 last:pb-0">
              <span className="inline-flex items-center gap-2 font-semibold text-accent">
                <IoLogoJavascript /> Frontend
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {frontendStack.map((text) => (
                  <Chip key={text}>{text}</Chip>
                ))}
              </div>
            </div>

            <div className="mb-2">
              <span className="inline-flex items-center gap-2 font-semibold text-accent">
                <FaCloud /> Cloud & DevOps
              </span>
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
                  <span className="font-semibold text-base text-accent leading-tight">
                    {companyItem.company}
                  </span>
                  {companyItem.positions.map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-0.5 mt-1 mb-2">
                      <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                        {item.position}
                      </span>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {item.startDate} - {item.endDate}
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
        </div>
      </div>
    </div>
  );
}
