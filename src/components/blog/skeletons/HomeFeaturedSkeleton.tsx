import { Skeleton } from "@/components/ui/skeleton";

const HomeFeaturedSkeleton = () => (
  <div className="home-featured" aria-hidden>
    <div className="home-featured__cover">
      <Skeleton className="w-full h-full" />
    </div>
    <div className="home-featured__content">
      <Skeleton className="h-6 w-24 mb-4 rounded-full" />
      <Skeleton className="h-8 w-[90%] mb-3" />
      <Skeleton className="h-8 w-[60%] mb-5" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-[80%] mb-6" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  </div>
);

export default HomeFeaturedSkeleton;
