import { useQuery } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { useActivitiesQuery } from "./useActivitiesFetching";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));
jest.mock("./useAuthTokenManager");
jest.mock("react-redux");

describe("useActivitiesQuery", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return the correct result when authToken is provided", () => {
    const authToken = "mockAuthToken";
    const mockResult = { data: [{ id: 1, name: "Activity 1" }] };
    (useQuery as jest.Mock).mockReturnValue(mockResult);

    const { result } = renderHook(() => useActivitiesQuery(authToken));

    expect(result.current).toEqual(mockResult);
  });

  test("should return the correct result when authToken is not provided", () => {
    const mockResult = { data: [] };
    (useQuery as jest.Mock).mockReturnValue(mockResult);

    const { result } = renderHook(() => useActivitiesQuery(undefined));

    expect(result.current).toEqual(mockResult);
  });
});
