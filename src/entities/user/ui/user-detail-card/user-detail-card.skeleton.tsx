import { Skeleton } from "@/shared/ui/skeleton"

function UserDetailCardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="w-24 h-24 rounded-full mx-auto" />
      <Skeleton className="h-7 w-40 mx-auto" />
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="w-10 h-5" />
          <Skeleton className="w-32 h-5" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-10 h-5" />
          <Skeleton className="w-16 h-5" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-14 h-5" />
          <Skeleton className="w-40 h-5" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-16 h-5" />
          <Skeleton className="w-32 h-5" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-10 h-5" />
          <Skeleton className="w-48 h-5" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-10 h-5" />
          <Skeleton className="w-40 h-5" />
        </div>
      </div>
    </div>
  )
}

export { UserDetailCardSkeleton }
