import { QueryClient, QueryClientConfig } from "@tanstack/react-query"

const queryClientOption: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
}

export const queryClient = new QueryClient(queryClientOption)
