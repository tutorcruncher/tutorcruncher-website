import { createClient } from "prismicio";

import {
  ArticleDocumentWithCategory,
  ArticlePage,
  formatArticlePage,
} from "./format/article";
import { ArticleDocument } from "../../../prismicio-types";

export const fetchArticles = async (
  filters = [],
  limit = 1000
): Promise<ArticleDocument<string>[]> => {
  const client = createClient();
  try {
    const articles = await client.getAllByType("article", {
      filters,
      limit,
      orderings: {
        field: "my.article.publishDate",
        direction: "desc",
      },
      fetchLinks: "category.title",
    });

    // Pinned/featured articles surface at the top, keeping the existing
    // publish-date order within the pinned and non-pinned groups.
    return articles.sort(
      (a, b) =>
        Number(Boolean(b.data.featured)) - Number(Boolean(a.data.featured))
    );
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

export const fetchArticleByUid = async (uid: string): Promise<ArticlePage> => {
  const client = createClient();
  try {
    const article = (await client.getByUID("article", uid, {
      fetchLinks: "category.title",
    })) as ArticleDocumentWithCategory;
    return formatArticlePage(article);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return null;
  }
};
