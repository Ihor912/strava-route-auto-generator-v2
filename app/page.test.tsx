import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import React from "react";
import { useActivitiesFetching } from "./hooks/useActivitiesFetching";
import { useSavedRoutesFetching } from "./hooks/useSavedRoutesFetching";
import Home from "./page";

jest.mock("./hooks/useActivitiesFetching");
jest.mock("./hooks/useSavedRoutesFetching");

const mockedUseActivitiesFetching = mocked(useActivitiesFetching);
const mockeduseSavedRoutesFetching = mocked(useSavedRoutesFetching);

jest.mock("react", () => {
  const originalReact = jest.requireActual("react");
  return {
    ...originalReact,
    useState: jest.fn(),
  };
});

describe("Home", () => {
  beforeEach(() => {
    mockedUseActivitiesFetching.mockReturnValue({
      activities: [],
      activitiesLoading: false,
    });
    mockeduseSavedRoutesFetching.mockReturnValue({
      routes: [],
      routesLoading: false,
      currentUserLoading: false,
    });
    const currentLocation = [1, 1];
    jest
      .spyOn(React, "useState")
      .mockReturnValueOnce([currentLocation, jest.fn()]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading spinner when activities and routes are loading", () => {
    mockedUseActivitiesFetching.mockReturnValue({
      activities: [],
      activitiesLoading: true,
    });
    mockeduseSavedRoutesFetching.mockReturnValue({
      routes: [],
      routesLoading: true,
      currentUserLoading: false,
    });
    render(<Home />);
    expect(screen.getByTestId("loading-spinner")).not.toBeNull();
  });

  test("renders loading spinner when current user data is fetching", () => {
    mockeduseSavedRoutesFetching.mockReturnValue({
      routes: [],
      routesLoading: true,
      currentUserLoading: false,
    });
    render(<Home />);
    expect(screen.getByTestId("loading-spinner")).not.toBeNull();
  });
});
