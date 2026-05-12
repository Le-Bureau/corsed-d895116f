import { Skeleton } from "@/components/ui/skeleton";

const BlogFeaturedSkeleton = () => (
  <div className="featured" aria-hidden>
    <div className="featured__cover">
      <Skeleton className="w-full h-full" />
    </div>
    <div className="featured__content">
      <Skeleton className="h-6 w-24 mb-4 rounded-full" />
      <Skeleton className="h-9 w-[95%] mb-3" />
      <Skeleton className="h-9 w-[70%] mb-5" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-[90%] mb-2" />
      <Skeleton className="h-4 w-[75%] mb-6" />
      <Skeleton className="h-5 w-2/3" />
    </div>
  </div>
);

export default BlogFeaturedSkeleton;
