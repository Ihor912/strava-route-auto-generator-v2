import { renderHook } from "@testing-library/react";
import { authenticate } from "../api/api";
import { useStravaAuthQuery } from "./useAuthTokenManager";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));
jest.mock("../api/api");

describe("useStravaAuthQuery", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should not fetch authentication data when tokenExpired is false", () => {
    const tokenExpired = false;
    renderHook(() => useStravaAuthQuery(tokenExpired));
    expect(authenticate).not.toHaveBeenCalled();
  });
});
