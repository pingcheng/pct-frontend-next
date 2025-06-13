import { render, screen } from "@testing-library/react";
import Page, { generateMetadata } from "./page";
import { notFound } from "next/navigation";
import { Portfolio } from "@/models/Portfolio/Portfolio";
import { createPortfolio } from "@/models/Portfolio/Portfolio";

// Mock the imported components and modules
jest.mock("@/components/Heading", () => ({
  Heading: ({ text, align }: { text: string; align?: string }) => (
    <h1 data-align={align}>{text}</h1>
  ),
}));

jest.mock("@/components/DataRow", () => ({
  DataRow: ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <div data-testid="data-row" data-label={label}>
      {children}
    </div>
  ),
}));

jest.mock("@/components/PortfolioCard/PortfolioCard", () => ({
  __esModule: true,
  default: ({ portfolio }: { portfolio: Portfolio }) => (
    <div data-testid="portfolio-card">{portfolio.name}</div>
  ),
}));

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

jest.mock(
  "@/app/(FixedWidthLayout)/portfolio/[slug]/ScreenshotSection",
  () => ({
    ScreenshotSection: ({ images }: { images: string[] }) => (
      <div data-testid="screenshot-section">
        {images.map((img, index) => (
          <div key={index} data-image={img} />
        ))}
      </div>
    ),
  })
);

// Mock the portfolio data module with two test portfolios
jest.mock("@/data/portfolios", () => ({
  Portfolios: [
    {
      slug: "test-project",
      name: "Test Project",
      coverImage: "/test-cover.jpg",
      url: "https://test-project.com",
      shortDescription: "A short description",
      longDescription: "A long description of the test project",
      workplace: "Test Company",
      projectRole: "Developer",
      roleDescription: ["Task 1", "Task 2"],
      members: ["Person 1", "Person 2"],
      screenshots: ["/screenshot1.jpg", "/screenshot2.jpg"],
      hasScreenshots: true,
    },
    {
      slug: "no-url-project",
      name: "No URL Project",
      coverImage: "/test-cover.jpg",
      url: null,
      shortDescription: "A short description",
      longDescription: "A long description of the test project",
      workplace: "Test Company",
      projectRole: "Developer",
      roleDescription: ["Task 1", "Task 2"],
      members: ["Person 1", "Person 2"],
      screenshots: ["/screenshot1.jpg", "/screenshot2.jpg"],
      hasScreenshots: true,
    },
  ],
}));

// Mock portfolio data for tests
const mockPortfolio = createPortfolio("test-project", {
  name: "Test Project",
  coverImage: "/test-cover.jpg",
  url: "https://test-project.com",
  shortDescription: "A short description",
  longDescription: "A long description of the test project",
  workplace: "Test Company",
  projectRole: "Developer",
  roleDescription: ["Task 1", "Task 2"],
  members: ["Person 1", "Person 2"],
  screenshots: ["/screenshot1.jpg", "/screenshot2.jpg"],
});

describe("Portfolio Slug Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should match snapshot", async () => {
    const { container } = render(
      await Page({ params: Promise.resolve({ slug: "test-project" }) })
    );
    expect(container).toMatchSnapshot();
  });

  it("should call notFound when portfolio is not found", async () => {
    await Page({ params: Promise.resolve({ slug: "non-existent" }) });
    expect(notFound).toHaveBeenCalled();
  });

  it("should render the portfolio details correctly", async () => {
    render(await Page({ params: Promise.resolve({ slug: "test-project" }) }));

    // Check heading (using role to be more specific)
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("Test Project");
    expect(heading).toHaveAttribute("data-align", "center");

    // Check back link
    const backLink = screen.getByText("< Back");
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/portfolio");

    // Check portfolio card
    expect(screen.getByTestId("portfolio-card")).toBeInTheDocument();

    // Check data rows
    const dataRows = screen.getAllByTestId("data-row");

    // Project name
    const projectRow = dataRows.find(
      (row) => row.getAttribute("data-label") === "project"
    );
    expect(projectRow).toHaveTextContent("Test Project");

    // URL
    const urlRow = dataRows.find(
      (row) => row.getAttribute("data-label") === "url"
    );
    const urlLink = urlRow?.querySelector("a");
    expect(urlLink).toHaveAttribute("href", "https://test-project.com");
    expect(urlLink).toHaveAttribute("target", "_blank");

    // Description
    const descriptionRow = dataRows.find(
      (row) => row.getAttribute("data-label") === "description"
    );
    expect(descriptionRow).toHaveTextContent(
      "A long description of the test project"
    );

    // Workplace
    const workplaceRow = dataRows.find(
      (row) => row.getAttribute("data-label") === "workplace"
    );
    expect(workplaceRow).toHaveTextContent("Test Company");

    // Project role
    const roleRow = dataRows.find(
      (row) => row.getAttribute("data-label") === "project role"
    );
    expect(roleRow).toHaveTextContent("Developer");

    // Role description
    const roleDescriptionRow = dataRows.find(
      (row) => row.getAttribute("data-label") === "role description"
    );
    expect(roleDescriptionRow).toHaveTextContent("Task 1");
    expect(roleDescriptionRow).toHaveTextContent("Task 2");

    // Team members
    const membersRow = dataRows.find(
      (row) => row.getAttribute("data-label") === "team members"
    );
    expect(membersRow).toHaveTextContent("Person 1");
    expect(membersRow).toHaveTextContent("Person 2");
  });

  it("should render the screenshots section with correct images", async () => {
    render(await Page({ params: Promise.resolve({ slug: "test-project" }) }));

    const screenshotSection = screen.getByTestId("screenshot-section");
    expect(screenshotSection).toBeInTheDocument();

    // Check for screenshot divs with the correct image paths
    expect(
      screenshotSection.querySelector('[data-image="/screenshot1.jpg"]')
    ).toBeInTheDocument();
    expect(
      screenshotSection.querySelector('[data-image="/screenshot2.jpg"]')
    ).toBeInTheDocument();
  });

  it("should display a dash when URL is not available", async () => {
    render(await Page({ params: Promise.resolve({ slug: "no-url-project" }) }));

    // Check that URL shows a dash instead of a link
    const urlRow = screen
      .getAllByTestId("data-row")
      .find((row) => row.getAttribute("data-label") === "url");

    expect(urlRow).toHaveTextContent("-");
    expect(urlRow?.querySelector("a")).not.toBeInTheDocument();
  });

  it("should render an empty role description when roleDescription is an empty array", async () => {
    // Add a portfolio with empty roleDescription to the mock
    const { Portfolios } = require("@/data/portfolios");
    Portfolios.push({
      slug: "empty-role-desc",
      name: "Empty Role Desc Project",
      coverImage: "/test-cover.jpg",
      url: "https://empty-role-desc.com",
      shortDescription: "A short description",
      longDescription: "A long description of the test project",
      workplace: "Test Company",
      projectRole: "Developer",
      roleDescription: [],
      members: ["Person 1", "Person 2"],
      screenshots: ["/screenshot1.jpg", "/screenshot2.jpg"],
      hasScreenshots: true,
    });

    render(
      await Page({ params: Promise.resolve({ slug: "empty-role-desc" }) })
    );
    const roleDescriptionRow = screen
      .getAllByTestId("data-row")
      .find((row) => row.getAttribute("data-label") === "role description");
    expect(roleDescriptionRow).toBeInTheDocument();
    // Should not have any child divs for role description
    expect(roleDescriptionRow?.querySelectorAll("div").length).toBe(0);
  });
});

describe("generateMetadata", () => {
  it("should return correct metadata for an existing portfolio", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "test-project" }),
    });
    expect(metadata).toEqual({ title: "Portfolio - Test Project" });
  });

  it("should return title with undefined for a non-existent portfolio", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "non-existent" }),
    });
    expect(metadata).toEqual({ title: "Portfolio - undefined" });
  });
});
