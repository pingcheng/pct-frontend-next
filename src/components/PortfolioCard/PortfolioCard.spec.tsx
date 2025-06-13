import { render } from "@testing-library/react";
import PortfolioCard from "@/components/PortfolioCard/PortfolioCard";
import { Portfolio } from "@/models/Portfolio/Portfolio";

describe("test PortfolioCard", () => {
  const portfolio: Portfolio = {
    slug: "test-portfolio",
    name: "Test Portfolio",
    coverImage: "https://sample.jpg",
    url: "https://sample.com",
    shortDescription: "This is test portfolio description",
    longDescription: "This is the long version of portfolio description",
    workplace: "Ping Cheng Dev Space",
    projectRole: "Developer",
    roleDescription: ["Design", "Development", "Test"],
    members: ["Ping Cheng"],
    screenshots: ["https://image1.jpg", "https://image2.jpg"],
    hasScreenshots: true,
  };

  it("should match the snapshot", () => {
    const { container } = render(<PortfolioCard portfolio={portfolio} />);
    expect(container).toMatchSnapshot();
  });
});
