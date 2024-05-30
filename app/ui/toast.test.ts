import { toast } from "react-toastify";
import { showErrorToast } from "../ui/toast";

jest.mock("react-toastify");

describe("showErrorToast", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should display an error toast with the provided message", () => {
    const message = "An error occurred";
    showErrorToast(message);
    expect(toast.error).toHaveBeenCalledWith(message, {
      position: "top-right",
      autoClose: 5000,
    });
  });
});
