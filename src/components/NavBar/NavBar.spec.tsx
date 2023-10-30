import { render } from "@testing-library/react";
import { NavBar } from "@/components/NavBar/NavBar";

describe("test <NavBar />", () => {
  it("should match the snapshot", () => {
    const { container } = render(<NavBar />);
    expect(container).toMatchSnapshot();
  });
});
