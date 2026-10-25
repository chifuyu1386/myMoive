import { Skeleton } from "../../../components/ui/Skeleton";

export const MovieCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <Skeleton className="w-full aspect-2/3 rounded-2xl" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  )
}