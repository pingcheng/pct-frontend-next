import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Chip } from "./Chip";

describe("Chip", () => {
  it("renders the chip content", () => {
    render(<Chip>Test Chip</Chip>);
    expect(screen.getByText("Test Chip")).toBeInTheDocument();
  });

  it("applies the correct classes", () => {
    render(<Chip>Styled Chip</Chip>);
    const chip = screen.getByText("Styled Chip");
    expect(chip).toHaveClass("bg-gray-200");
    expect(chip).toHaveClass("dark:bg-gray-700");
    expect(chip).toHaveClass("text-xs");
    expect(chip).toHaveClass("px-2");
    expect(chip).toHaveClass("py-1");
    expect(chip).toHaveClass("rounded-full");
    expect(chip).toHaveClass("cursor-pointer");
  });

  it("accepts additional className prop", () => {
    render(<Chip className="extra-class">Extra</Chip>);
    expect(screen.getByText("Extra")).toHaveClass("extra-class");
  });

  it("changes style on hover (visual test)", async () => {
    render(<Chip>Hover Me</Chip>);
    const chip = screen.getByText("Hover Me");
    // This is a visual style, so we just check the class exists for hover
    expect(chip.className).toMatch(/hover:bg-gray-300/);
    expect(chip.className).toMatch(/dark:hover:bg-gray-600/);
  });
});
