import { toast } from "react-toastify";

/**
 * Displays an error toast with the provided message.
 *
 * @param {string} message.
 * @return {void}
 */
export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
  });
};
