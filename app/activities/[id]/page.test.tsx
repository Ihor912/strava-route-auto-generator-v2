import { useActivitiesFetching } from "@/app/hooks/useActivitiesFetching";
import { ProvidersWrapper } from "@/app/providers-wrapper";
import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";
import Page from "./page";

jest.mock("./../../hooks/useActivitiesFetching");
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
        <Page params={{ id: 1 }} />
      </ProvidersWrapper>,
    );
  });

  test("renders correct activity name", () => {
    render(
      <ProvidersWrapper>
        <Page params={{ id: 1 }} />
      </ProvidersWrapper>,
    );
    const activityNameElement = screen.getByText("My Activity Activity 1");
    expect(activityNameElement).not.toBeNull();
  });

  test("does not render activity name if activities data is fetching", () => {
    mockedUseActivitiesFetching.mockReturnValue({
      ...defaultActivitiesState,
      activitiesLoading: true,
    });

    render(<Page params={{ id: 1 }} />);
    const activityNameElement = screen.queryByText("My Activity Activity 1");
    expect(activityNameElement).toBeNull();
  });

  test("does not render activity name if activity is not found", () => {
    render(<Page params={{ id: 3 }} />);
    const activityNameElement = screen.queryByText("My Activity Activity 1");
    expect(activityNameElement).toBeNull();
  });
});
