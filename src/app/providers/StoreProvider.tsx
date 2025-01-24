import { ReactNode } from "react"
import { Provider } from "jotai"

type StoreProviderProps = {
  children: ReactNode
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  return <Provider>{children}</Provider>
}
