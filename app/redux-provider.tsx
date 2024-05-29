"use client";

import { Provider } from "react-redux";
import store from "./store";

/**
 * A Redux Provider component that wraps the provided children with the Redux store.
 *
 * @param {ReactNode} children - The children components to be wrapped by the Redux Provider.
 * @return {JSX.Element} with the wrapped provided children.
 */
export const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
