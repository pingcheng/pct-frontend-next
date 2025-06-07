import { render, screen, fireEvent } from "@testing-library/react";
import { NavBar } from "@/components/NavBar/NavBar";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

import { usePathname } from "next/navigation";

describe("test <NavBar />", () => {
  it("should match the snapshot", () => {
    const { container } = render(<NavBar />);
    expect(container).toMatchSnapshot();
  });

  it("should toggle the mobile menu when the button is clicked", () => {
    render(<NavBar />);
    const toggleButton = screen.getByRole("mobile-toggle");
    // Initially, the mobile menu should be hidden
    expect(screen.getByRole("mobile-nav-menu")).toHaveClass("hidden");
    // Click to show
    fireEvent.click(toggleButton);
    expect(screen.getByRole("mobile-nav-menu")).toHaveClass("block");
    // Click again to hide
    fireEvent.click(toggleButton);
    expect(screen.getByRole("mobile-nav-menu")).toHaveClass("hidden");
  });
});

describe("isActive logic", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should apply active class for item with activePattern when path matches", () => {
    (usePathname as jest.Mock).mockReturnValue("/portfolio/123");
    render(<NavBar />);
    const portfolioLinks = screen.getAllByText("Portfolio");
    portfolioLinks.forEach((link) => {
      expect(link.className).toContain("active");
    });
  });

  it("should apply active class for item without activePattern when path matches exactly", () => {
    (usePathname as jest.Mock).mockReturnValue("/about");
    render(<NavBar />);
    const aboutLinks = screen.getAllByText("About me");
    aboutLinks.forEach((link) => {
      expect(link.className).toContain("active");
    });
  });

  it("should not apply active class for item without activePattern when path does not match", () => {
    (usePathname as jest.Mock).mockReturnValue("/not-matching");
    render(<NavBar />);
    const aboutLinks = screen.getAllByText("About me");
    aboutLinks.forEach((link) => {
      expect(link.className).not.toContain("active");
    });
  });
});
