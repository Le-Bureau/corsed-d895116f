import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import StaggerChildren, { fadeUpItem } from "@/components/animations/StaggerChildren";
import BlogCard from "@/components/blog/BlogCard";
import HomeFeaturedCard from "@/components/blog/HomeFeaturedCard";
import { BLOG_POSTS } from "@/data/mockBlogData";
import { getHomeBlogSelection } from "@/lib/blogHelpers";

const LatestArticlesSection = () => {
  const { featured, secondary } = getHomeBlogSelection(BLOG_POSTS);

  return (
    <section
      role="region"
      aria-labelledby="latest-articles-title"
      className="blog-scope py-20 md:py-28 bg-[#FCFAF7]"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <StaggerChildren staggerDelay={0.08} className="text-center mb-14 md:mb-16">
          <motion.span
            variants={fadeUpItem}
            className="inline-block font-body text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-5"
          >
            Blog
          </motion.span>
          <motion.h2
            variants={fadeUpItem}
            id="latest-articles-title"
            className="font-display font-medium text-[clamp(34px,4.5vw,52px)] leading-[1.05] tracking-[-0.02em] text-foreground mb-5"
          >
            Le <em className="italic text-primary font-normal">journal</em> de bord
          </motion.h2>
          <motion.p
            variants={fadeUpItem}
            className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Retours de chantiers, expertises drone et actualités du secteur.
          </motion.p>
        </StaggerChildren>

        <StaggerChildren staggerDelay={0.08} initialDelay={0.08} className="flex flex-col gap-8">
          <motion.div variants={fadeUpItem}>
            <HomeFeaturedCard post={featured} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            {secondary.map((post) => (
              <motion.div key={post.id} variants={fadeUpItem}>
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUpItem} className="mt-6 md:mt-8 flex justify-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 font-body text-sm font-medium text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
            >
              Tous les articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </StaggerChildren>
      </div>
    </section>
  );
};

export default LatestArticlesSection;
