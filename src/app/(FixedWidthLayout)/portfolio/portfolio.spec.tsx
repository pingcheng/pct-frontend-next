import { render, screen } from "@testing-library/react";
import Portfolio from "./page";
import { Portfolios } from "@/data/portfolios";

// Mock the portfolio data
jest.mock("@/data/portfolios", () => ({
  Portfolios: [
    {
      slug: "test-portfolio-1",
      name: "Test Portfolio 1",
      shortDescription: "Test Description 1",
      hasScreenshots: true,
    },
    {
      slug: "test-portfolio-2",
      name: "Test Portfolio 2",
      shortDescription: "Test Description 2",
      hasScreenshots: false,
    },
  ],
}));

describe("Portfolio page", () => {
  it("should render the portfolio page", () => {
    const { container } = render(<Portfolio />);
    expect(container).toMatchSnapshot();
  });

  it("should display the correct heading", () => {
    render(<Portfolio />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Portfolio");
  });

  it("should display all portfolios from the data", () => {
    render(<Portfolio />);

    // Check if all portfolios are displayed
    Portfolios.forEach((portfolio) => {
      // Find the portfolio card with the portfolio name
      const portfolioElement = screen.getByText(portfolio.name);
      expect(portfolioElement).toBeInTheDocument();
    });
  });

  it("should have correct links to individual portfolio pages", () => {
    render(<Portfolio />);

    // Check if all portfolio links are correct
    Portfolios.forEach((portfolio) => {
      const portfolioLink = screen.getByText(portfolio.name).closest("a");
      expect(portfolioLink).toHaveAttribute(
        "href",
        `/portfolio/${portfolio.slug}`
      );
    });
  });

  it("should have a responsive layout with flex wrap", () => {
    render(<Portfolio />);

    // Find the portfolio grid container
    const gridContainer = screen
      .getByText("Portfolio")
      .parentElement?.parentElement?.querySelector(".mt-4");
    expect(gridContainer).toHaveClass("flex");
    expect(gridContainer).toHaveClass("flex-row");
    expect(gridContainer).toHaveClass("flex-wrap");
  });
});
