import { toast } from "react-toastify";

export const showErrorToast = (message: string) => {
  debugger;
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
  });
};
