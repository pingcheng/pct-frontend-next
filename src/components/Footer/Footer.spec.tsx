import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/Footer";
import { profile } from "@/data/profile";

describe("test <Footer />", () => {
  it("should match snapshot", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it("should display the profile full name", () => {
    render(<Footer />);
    expect(screen.getByText(new RegExp(profile.fullName))).toBeInTheDocument();
  });

  it("should contain heart icon", () => {
    render(<Footer />);
    // The SVG role is "img" with the heart icon
    const heartIcon = document.querySelector(".text-red-400 svg");
    expect(heartIcon).toBeInTheDocument();
  });
});
