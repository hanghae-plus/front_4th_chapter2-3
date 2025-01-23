import { QueryClient, UseMutationOptions } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

export type ApiResponseType<TFunction extends (...args: any[]) => Promise<any>> = Awaited<
  ReturnType<TFunction>
>;

export type MutationOptions<TFunction extends (...args: any[]) => Promise<any>> =
  UseMutationOptions<ApiResponseType<TFunction>, Error, Parameters<TFunction>[0]>;
