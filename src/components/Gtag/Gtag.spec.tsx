import { render } from "@testing-library/react";
import Gtag from "./index";
import Script from "next/script";

// Mock the Next.js Script component
jest.mock("next/script", () => {
  return jest.fn().mockImplementation(({ children, src, id }) => {
    return children ? (
      <script id={id} dangerouslySetInnerHTML={{ __html: children }} />
    ) : (
      <script defer src={src} />
    );
  });
});

describe("test <Gtag />", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetAllMocks();
    // Clear the env variable before each test
    delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  });

  afterAll(() => {
    // Restore the env
    process.env = originalEnv;
  });

  test("should render nothing when GA_MEASUREMENT_ID is not set", () => {
    const { container } = render(<Gtag />);
    expect(container.firstChild).toBeNull();
    expect(Script).not.toHaveBeenCalled();
  });

  test("should render GA scripts when GA_MEASUREMENT_ID is set", () => {
    // Set the env variable
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "G-12345";

    const { container } = render(<Gtag />);

    // Check if Script component was called twice (for the two scripts)
    expect(Script).toHaveBeenCalledTimes(2);

    // Snapshot test to ensure consistent rendering
    expect(container).toMatchSnapshot();
  });
});
