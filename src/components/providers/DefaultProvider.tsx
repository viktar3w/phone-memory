"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";

const client = new QueryClient();
type DefaultProviderProps = {
  children: ReactNode;
};
const DefaultProvider = ({ children }: DefaultProviderProps) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default DefaultProvider;
