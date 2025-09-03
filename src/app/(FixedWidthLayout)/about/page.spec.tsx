import { render, screen } from "@testing-library/react";
import About, { metadata } from "./page";
import { profile, socialUrls } from "@/data/profile";
import { backendStack, frontendStack, devOpsStack } from "@/data/skills";
import { workExperiences } from "@/data/work-experience";

describe("test about page", () => {
  // Mock current date to August 10, 2025 for consistent snapshots
  const MOCK_NOW = new Date(2025, 7, 10).getTime(); // August = month 7 (0-based)
  let dateNowSpy: jest.SpyInstance;

  beforeAll(() => {
    dateNowSpy = jest.spyOn(Date, "now").mockImplementation(() => MOCK_NOW);
  });

  afterAll(() => {
    dateNowSpy.mockRestore();
  });

  it("ensures snapshot is correct", () => {
    const { container } = render(<About />);
    expect(container).toMatchSnapshot();
  });

  it("should display the correct heading", () => {
    render(<About />);
    const heading = screen.getByText("Ping Cheng");
    expect(heading).toBeInTheDocument();
  });

  it("should display social links with correct URLs", () => {
    render(<About />);

    // Check for GitHub link
    const githubLink = screen.getByRole("link", { name: /visit my github profile/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", socialUrls.github);
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");

    // Check for LinkedIn link
    const linkedinLink = screen.getByRole("link", { name: /visit my linkedin profile/i });
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute("href", socialUrls.linkedin);

    // Check for email link
    const emailLink = screen.getByRole("link", { name: new RegExp(`send email to ${profile.email}`, "i") });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", `mailto:${profile.email}`);
    expect(emailLink).toHaveTextContent(profile.email);
  });

  it("should display skills correctly", () => {
    render(<About />);

    // Check for skills section heading
    const skillsHeading = screen.getByText("Technical Expertise");
    expect(skillsHeading).toBeInTheDocument();

    // Backend skills
    const backendSection = screen.getByText("Backend");
    expect(backendSection).toBeInTheDocument();
    backendStack.forEach((skill) => {
      expect(screen.getAllByText(skill).length).toBeGreaterThanOrEqual(1);
    });

    // Frontend skills
    const frontendSection = screen.getByText("Frontend");
    expect(frontendSection).toBeInTheDocument();
    frontendStack.forEach((skill) => {
      expect(screen.getAllByText(skill).length).toBeGreaterThanOrEqual(1);
    });

    // DevOps skills
    const devopsSection = screen.getByText("Cloud & DevOps");
    expect(devopsSection).toBeInTheDocument();
    devOpsStack.forEach((skill) => {
      expect(screen.getAllByText(skill).length).toBeGreaterThanOrEqual(1);
    });
  });

  it("should display work experience correctly", () => {
    render(<About />);

    // Check for work section heading
    const workHeading = screen.getByText("Professional Experience");
    expect(workHeading).toBeInTheDocument();

    // Check all work experiences are displayed (grouped by company)
    workExperiences.forEach((company) => {
      expect(screen.getByText(company.company.name)).toBeInTheDocument();
      company.positions.forEach((position) => {
        expect(screen.getByText(position.position)).toBeInTheDocument();
        expect(screen.getAllByText(new RegExp(position.startDate)).length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText(new RegExp(position.endDate)).length).toBeGreaterThanOrEqual(1);
        position.description.forEach((line) => {
          if (line !== ":line-break:" && !line.startsWith("- ") && !line.endsWith(":")) {
            // Use a more flexible text matcher for long descriptions that might be split
            const escapedLine = line.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            expect(screen.getByText(new RegExp(escapedLine, 'i'))).toBeInTheDocument();
          }
        });
      });
    });
  });

  it("should have correct metadata", () => {
    expect(metadata.title).toBe("About Ping Cheng");
    expect(metadata.description).toBe(
      "Staff Engineer at REA Group with expertise in Node.js, TypeScript, PHP, Java, and Linux. Experienced in full-stack development, cloud solutions, and enterprise software. Learn about my professional journey and technical skills."
    );
    expect(metadata.keywords).toEqual([
      "Ping Cheng",
      "Staff Engineer",
      "Software Engineer",
      "Melbourne",
      "Full Stack Developer",
      "Cloud Engineer",
      "REA Group",
      "PropTrack",
      "Node.js",
      "TypeScript",
      "PHP",
      "Java",
      "DevOps",
    ]);
    expect(metadata.openGraph).toEqual({
      title: "About Ping Cheng",
      description:
        "Staff Engineer at REA Group specializing in modern web technologies, cloud solutions, and enterprise software development. Discover my professional journey and technical expertise.",
      url: "https://www.pingchengtech.com/about",
      type: "profile",
      images: [
        {
          url: "/apple-icon.png",
          width: 180,
          height: 180,
          alt: "Ping Cheng - Staff Engineer",
        },
      ],
    });
  });

  it("should display the avatar with correct dimensions and alt text", () => {
    render(<About />);
    const avatar = document.querySelector("img");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("width", "120");
    expect(avatar).toHaveAttribute("height", "120");
    expect(avatar).toHaveAttribute("alt", "Ping Cheng profile photo");
  });
});
