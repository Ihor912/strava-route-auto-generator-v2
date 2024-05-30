import { useSavedRoutesFetching } from "@/app/hooks/useSavedRoutesFetching";
import { ProvidersWrapper } from "@/app/providers-wrapper";
import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import Page from "./page";

jest.mock("./../hooks/useSavedRoutesFetching");
const mockeduseSavedRoutesFetching = mocked(useSavedRoutesFetching);

const defaultSavedRoutesState = {
  routes: [
    { id: 1, name: "Route 1", positions: [] },
    { id: 2, name: "Route 2", positions: [] },
  ],
  routesLoading: false,
  currentUserLoading: false,
};

describe("Page", () => {
  beforeEach(() => {
    mockeduseSavedRoutesFetching.mockReturnValue(defaultSavedRoutesState);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(
      <ProvidersWrapper>
        <Page />
      </ProvidersWrapper>,
    );
  });

  test("renders routes", () => {
    render(
      <ProvidersWrapper>
        <Page />
      </ProvidersWrapper>,
    );
    const activityNameElement = screen.getByText("Route 1");
    expect(activityNameElement).not.toBeNull();
  });

  test("does not render routes if current user data is fetching", () => {
    mockeduseSavedRoutesFetching.mockReturnValue({
      ...defaultSavedRoutesState,
      currentUserLoading: true,
      routesLoading: false,
    });

    render(<Page />);
    const activityNameElement = screen.queryByText("Route 1");
    expect(activityNameElement).toBeNull();
  });

  test("does not render routes if saved routes data is fetching", () => {
    mockeduseSavedRoutesFetching.mockReturnValue({
      ...defaultSavedRoutesState,
      currentUserLoading: false,
      routesLoading: true,
    });

    render(<Page />);
    const activityNameElement = screen.queryByText("Route 1");
    expect(activityNameElement).toBeNull();
  });
});
