import { render, screen } from "@testing-library/react";
import { ScreenshotSection } from "./ScreenshotSection";

// Mock the next/image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
  }: {
    src: string;
    alt: string;
    fill?: boolean;
  }) => {
    return <img src={src} alt={alt} data-testid="next-image" />;
  },
}));

describe("test <ScreenshotSection />", () => {
  const mockImages = [
    "/images/screenshot1.png",
    "/images/screenshot2.png",
    "/images/screenshot3.png",
    "/images/screenshot4.png",
  ];

  it("should match snapshot", () => {
    const { container } = render(<ScreenshotSection images={mockImages} />);
    expect(container).toMatchSnapshot();
  });

  it("should render empty state message when images array is empty", () => {
    const { getByText } = render(<ScreenshotSection images={[]} />);
    expect(getByText("Screenshots")).toBeInTheDocument();
    expect(getByText("No screenshots available for this project.")).toBeInTheDocument();
  });

  it("should render the 'Screenshots' heading", () => {
    render(<ScreenshotSection images={mockImages} />);
    expect(screen.getByText("Screenshots")).toBeInTheDocument();
  });

  it("should render all provided images", () => {
    render(<ScreenshotSection images={mockImages} />);
    const images = screen.getAllByTestId("next-image");
    expect(images.length).toBe(mockImages.length);

    // Verify all image sources are correct
    mockImages.forEach((src) => {
      const imageWithSrc = images.find(
        (img) => img.getAttribute("src") === src
      );
      expect(imageWithSrc).toBeInTheDocument();
    });
  });

  it("should distribute images across three columns", () => {
    render(<ScreenshotSection images={mockImages} />);

    // The component should create 3 column divs
    const columns = screen
      .getAllByRole("generic")
      .filter((element) =>
        element.parentElement?.className.includes("portfolioScreenshots")
      );

    expect(columns.length).toBe(3);

    // First column should have 2 images (for 4 total images)
    expect(
      columns[0].querySelectorAll('[data-testid="next-image"]').length
    ).toBe(2);

    // Second column should have 1 image
    expect(
      columns[1].querySelectorAll('[data-testid="next-image"]').length
    ).toBe(1);

    // Third column should have 1 image
    expect(
      columns[2].querySelectorAll('[data-testid="next-image"]').length
    ).toBe(1);
  });
});
