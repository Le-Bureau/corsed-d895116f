import { Skeleton } from "@/components/ui/skeleton";

const BlogCardSkeleton = () => (
  <div className="card" aria-hidden>
    <div className="card__cover">
      <Skeleton className="w-full h-full" />
    </div>
    <div className="card__body">
      <Skeleton className="h-5 w-20 mb-3 rounded-full" />
      <Skeleton className="h-5 w-[90%] mb-2" />
      <Skeleton className="h-5 w-[70%] mb-4" />
      <Skeleton className="h-4 w-full mb-1.5" />
      <Skeleton className="h-4 w-[85%] mb-4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
);

export default BlogCardSkeleton;
