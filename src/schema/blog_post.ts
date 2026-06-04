import { ArticlePage } from "@/lib/prismic/format/article";

export const generateArticleSchema = (article: ArticlePage) => {
  const { content } = article;

  const SITE_ROOT = "https://tutorcruncher.com";
  const defaultImageUrl = `${SITE_ROOT}/assets/publisher_logo.webp`;
  const url = `${SITE_ROOT}${content.url}`;

  const image = {
    "@type": "ImageObject",
    width: 300,
    height: 300,
    url: content.featuredImageUrl || `${SITE_ROOT}/${defaultImageUrl}`,
  };

  const dateCreated = content.createdDate;
  const datePublished = content.publishedDate;
  const dateModified = content.updatedDate;

  const publisherLogo = {
    "@type": "ImageObject",
    url: `${SITE_ROOT}/assets/publisher_logo.webp`,
    height: 60,
    width: 600,
  };

  const articleSchema = {
    "@context": "http://schema.org",
    "@type": "Article",
    image,
    url: url,
    dateCreated: new Date(dateCreated).toISOString(),
    datePublished: new Date(datePublished).toISOString(),
    dateModified: new Date(dateModified).toISOString(),
    headline: content.title,
    name: content.title,
    thumbnailUrl: image.url,
    author: {
      "@type": "Organization",
      name: content.author,
    },
    creator: [content.author],
    publisher: {
      "@type": "Organization",
      name: "TutorCruncher",
      url: SITE_ROOT,
      logo: publisherLogo,
    },
    mainEntityOfPage: url,
  };

  return JSON.stringify([articleSchema], null, 2);
};
