import { useActivitiesFetching } from "@/app/hooks/useActivitiesFetching";
import { ProvidersWrapper } from "@/app/providers-wrapper";
import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import Page from "./page";

jest.mock("./../hooks/useActivitiesFetching");
const mockedUseActivitiesFetching = mocked(useActivitiesFetching);

const defaultActivitiesState = {
  activities: [
    { id: 1, name: "Activity 1", positions: [] },
    { id: 2, name: "Activity 2", positions: [] },
  ],
  activitiesLoading: false,
};

describe("Page", () => {
  beforeEach(() => {
    mockedUseActivitiesFetching.mockReturnValue(defaultActivitiesState);
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

  test("renders activities", () => {
    render(
      <ProvidersWrapper>
        <Page />
      </ProvidersWrapper>,
    );
    const activityElement = screen.getByText("Activity 1");
    expect(activityElement).not.toBeNull();
  });

  test("does not render activities if activities data is fetching", () => {
    mockedUseActivitiesFetching.mockReturnValue({
      ...defaultActivitiesState,
      activitiesLoading: true,
    });

    render(<Page />);
    const activityNameElement = screen.queryByText("Activity 1");
    expect(activityNameElement).toBeNull();
  });
});
