import { Skeleton } from "@mui/material";

interface RepositoryCardSkeletonProps {
  count?: number;
}

export function RepositoryCardSkeleton({
  count = 4,
}: RepositoryCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="border bg-white rounded-xl p-7 flex justify-between items-start"
        >
          <div className="flex flex-col gap-[10px] flex-1">
            <div className="flex gap-[10px] items-center">
              <Skeleton variant="text" width={220} height={28} />
              <Skeleton
                variant="rounded"
                width={70}
                height={24}
                sx={{ borderRadius: 9999 }}
              />
            </div>
            <Skeleton variant="text" width="55%" height={20} />
          </div>
          <Skeleton variant="circular" width={18} height={18} />
        </div>
      ))}
    </>
  );
}
