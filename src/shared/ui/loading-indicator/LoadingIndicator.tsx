import { LoadingIndicatorProps } from "./types"

export const LoadingIndicator = ({ children = "로딩 중...", ...props }: LoadingIndicatorProps) => {
  return (
    <div className={"flex justify-center p-4"} {...props}>
      {children}
    </div>
  )
}
