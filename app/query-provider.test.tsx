import { render } from "@testing-library/react";
import { QueryProvider } from "./query-provider";

describe("QueryProvider", () => {
  it("should render children components wrapped with QueryProvider", () => {
    const children = <p>Hello, world!</p>;
    const { getByText } = render(<QueryProvider>{children}</QueryProvider>);
    expect(getByText("Hello, world!")).toBeDefined();
  });

  it("should render null if children is not provided", () => {
    const children = "";
    const { container } = render(<QueryProvider>{children}</QueryProvider>);
    expect(container.firstChild).toBeNull();
  });
});
