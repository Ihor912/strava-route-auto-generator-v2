import { render, screen } from "@testing-library/react";
import { NavLinks } from "./nav-links";

describe("NavLinks", () => {
  it("renders all three links", () => {
    render(<NavLinks />);
    expect(screen.getByText("Heatmap")).toBeDefined();
    expect(screen.getByText("Activities")).toBeDefined();
    expect(screen.getByText("Saved Routes")).toBeDefined();
  });

  it("highlights the correct link based on the pathname", () => {
    const { container } = render(<NavLinks />);
    expect(container.getElementsByClassName("bg-gray-600").length).toBe(0);
  });
});
