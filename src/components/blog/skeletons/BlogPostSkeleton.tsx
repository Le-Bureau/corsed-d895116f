import { Skeleton } from "@/components/ui/skeleton";

const BlogPostSkeleton = () => (
  <div className="blog-scope" aria-hidden>
    <div className="article-hero" style={{ paddingTop: 32 }}>
      <Skeleton className="h-6 w-28 mb-5 rounded-full mx-auto" />
      <Skeleton className="h-12 w-[80%] mb-3 mx-auto" />
      <Skeleton className="h-12 w-[60%] mb-6 mx-auto" />
      <Skeleton className="h-5 w-[50%] mb-2 mx-auto" />
      <Skeleton className="h-5 w-[40%] mx-auto" />
    </div>
    <div className="article-cover">
      <div className="article-cover__inner">
        <Skeleton className="w-full aspect-[16/9]" />
      </div>
    </div>
    <div className="article-body-layout">
      <div />
      <div>
        <Skeleton className="h-5 w-full mb-3" />
        <Skeleton className="h-5 w-[95%] mb-3" />
        <Skeleton className="h-5 w-[88%] mb-3" />
        <Skeleton className="h-5 w-[92%] mb-6" />
        <Skeleton className="h-5 w-full mb-3" />
        <Skeleton className="h-5 w-[80%] mb-3" />
        <Skeleton className="h-5 w-[90%] mb-3" />
      </div>
    </div>
  </div>
);

export default BlogPostSkeleton;
