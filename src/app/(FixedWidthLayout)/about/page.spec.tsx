import { render, screen } from "@testing-library/react";
import About, { metadata } from "./page";
import { profile, socialUrls } from "@/data/profile";
import { backendStack, frontendStack, devOpsStack } from "@/data/skills";
import { workExperiences } from "@/data/work-experience";

describe("test about page", () => {
  it("ensures snapshot is correct", () => {
    const { container } = render(<About />);
    expect(container).toMatchSnapshot();
  });

  it("should display the correct heading", () => {
    render(<About />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("About me");
  });

  it("should display the avatar with correct dimensions", () => {
    render(<About />);
    const avatar = document.querySelector("img");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("width", "128");
    expect(avatar).toHaveAttribute("height", "128");
  });

  it("should display social links with correct URLs", () => {
    render(<About />);

    // Check for GitHub link
    const githubRow = screen.getByText("GITHUB");
    const githubLink = githubRow.parentElement?.querySelector("a");
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", socialUrls.github);
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener");

    // Check for LinkedIn link
    const linkedinRow = screen.getByText("LINKEDIN");
    const linkedinLink = linkedinRow.parentElement?.querySelector("a");
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute("href", socialUrls.linkedin);

    // Check for email link
    const emailRow = screen.getByText("EMAIL");
    const emailLink = emailRow.parentElement?.querySelector("a");
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", `mailto:${profile.email}`);
    expect(emailLink).toHaveTextContent(profile.email);
  });

  it("should display bio from profile data", () => {
    render(<About />);
    // Check for a unique substring from the bio using getByText with exact: false
    expect(
      screen.getByText("currently live in Australia with my wife and son", {
        exact: false,
      })
    ).toBeInTheDocument();
  });

  it("should display skills correctly", () => {
    render(<About />);

    // Check for skills section
    const skillsRow = screen.getByText("SKILLS");
    const skillsSection =
      skillsRow.parentElement?.querySelector("div:nth-child(2)");

    // Backend skills
    expect(skillsSection).toHaveTextContent("Backend");
    backendStack.forEach((skill) => {
      expect(skillsSection).toHaveTextContent(skill);
    });

    // Frontend skills
    expect(skillsSection).toHaveTextContent("Frontend");
    frontendStack.forEach((skill) => {
      expect(skillsSection).toHaveTextContent(skill);
    });

    // DevOps skills
    expect(skillsSection).toHaveTextContent("Cloud & DevOps");
    devOpsStack.forEach((skill) => {
      expect(skillsSection).toHaveTextContent(skill);
    });
  });

  it("should display work experience correctly", () => {
    render(<About />);

    // Check for work section
    const workRow = screen.getByText("WORK");
    const workSection =
      workRow.parentElement?.querySelector("div:nth-child(2)");

    // Check all work experiences are displayed
    workExperiences.forEach((experience) => {
      expect(workSection).toHaveTextContent(experience.company);
      expect(workSection).toHaveTextContent(experience.position);
      expect(workSection).toHaveTextContent(experience.startDate);
      expect(workSection).toHaveTextContent(experience.endDate);

      // Test each line of the description
      experience.description.forEach((line) => {
        if (line === ":line-break:") {
          // Check for <br> element when line-break is found
          const brElements = workSection?.querySelectorAll("br");
          expect(brElements?.length).toBeGreaterThan(0);
        } else {
          expect(workSection).toHaveTextContent(line);
        }
      });
    });
  });

  it("should have correct metadata", () => {
    expect(metadata.title).toBe("About me");
  });
});
