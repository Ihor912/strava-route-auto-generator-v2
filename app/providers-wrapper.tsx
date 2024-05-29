"use client";

import { QueryProvider } from "./query-provider";
import { ReduxProvider } from "./redux-provider";

/**
 * Wraps the provided children components with ReduxProvider and QueryProvider.
 *
 * @param {ReactNode} children - The components to be wrapped.
 * @return {JSX.Element} The wrapped components.
 */
export const ProvidersWrapper = ({ children }) => {
  return (
    <ReduxProvider>
      <QueryProvider>{children}</QueryProvider>
    </ReduxProvider>
  );
};
