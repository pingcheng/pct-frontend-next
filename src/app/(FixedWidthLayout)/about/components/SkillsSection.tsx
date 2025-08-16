import { Heading } from "@/components/Heading";
import { Chip } from "@/components/Chip";
import { backendStack, devOpsStack, frontendStack, legacyStack } from "@/data/skills";
import { GrCode } from "react-icons/gr";
import { IoLogoJavascript } from "react-icons/io5";
import { FaCloud } from "react-icons/fa6";
import { MdHistory } from "react-icons/md";

export function SkillsSection() {
  const skillCategories = [
    { icon: GrCode, title: "Backend", skills: backendStack },
    { icon: IoLogoJavascript, title: "Frontend", skills: frontendStack },
    { icon: FaCloud, title: "Cloud & DevOps", skills: devOpsStack },
    { icon: MdHistory, title: "Legacy", skills: legacyStack }
  ];

  return (
    <section className="card p-6 rounded-lg w-full mb-8 animate-fade-in animate-delay-700">
      <div className="mb-6 animate-fade-in animate-delay-800">
        <Heading text="Technical Expertise" align="center" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category, index) => {
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
                  <Chip key={text}>{text}</Chip>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}