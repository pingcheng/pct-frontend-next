import { render, screen } from "@testing-library/react";
import { DataRow } from "@/components/DataRow/DataRow";

describe("test <DataRow />", () => {
  const defaultLabel = "test label";
  const defaultValue = "This is default value";

  it("should match snapshot", () => {
    const { container } = render(
      <DataRow label={defaultLabel}>{defaultValue}</DataRow>,
    );
    expect(container).toMatchSnapshot();
  });

  it("should contain label as all upper case", () => {
    render(<DataRow label={defaultLabel}>{defaultValue}</DataRow>);
    expect(screen.getByText(defaultLabel.toUpperCase())).toBeInTheDocument();
  });

  it("should contain value as text", () => {
    render(<DataRow label={defaultLabel}>{defaultValue}</DataRow>);
    expect(screen.getByText(defaultValue)).toBeInTheDocument();
  });
});
