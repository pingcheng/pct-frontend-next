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
    const menu = screen.getByRole("mobile-nav-menu");
    // Initially, the mobile menu should be collapsed (not expanded)
    expect(menu.className).not.toMatch(/expanded/);
    // Click to show
    fireEvent.click(toggleButton);
    expect(menu.className).toMatch(/expanded/);
    // Click again to hide
    fireEvent.click(toggleButton);
    expect(menu.className).not.toMatch(/expanded/);
  });

  it("should display the correct SVG icon based on mobile menu visibility", () => {
    render(<NavBar />);
    const toggleButton = screen.getByRole("mobile-toggle");
    // Initially, hamburger icon should be visible, close icon hidden
    const hamburgerIcon = toggleButton.querySelector("svg:nth-of-type(1)");
    const closeIcon = toggleButton.querySelector("svg:nth-of-type(2)");
    expect(hamburgerIcon).not.toHaveClass("hidden");
    expect(closeIcon).toHaveClass("hidden");

    // Click to show mobile menu (should show close icon, hide hamburger)
    fireEvent.click(toggleButton);
    expect(hamburgerIcon).toHaveClass("hidden");
    expect(closeIcon).not.toHaveClass("hidden");

    // Click again to hide mobile menu (should show hamburger icon, hide close)
    fireEvent.click(toggleButton);
    expect(hamburgerIcon).not.toHaveClass("hidden");
    expect(closeIcon).toHaveClass("hidden");
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

describe("Mobile menu interaction", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should close the mobile menu when a menu item is clicked", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    render(<NavBar />);
    const toggleButton = screen.getByRole("mobile-toggle");
    const menu = screen.getByRole("mobile-nav-menu");
    // Open the mobile menu
    fireEvent.click(toggleButton);
    expect(menu.className).toMatch(/expanded/);
    // Click a menu item
    const homeLink = screen.getAllByText("Home")[1]; // mobile menu is rendered after desktop
    fireEvent.click(homeLink);
    // Menu should be closed
    expect(menu.className).not.toMatch(/expanded/);
  });
});

describe("Mobile menu dynamic max-height", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should set max-height to scrollHeight when opening and 0px when closing", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    render(<NavBar />);
    const toggleButton = screen.getByRole("mobile-toggle");
    const menu = screen.getByRole("mobile-nav-menu");
    // Mock scrollHeight
    Object.defineProperty(menu, "scrollHeight", {
      value: 123,
      configurable: true,
    });
    // Initially closed
    expect(menu.style.maxHeight).toBe("0px");
    // Open the menu
    fireEvent.click(toggleButton);
    expect(menu.style.maxHeight).toBe("123px");
    // Close the menu
    fireEvent.click(toggleButton);
    expect(menu.style.maxHeight).toBe("0px");
  });
});
