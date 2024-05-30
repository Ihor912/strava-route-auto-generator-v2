import { render, screen } from "@testing-library/react";
import RootLayout from "./layout";

describe("RootLayout", () => {
  it("renders children", () => {
    const children = <p>Hello, world!</p>;
    const { getByText } = render(<RootLayout>{children}</RootLayout>);
    expect(getByText("Hello, world!")).toBeDefined();
  });

  it("renders NavLinks component", () => {
    const children = <p>Hello, world!</p>;
    render(<RootLayout>{children}</RootLayout>);
    expect(screen.getByTestId("nav-bar")).toBeDefined();
  });
});
