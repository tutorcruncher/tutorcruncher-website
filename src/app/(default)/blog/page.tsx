import * as prismic from "@prismicio/client";
import { Metadata } from "next/types";
import { createClient } from "prismicio";

import { CategorySearchFilterBar } from "@/components/features/articles/categorySearchFilterBar";
import { LatestPosts } from "@/components/Posts/LatestPosts";
import { Body } from "@/components/ui/body";
import { Hero } from "@/components/ui/hero";
import { formatMetaData } from "@/helpers/metaData";
import { fetchArticles } from "@/lib/prismic/articles";

// The blog landing shows a section per category flagged "Feature on blog
// landing" in Prismic, ordered by the category's `order` field. Editors control
// which categories appear (and in what order) without code changes.
const SECTION_LIMIT = 3;

export async function generateMetadata(): Promise<Metadata> {
  const url = `https://tutorcruncher.com/blog`;
  const title = "Tutor Blog (Resources & Latest News) - TutorCruncher";
  const description =
    "Keep up-to-date with the latest news and resources on our blog. Here we discuss everything from online teaching to the latest news in the tutoring industry.";

  return formatMetaData(title, description, url);
}

const BlogLandingPage = async () => {
  const client = createClient();
  const categories = await client.getAllByType("category");

  // Featured categories become landing sections, ordered by `order` (lowest
  // first), falling back to title for ties / unset values.
  const featuredCategories = categories
    .filter((category) => category.data.featured)
    .sort(
      (a, b) =>
        (a.data.order ?? Infinity) - (b.data.order ?? Infinity) ||
        (a.data.title ?? "").localeCompare(b.data.title ?? "")
    );

  const [latest, categorySections] = await Promise.all([
    fetchArticles([], SECTION_LIMIT),
    Promise.all(
      featuredCategories.map(async (category) => {
        const posts = await fetchArticles(
          [prismic.filter.at("my.article.category", category.id)],
          SECTION_LIMIT
        );
        return { title: category.data.title, uid: category.uid, posts };
      })
    ),
  ]);

  const sections = categorySections.filter((section) => section.posts.length);

  return (
    <>
      <Hero heading={<b>Knowledge Hub</b>} />
      <Body spacing="none" background="blue">
        <CategorySearchFilterBar />
      </Body>
      <LatestPosts
        title="Latest articles"
        posts={latest}
        showAllBtn
        viewAllHref="/blog/search"
        background="blue"
      />
      {sections.map((section, index) => (
        <LatestPosts
          key={section.uid}
          title={section.title}
          posts={section.posts}
          showAllBtn
          viewAllHref={`/blog/search?category=${section.uid}`}
          background={index % 2 === 0 ? "cream" : "blue"}
        />
      ))}
    </>
  );
};

export default BlogLandingPage;
