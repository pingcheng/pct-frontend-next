import { render, screen } from "@testing-library/react";
import FixedWidthLayout from "./layout";
import React from "react";

// Mock the NavBar and Footer components
jest.mock("@/components/NavBar/NavBar", () => ({
  NavBar: () => <div data-testid="navbar">NavBar Component</div>,
}));

jest.mock("@/components/Footer", () => ({
  Footer: () => <div data-testid="footer">Footer Component</div>,
}));

describe("FixedWidthLayout", () => {
  test("should match snapshot", () => {
    const { container } = render(
      <FixedWidthLayout>
        <div data-testid="child-content">Test Content</div>
      </FixedWidthLayout>
    );
    expect(container).toMatchSnapshot();
  });

  test("should render NavBar component", () => {
    render(
      <FixedWidthLayout>
        <div>Test Content</div>
      </FixedWidthLayout>
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  test("should render Footer component", () => {
    render(
      <FixedWidthLayout>
        <div>Test Content</div>
      </FixedWidthLayout>
    );

    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  test("should render children content", () => {
    render(
      <FixedWidthLayout>
        <div data-testid="child-content">Test Content</div>
      </FixedWidthLayout>
    );

    expect(screen.getByTestId("child-content")).toBeInTheDocument();
    expect(screen.getByTestId("child-content")).toHaveTextContent(
      "Test Content"
    );
  });

  test("should have the fixed-container class on the main content", () => {
    render(
      <FixedWidthLayout>
        <div>Test Content</div>
      </FixedWidthLayout>
    );

    const container = screen.getByText("Test Content").parentElement;
    expect(container).toHaveClass("fixed-container");
    expect(container).toHaveClass("pt-2");
  });
});
