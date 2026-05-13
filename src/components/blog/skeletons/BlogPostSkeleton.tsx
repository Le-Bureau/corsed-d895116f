import { Skeleton } from "@/components/ui/skeleton";

const BlogPostSkeleton = () => (
  <div className="blog-scope" aria-hidden>
    <div className="article-hero" style={{ minHeight: 460 }}>
      {/* Category pill */}
      <Skeleton className="h-6 w-28 mb-5 rounded-full mx-auto" />
      {/* Title — 2 lines at h-12 to match Fraunces clamp(...) */}
      <Skeleton className="h-12 w-[80%] mb-3 mx-auto" />
      <Skeleton className="h-12 w-[60%] mb-6 mx-auto" />
      {/* Excerpt — 2 lines */}
      <Skeleton className="h-5 w-[70%] mb-2 mx-auto" />
      <Skeleton className="h-5 w-[55%] mb-8 mx-auto" />
      {/* Meta row: 40px avatar + author/date + share buttons */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-28" />
      </div>
      <div className="flex items-center justify-center gap-2 mt-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
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
