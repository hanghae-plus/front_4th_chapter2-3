import { Skeleton } from "@/shared/ui/skeleton"

function CommentItemSkeleton() {
  return (
    <div className="flex items-center justify-between text-sm border-b pb-1 mt-4">
      <div className="flex items-center space-x-2 overflow-hidden">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="flex items-center space-x-1">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  )
}

export { CommentItemSkeleton }
