import { render } from "@testing-library/react";
import { ReduxProvider } from "./redux-provider";

describe("ReduxProvider", () => {
  it("should render children components wrapped with ReduxProvider", () => {
    const children = <p>Hello, world!</p>;
    const { getByText } = render(<ReduxProvider>{children}</ReduxProvider>);
    expect(getByText("Hello, world!")).toBeDefined();
  });

  it("should render null if children is not provided", () => {
    const children = "";
    const { container } = render(<ReduxProvider>{children}</ReduxProvider>);
    expect(container.firstChild).toBeNull();
  });
});
