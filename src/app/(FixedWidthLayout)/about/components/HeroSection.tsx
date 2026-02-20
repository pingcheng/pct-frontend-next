import { Avatar } from "@/components/Avatar";
import { Heading } from "@/components/Heading";
import { profile, socialUrls } from "@/data/profile";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export function HeroSection() {
  const links = [
    { label: "github", url: socialUrls.github, text: "GitHub", ariaLabel: "Visit my GitHub profile" },
    { label: "linkedin", url: socialUrls.linkedin, text: "LinkedIn", ariaLabel: "Visit my LinkedIn profile" },
    { label: "email", url: `mailto:${profile.email}`, text: profile.email, ariaLabel: `Send email to ${profile.email}` },
  ];

  return (
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
            Principal Engineer at REA Group
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
  );
}