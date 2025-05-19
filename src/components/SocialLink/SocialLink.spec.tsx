import { render, screen } from "@testing-library/react";
import { SocialLink } from "./SocialLink";

describe("test <SocialLink />", () => {
  const mockIcon = <span data-testid="icon">Icon</span>;

  it("should match snapshot for external link", () => {
    const { container } = render(
      <SocialLink href="https://example.com" label="Example" icon={mockIcon} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot for internal link", () => {
    const { container } = render(
      <SocialLink href="/about" label="About" icon={mockIcon} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should render external link with correct attributes", () => {
    render(
      <SocialLink href="https://example.com" label="Example" icon={mockIcon} />
    );

    const link = screen.getByText(/Example/i);
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener");
  });

  it("should render internal link using Next.js Link component", () => {
    render(<SocialLink href="/about" label="About" icon={mockIcon} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/about");
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });

  it("should render the icon and label correctly", () => {
    render(
      <SocialLink href="https://example.com" label="Example" icon={mockIcon} />
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("Example")).toBeInTheDocument();
  });

  it("should correctly identify external links", () => {
    render(
      <SocialLink
        href="https://example.com"
        label="HTTPS Example"
        icon={mockIcon}
      />
    );
    expect(screen.getByText(/HTTPS Example/i)).toHaveAttribute(
      "target",
      "_blank"
    );

    render(
      <SocialLink
        href="http://example.org"
        label="HTTP Example"
        icon={mockIcon}
      />
    );
    expect(screen.getByText(/HTTP Example/i)).toHaveAttribute(
      "target",
      "_blank"
    );
  });
});
