import { render, screen } from "@testing-library/react";
import { Heading } from "@/components/Heading";

describe("test <Heading />", () => {
  it("should match snapshot", () => {
    const { container } = render(<Heading text="Test Heading" />);
    expect(container).toMatchSnapshot();
  });

  it("should render the provided text", () => {
    render(<Heading text="Test Heading" />);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
  });

  it("should have default left alignment", () => {
    render(<Heading text="Test Heading" />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).not.toHaveClass("center");
    expect(heading).not.toHaveClass("right");
  });

  it("should apply center alignment when specified", () => {
    render(<Heading text="Test Heading" align="center" />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass("center");
  });

  it("should apply right alignment when specified", () => {
    render(<Heading text="Test Heading" align="right" />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass("right");
  });

  it("should apply custom className when provided", () => {
    render(<Heading text="Test Heading" className="custom-class" />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass("custom-class");
  });
});
