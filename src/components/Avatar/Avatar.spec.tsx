import { render, screen } from "@testing-library/react";
import { Avatar } from "@/components/Avatar";

describe("test <Avatar />", () => {
  it("should match snapshot", () => {
    const { container } = render(<Avatar width={100} height={100} />);
    expect(container).toMatchSnapshot();
  });

  it("should have image defined", () => {
    render(<Avatar width={100} height={100} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should have correct width and height", () => {
    render(<Avatar width={100} height={100} />);
    expect(screen.getByRole("img")).toHaveAttribute("width", "100");
    expect(screen.getByRole("img")).toHaveAttribute("height", "100");
  });
});
