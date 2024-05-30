import { useSavedRoutesFetching } from "@/app/hooks/useSavedRoutesFetching";
import { ProvidersWrapper } from "@/app/providers-wrapper";
import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import Page from "./page";

jest.mock("./../../hooks/useSavedRoutesFetching");
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
        <Page params={{ id: 1 }} />
      </ProvidersWrapper>,
    );
  });

  test("renders correct route name", () => {
    render(
      <ProvidersWrapper>
        <Page params={{ id: 1 }} />
      </ProvidersWrapper>,
    );
    const activityNameElement = screen.getByText("My Saved Route Route 1");
    expect(activityNameElement).not.toBeNull();
  });

  test("does not render route name if current user data is fetching", () => {
    mockeduseSavedRoutesFetching.mockReturnValue({
      ...defaultSavedRoutesState,
      currentUserLoading: true,
      routesLoading: false,
    });

    render(<Page params={{ id: 1 }} />);
    const activityNameElement = screen.queryByText("My Saved Route Route 1");
    expect(activityNameElement).toBeNull();
  });

  test("does not render route name if saved routes data is fetching", () => {
    mockeduseSavedRoutesFetching.mockReturnValue({
      ...defaultSavedRoutesState,
      currentUserLoading: false,
      routesLoading: true,
    });

    render(<Page params={{ id: 1 }} />);
    const activityNameElement = screen.queryByText("My Saved Route Route 1");
    expect(activityNameElement).toBeNull();
  });

  test("does not render route name if activity is not found", () => {
    render(<Page params={{ id: 3 }} />);
    const activityNameElement = screen.queryByText("My Saved Route Route 1");
    expect(activityNameElement).toBeNull();
  });
});
