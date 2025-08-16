import { Heading } from "@/components/Heading";
import { workExperiences } from "@/data/work-experience";
import { FaLinkedin } from "react-icons/fa";
import { getDurationString } from "@/utils/getDurationString";

function renderDescriptionLine(line: string, descIdx: number) {
  if (line === ":line-break:") {
    return <div key={descIdx} className="h-1"></div>;
  }
  
  if (line.startsWith("- ")) {
    return (
      <div key={descIdx} className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed ml-3">
        • {line.substring(2)}
      </div>
    );
  }
  
  if (line.endsWith(":")) {
    return (
      <div key={descIdx} className="text-xs font-medium text-gray-700 dark:text-gray-300 mt-2 mb-1">
        {line}
      </div>
    );
  }
  
  return (
    <div key={descIdx} className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
      {line}
    </div>
  );
}

export function ExperienceSection() {
  return (
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
                        {item.description.map((line, descIdx) => renderDescriptionLine(line, descIdx))}
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
  );
}