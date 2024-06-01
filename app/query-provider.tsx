"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

/**
 * A QueryProvider component that wraps the provided children with a QueryClient.
 *
 * @param {ReactNode} props.children - The children components to be wrapped by the QueryProvider.
 * @return {JSX.Element} with the wrapped provided children.
 */
export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [client] = useState<QueryClient>(new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
