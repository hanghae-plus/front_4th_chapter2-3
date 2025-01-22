import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  client: QueryClient;
};

export const QueryProvider = ({ client, children }: Props) => (
  <QueryClientProvider client={client}>
    {children}
    <ReactQueryDevtools />
  </QueryClientProvider>
);
