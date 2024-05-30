import { render } from "@testing-library/react";
import { ProvidersWrapper } from "./providers-wrapper";

describe("ProvidersWrapper", () => {
  it("should render children components wrapped with ReduxProvider and QueryProvider", () => {
    const children = <p>Hello, world!</p>;
    const { getByText } = render(
      <ProvidersWrapper>{children}</ProvidersWrapper>,
    );
    expect(getByText("Hello, world!")).toBeDefined();
  });

  it("should render null if children is not provided", () => {
    const children = "";
    const { container } = render(
      <ProvidersWrapper>{children}</ProvidersWrapper>,
    );
    expect(container.firstChild).toBeNull();
  });
});
