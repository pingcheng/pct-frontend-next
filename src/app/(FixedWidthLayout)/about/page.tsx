import { Heading } from "@/components/Heading";
import { Avatar } from "@/components/Avatar";
import { profile, socialUrls } from "@/data/profile";
import { DataRow } from "@/components/DataRow";
import { GrCode } from "react-icons/gr";
import { backendStack, frontendStack } from "@/data/skills";
import { IoLogoJavascript } from "react-icons/io5";

export default function About() {
  const links = [
    { label: "github", url: socialUrls.github },
    { label: "linkedin", url: socialUrls.linkedin },
    { label: "email", url: `mailto:${profile.email}`, text: profile.email },
  ];

  return (
    <div className="flex flex-col items-center gap-4 pt-4">
      <Heading text="About me" align="center" />
      <Avatar width={128} height={128} />

      <div>
        {links.map((link) => (
          <DataRow key={link.label} label={link.label}>
            <a href={link.url} target="_blank">
              {link.text ?? link.url}
            </a>
          </DataRow>
        ))}

        <DataRow label="bio">{profile.bio}</DataRow>

        <DataRow label="skills">
          <div className="mb-2">
            <GrCode /> Backend
            <div className="text-gray-400 text-xs">
              {backendStack.map((text) => (
                <div key={text}>{text}</div>
              ))}
            </div>
          </div>

          <div className="mb-2">
            <IoLogoJavascript /> Frontend
            <div className="text-gray-400 text-xs">
              {frontendStack.map((text) => (
                <div key={text}>{text}</div>
              ))}
            </div>
          </div>
        </DataRow>
      </div>
    </div>
  );
}
