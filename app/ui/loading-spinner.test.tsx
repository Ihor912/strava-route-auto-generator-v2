import { render } from "@testing-library/react";
import { LoadingSpinner } from "./loading-spinner";

describe("LoadingSpinner", () => {
  it("renders without crashing", () => {
    render(<LoadingSpinner />);
  });

  it("renders a div with the correct data-testid", () => {
    const { getByTestId } = render(<LoadingSpinner />);
    expect(getByTestId("loading-spinner")).toBeDefined();
  });

  it("renders a div with the correct class name", () => {
    const { container } = render(<LoadingSpinner />);
    expect(
      container.getElementsByClassName(
        "flex justify-center items-center h-screen",
      ).length,
    ).toBe(1);
  });

  it("renders a div with a child div with the correct class name", () => {
    const { container } = render(<LoadingSpinner />);
    expect(
      container.getElementsByClassName(
        "animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900",
      ).length,
    ).toBe(1);
  });
});
