import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";

import { Heading } from "@/components/ui/heading";
import { Tag } from "@/components/ui/tag";

import { ArticleDocument } from "../../../../prismicio-types";
import styles from "./featured-post.module.scss";

const DisplayDate = ({ publishDate, updateDate }) => {
  const publish = new Date(publishDate);
  const update = new Date(updateDate);

  const isUpdated = update > publish;

  const formattedDate = new Date(
    isUpdated ? updateDate : publishDate
  ).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });

  return (
    <p className={styles.date}>
      {isUpdated ? "Updated" : "Posted"} {formattedDate}
    </p>
  );
};

const Excerpt = ({ content }) => {
  const firstParagraph = content.find((block) => block.type === "paragraph");

  if (!firstParagraph) return null;

  const trimmedText =
    firstParagraph.text.split(" ").slice(0, 40).join(" ") + "...";

  return <p className={styles.excerpt}>{trimmedText}</p>;
};

export const FeaturedPost = ({ post }: { post: ArticleDocument }) => {
  const { data } = post;
  // @ts-expect-error - category does not exist on the article by standard
  const category = data.category?.data?.title;

  return (
    <Link href={`/blog/${post.uid}`} className={styles.featuredPost}>
      <div className={styles.imageWrapper}>
        <PrismicNextImage
          field={
            data.thumbnail_image?.url ? data.thumbnail_image : data.featured_image
          }
          fallbackAlt=""
        />
      </div>
      <div className={styles.inner}>
        <div className={styles.tags}>
          <span className={styles.featuredBadge}>Featured</span>
          {category ? <Tag title={category} noHoverEffect /> : null}
        </div>
        <Heading size="large" className={styles.title} variant="h2" noMargin>
          {data.title}
        </Heading>
        <Excerpt content={data.content} />
        <DisplayDate
          publishDate={data.publishDate}
          updateDate={data.updated_date}
        />
      </div>
    </Link>
  );
};
