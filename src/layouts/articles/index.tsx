import { CategorySearchFilterBar } from "@/components/features/articles/categorySearchFilterBar";
import { Pagination } from "@/components/features/pagination";
import { Posts } from "@/components/Posts";
import { FeaturedPost } from "@/components/Posts/FeaturedPost";
import { Body } from "@/components/ui/body";
import { Hero } from "@/components/ui/hero";

import { ArticlesLayoutProps } from "./types";

const ArticlesLayout = async ({
  intro,
  posts,
  totalPages,
  page,
  category,
}: ArticlesLayoutProps) => {
  // Surface a pinned/featured article in its own standout row on the first
  // page. It's removed from the grid below to avoid showing it twice.
  const featured =
    page === 1 ? posts.find((post) => post.data.featured) : undefined;
  const gridPosts = featured
    ? posts.filter((post) => post.id !== featured.id)
    : posts;

  return (
    <>
      <Hero heading={<b>Knowledge Hub</b>} intro={intro} />
      <Body spacing="none" background="blue">
        <CategorySearchFilterBar activeCategory={category} />
        {posts.length > 0 ? (
          <>
            {featured ? <FeaturedPost post={featured} /> : null}
            {gridPosts.length > 0 ? <Posts posts={gridPosts} /> : null}
          </>
        ) : (
          <p>No articles available.</p>
        )}
      </Body>
      {totalPages && page ? (
        <Pagination pages={totalPages} currentPage={page} />
      ) : null}
    </>
  );
};

export default ArticlesLayout;
