import { Skeleton } from "@/components/ui/skeleton";

export function UserItemSkeleton() {
  return (
    <div className="flex items-center rounded-md p-2">
      <div className="relative">
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
      <div className="ml-3 flex-1">
        <div className="flex justify-between gap-1 flex-col">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    </div>
  );
}
