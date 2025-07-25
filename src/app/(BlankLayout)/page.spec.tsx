import { render, screen, within } from "@testing-library/react";
import Home from "./page";
import { profile, socialUrls } from "@/data/profile";

describe("test home page", () => {
  it("ensure snapshot is correct", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });

  it("should display the avatar with correct dimensions", () => {
    render(<Home />);
    // The avatar should be in the document
    const avatar = document.querySelector("img");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("width", "192");
    expect(avatar).toHaveAttribute("height", "192");
  });

  it("should display the correct name from profile data", () => {
    render(<Home />);
    // Test that the profile name appears in the heading
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(profile.fullName);
  });

  it("should display description text with correct styling", () => {
    render(<Home />);
    // Test for new description text content
    expect(screen.getByText(/Staff Engineer/)).toBeInTheDocument();
    expect(screen.getByText(/latest tech/)).toBeInTheDocument();

    // Test that key technical skills are mentioned and highlighted
    ["Node", "TypeScript", "PHP", "Java", "Linux"].forEach((skill) => {
      const el = screen.getByText(skill, { exact: false });
      expect(el).toBeInTheDocument();
      expect(el).toHaveClass("text-primary");
    });
  });

  it("should render all necessary social links with correct URLs", () => {
    render(<Home />);

    // Check for GitHub link with correct URL
    const githubLink = screen.getByText("Github").closest("a");
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", socialUrls.github);

    // Check for LinkedIn link with correct URL
    const linkedinLink = screen.getByText("LinkedIn").closest("a");
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute("href", socialUrls.linkedin);

    // Check for internal links
    const portfolioLink = screen.getByText("Portfolio").closest("a");
    expect(portfolioLink).toBeInTheDocument();
    expect(portfolioLink).toHaveAttribute("href", "/portfolio");

    const aboutLink = screen.getByText("About").closest("a");
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute("href", "/about");
  });

  it("should render social links with their corresponding icons", () => {
    render(<Home />);

    // The social links section should contain SVG icons
    const socialLinksSection = screen.getByText("Github").closest("div");
    expect(socialLinksSection).toBeInTheDocument();

    // Each social link should have an SVG icon
    const links = screen.getAllByText(/(Github|LinkedIn|Portfolio|About)/);
    links.forEach((link) => {
      const linkElement = link.closest("a");
      const svg = linkElement?.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  it("should have proper layout structure", () => {
    render(<Home />);

    // Check main container
    const main = screen.getByRole("main");
    expect(main).toHaveClass(
      "h-screen",
      "flex",
      "flex-col",
      "items-center",
      "justify-center"
    );

    // Check that elements are in the correct order: Avatar, Description, Social Links
    const elements = main.children;
    expect(elements.length).toBeGreaterThanOrEqual(3);

    // First element should contain the avatar
    expect(elements[0].querySelector("img")).toBeInTheDocument();

    // Second element should contain the description with profile name
    expect(elements[1].textContent).toContain(profile.fullName);

    // Third element should contain the social links
    expect(elements[2].textContent).toContain("Github");
    expect(elements[2].textContent).toContain("LinkedIn");
  });
});
