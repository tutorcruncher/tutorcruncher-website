import { Action } from "@/components/ui/action";
import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

import { Posts } from "..";
import styles from "./latestPosts.module.scss";
import { ArticleDocument } from "../../../../prismicio-types";
import { BackgroundColour } from "@/types/backgroundColor";

interface LatestPostsProps {
  posts: ArticleDocument[];
  title: string;
  showAllBtn?: boolean;
  viewAllHref?: string;
  background?: BackgroundColour;
}

export const LatestPosts = ({
  posts,
  title,
  showAllBtn = false,
  viewAllHref = "/blog",
  background = "blue",
}: LatestPostsProps) => {
  if (posts.length === 0) return null;

  const showAsCarousel = posts.length > 1;
  return (
    <Body
      background={background}
      heading={
        <Heading center variant="h2">
          {title}
        </Heading>
      }
    >
      <Posts posts={posts} carousel={showAsCarousel} animate />
      {showAllBtn ? (
        <div className={styles.linkWapper}>
          <Action href={viewAllHref} variant="outline">
            View all
          </Action>
        </div>
      ) : null}
    </Body>
  );
};
