export type WorkExperience = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
};

export const workExperiences: WorkExperience[] = [
  {
    company: "REA Group - PropTrack",
    position: "Senior Developer",
    startDate: "Jul 2022",
    endDate: "Present",
    description: [
      "Highly involved in digital mortgage areas, seamlessly connecting banks and the valuation industry with modern digital solutions. Contributing to the development of secure, enterprise-level products.",
      ":line-break:",
      "Key Responsibilities:",
      "- Collaborate closely with the lead developer to design system solutions.",
      "- Utilise existing group-wide infrastructure to optimise efficiency and avoid redundancy.",
      "- Take the lead in developing feature slices and efficiently allocate work within the team.",
      "- Provide mentorship to less experienced developers within the team.",
    ],
  },
  {
    company: "REA Group - PropTrack",
    position: "Developer",
    startDate: "Aug 2019",
    endDate: "Jun 2022",
    description: [],
  },
  {
    company: "AroFlo",
    position: "Web Developer",
    startDate: "Aug 2019",
    endDate: "Sept 2021",
    description: [
      "Working as a full stack developer. Delivering new features to AroFlo Platform which is an industry leading product in Australia, my current main involves in the platform include but not limited to project management, quotes, invoices, payment integration areas.",
    ],
  },
  {
    company: "PTEPLUS",
    position: "Development Lead",
    startDate: "Jan 2018",
    endDate: "May 2019",
    description: [
      "Work with the dev team on two main products. Design and implement IT architecture on the clouding computing platforms (AWS and Aliyun). Deliver stable, rapid responsible and reliable web applications to product's users.",
    ],
  },
  {
    company: "PTEPLUS",
    position: "Full Stack Developer",
    startDate: "Oct 2016",
    endDate: "Jan 2018",
    description: [
      "One of the key contributors to the start-up company, and participated in almost every stage of product design, implement and testing. Took responsibilities on full solutions to the technical side such as coding and servers’ setup.",
    ],
  },
];

export const backendStack: string[] = [
  "Node, TypeScript, JavaScript",
  "Java, ColdFusion",
  "PHP, Laravel, Moodle",
  "MySQL, MSSQL, Redis",
  "Server management, Message Queue",
  "Payment Integration",
];

export const frontendStack: string[] = [
  "HTML",
  "JavaScript, Vue, React, jQuery",
  "CSS, SASS, TailwindCSS, Styled Components, Bootstrap",
  "Webpack",
];

export const devOpsStack: string[] = [
  "AWS",
  "Infrastructure planning and implementing",
  "Horizontal scaling",
  "Serverless, Docker, ECS",
  "CI/CD, GitlabCI, CircleCI",
];
