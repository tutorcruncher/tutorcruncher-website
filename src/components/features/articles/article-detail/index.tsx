import { PrismicRichText, SliceZone } from "@prismicio/react";

import { components as sliceComponents } from "slices";
import { LatestPosts } from "@/components/Posts/LatestPosts";
import { Action } from "@/components/ui/action";
import { Heading } from "@/components/ui/heading";
import { Tag } from "@/components/ui/tag";

import { ArticleDocument } from "../../../../../prismicio-types";
import { Summary } from "../article-summary";
import { createID, filterHeadings } from "../helpers";
import { Newsletter } from "../newsletter";
import { ArticleShareLinks } from "../share-links";
import styles from "./article-detail.module.scss";
import { CallToAction } from "../../call-to-action";
import TrackingLink from "@/components/ui/tracking-link/tracking-link";
import { ArticlePage } from "@/lib/prismic/format/article";

const addBlogUtm = (url: string) => {
  if (!url) return url;
  try {
    const parsed = new URL(url, "https://tutorcruncher.com");
    parsed.searchParams.set("utm_source", "tutorcruncherblog");
    return parsed.toString();
  } catch {
    return url;
  }
};

const components = {
  heading2: ({ text }) => {
    return <h2 id={createID(text)}>{text}</h2>;
  },
  heading3: ({ text }) => {
    return <h3 id={createID(text)}>{text}</h3>;
  },
  heading4: ({ text }) => {
    return <h4 id={createID(text)}>{text}</h4>;
  },
  heading5: ({ text }) => {
    return <h5 id={createID(text)}>{text}</h5>;
  },
  heading6: ({ text }) => {
    return <h6 id={createID(text)}>{text}</h6>;
  },
  embed: ({ node }) => {
    if (node.oembed.provider_name === "YouTube") {
      return (
        <div className="embed-wrapper">
          <p>a</p>
          <div dangerouslySetInnerHTML={{ __html: node.oembed.html ?? "" }} />
        </div>
      );
    }
  },
  paragraph: ({ children, text }) => {
    if (text === "{{ blog_ctas() }}") {
      return (
        <div className={styles.buttonsContainer}>
          <Action href="/book-a-call?utm_source=tutorcruncherblog">Book a call </Action>
          <TrackingLink
            url="https://app.tutorcruncher.com/start/1/?utm_source=tutorcruncherblog"
            text="Start a free trial"
          />
        </div>
      );
    }

    return <p>{children}</p>;
  },
  hyperlink: ({ children, node }) => {
    const target = node.data.target === "_blank" ? "_blank" : "_self";
    const rel = target === "_blank" ? "noopener noreferrer" : null;
    const href = addBlogUtm(node.data.url);

    return (
      <a href={href} target={target} rel={rel}>
        {children}
      </a>
    );
  },
};

interface ArticleDetailProps {
  article: ArticlePage;
  relatedPosts: ArticleDocument[];
}

export const ArticleDetail = ({
  article,
  relatedPosts,
}: ArticleDetailProps) => {
  const { content } = article;

  const category = content?.category?.title || "";
  const headings = filterHeadings(content.body);

  const publishedDate = new Date(content.publishedDate).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
  return (
    <>
      <div className={styles.header}>
        {category ? <Tag title={category} noHoverEffect /> : null}
        <Heading size="large" variant="h1">
          {content.title}
        </Heading>
        <div className={styles.dateAndShareWraper}>
          <span className={styles.byline}>
            By {content.author} · {publishedDate}
          </span>
          <div className={styles.hideOnMobile}>
            <ArticleShareLinks title={content.title} variant="white" />
          </div>
        </div>
      </div>
      <div className={styles.divide}>
        <div className={styles.divideInner}>{content.featuredImage}</div>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div>
            <Summary headings={headings} />
            <Newsletter />
            <a href="#related-posts" className={styles.relatedPostsLink}>
              Go to related articles
              <svg
                width="45"
                height="44"
                viewBox="0 0 45 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28.0838 0H16.5822C7.60802 0 0.333008 7.27501 0.333008 16.2492V27.7508C0.333008 36.725 7.60802 44 16.5822 44H28.0838C37.058 44 44.333 36.725 44.333 27.7508V16.2492C44.333 7.27501 37.058 0 28.0838 0Z"
                  fill="white"
                />
                <path
                  d="M21.4389 13L21.4389 27.2348L16.3264 22.085L15 23.4453L22.5 31L30 23.4453L28.6495 22.085L23.5611 27.2348L23.5611 13L21.4389 13Z"
                  fill="#362E83"
                />
              </svg>
            </a>
          </div>
          <div>
            <article className="main-content">
              <PrismicRichText field={content.body} components={components} />
              <SliceZone slices={content.slices} components={sliceComponents} />
            </article>
            <div className={styles.dateAndShareWraper}>
              <div className={styles.hideOnMobile}>{publishedDate}</div>
              <ArticleShareLinks title={content.title} variant="lightBlue" />
            </div>
          </div>
        </div>
      </div>
      {relatedPosts && relatedPosts.length !== 0 ? (
        <div id="related-posts">
          <LatestPosts
            posts={relatedPosts}
            title="Related articles"
            background="cream"
          />
        </div>
      ) : null}
      <CallToAction background="blue" />
    </>
  );
};
