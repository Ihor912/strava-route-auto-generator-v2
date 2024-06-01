"use client";

import { ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { ReduxProvider } from "./redux-provider";

/**
 * Wraps the provided children components with ReduxProvider and QueryProvider.
 *
 * @param {ReactNode} children - The components to be wrapped.
 * @return {ReactElement} The wrapped components.
 */
export const ProvidersWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <ReduxProvider>
      <QueryProvider>{children}</QueryProvider>
    </ReduxProvider>
  );
};
