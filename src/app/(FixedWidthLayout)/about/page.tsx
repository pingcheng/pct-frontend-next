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
            {workExperiences.map((item, index) => {
              return (
                <div key={index} className="mb-2">
                  <div>{item.company}</div>
                  <div className="text-xs">
                    <div>
                      <span>{item.position}</span>
                      <span className="text-gray-400">
                        {" "}
                        / {item.startDate} - {item.endDate}
                      </span>
                    </div>
                    <div className="text-gray-400">
                      {item.description.map((line, index) => {
                        if (line === ":line-break:") {
                          return <br key={index} />;
                        }

                        return <div key={index}>{line}</div>;
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </DataRow>
        </div>
      </div>
    </div>
  );
}
