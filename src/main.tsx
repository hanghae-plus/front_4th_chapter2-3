import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import {
  matchQuery,
  MutationCache,
  MutationMeta,
  QueryClient,
  QueryClientProvider,
  QueryKey,
} from '@tanstack/react-query'

type QueryKeysReturnType = readonly (string | number | readonly (string | number)[])[]

declare module '@tanstack/react-query' {
  interface CustomMutationMeta extends MutationMeta {
    invalidates?: QueryKeysReturnType
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 창이 다시 포커스될 때 refetch 여부
      retry: 1, // 실패 시 재시도 횟수
      staleTime: 5 * 60 * 1000, // 데이터가 오래되기 전까지의 시간(ms)
    },
  },
  mutationCache: new MutationCache({
    onSuccess: (_, __, ___, mutation) => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(mutation?.options?.meta?.invalidates) &&
          mutation.options.meta.invalidates.some((queryKey) => matchQuery({ queryKey: queryKey as QueryKey }, query)),
      })
    },
  }),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
