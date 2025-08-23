import { render, screen } from "@testing-library/react";
import Portfolio, { metadata } from "./page";
import { Portfolios } from "@/data/portfolios";

describe("Portfolio page", () => {
  it("matches snapshot", () => {
    const { container } = render(<Portfolio />);
    expect(container).toMatchSnapshot();
  });

  it("should display the correct heading", () => {
    render(<Portfolio />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Portfolio");
  });

  it("should display all portfolio items with correct links", () => {
    render(<Portfolio />);

    Portfolios.forEach((portfolio) => {
      // Check if portfolio card link exists with correct href
      const links = screen.getAllByRole("link");
      const portfolioLink = links.find(
        (link) => link.getAttribute("href") === `/portfolio/${portfolio.slug}`
      );
      expect(portfolioLink).toBeInTheDocument();

      // Check if portfolio card exists
      const card = portfolioLink?.querySelector(".portfolioCard");
      expect(card).toBeInTheDocument();

      // Check if portfolio details are rendered
      const name = portfolioLink?.querySelector(".text-sm.font-bold");
      const descriptions = portfolioLink?.querySelectorAll(".text-xs");
      const shortDescription = descriptions?.[1]; // Second .text-xs element is the description
      expect(name).toHaveTextContent(portfolio.name);
      expect(shortDescription).toHaveTextContent(portfolio.shortDescription);
    });
  });

  it("should have correct metadata", () => {
    expect(metadata.title).toBe("Portfolio | Ping Cheng - Software Development Projects");
  });
});
