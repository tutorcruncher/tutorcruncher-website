import {
  ArticleDocument,
  ArticleDocumentDataSlicesSlice,
  Simplify,
} from "../../../../prismicio-types";
import { PrismicNextImage } from "@prismicio/next";
import { RichTextField } from "@prismicio/types";
import { SliceZone } from "@prismicio/client";

export interface ArticleDocumentWithCategory extends Simplify<ArticleDocument> {
  data: ArticleDocument["data"] & {
    category: {
      id: string;
      data: {
        title: string;
      };
    };
  };
}

export const DEFAULT_AUTHOR = "The TutorCruncher Team";

export interface ArticlePage {
  content: {
    title: string;
    author: string;
    url: string;
    body: RichTextField;
    slices: SliceZone<ArticleDocumentDataSlicesSlice>;
    createdDate: Date;
    publishedDate: Date;
    updatedDate: Date;
    featuredImage: JSX.Element;
    featuredImageUrl: string;
    category: {
      id: string;
      title: string;
    };
  };

  meta: {
    title: string;
    description: string;
  };
}

export const formatArticlePage = (
  page: ArticleDocumentWithCategory
): ArticlePage => {
  const { data } = page;

  const content = {
    title: data.title,
    author: data.author || DEFAULT_AUTHOR,
    url: `/blog/${page.uid}`,
    body: data.content,
    slices: data.slices,
    createdDate: new Date(page.first_publication_date),
    publishedDate: new Date(data.publishDate),
    updatedDate: data.updated_date
      ? new Date(data.updated_date)
      : new Date(data.publishDate),
    featuredImage: (
      <PrismicNextImage field={data.featured_image} fallbackAlt="" />
    ),
    featuredImageUrl: data.featured_image.url,
    ...(data.category && {
      category: {
        id: data.category?.id,
        title: data.category.data?.title,
      },
    }),
  };

  const meta = {
    title: data.meta_title,
    description: data.meta_description,
  };

  return { content, meta };
};
