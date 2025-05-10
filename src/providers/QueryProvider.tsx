import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Crie uma instância do cliente fora do componente para evitar recriações
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      gcTime: 1000 * 60 * 10, // 10 minutos
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
