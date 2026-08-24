import { ImageField, isFilled, KeyTextField, RichTextField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

import styles from "./community-intro.module.scss";

interface CommunityIntroProps {
  heading?: KeyTextField;
  content?: RichTextField;
  image?: ImageField;
}

export const CommunityIntro = ({
  heading,
  content,
  image,
}: CommunityIntroProps) => {
  if (!heading && !isFilled.richText(content)) {
    return null;
  }

  return (
    <Body containerSize="large" spacing="medium" background="cream">
      <div className={styles.intro}>
        <div className={styles.text}>
          {heading ? (
            <Heading variant="h2" size="large">
              {heading}
            </Heading>
          ) : null}
          {isFilled.richText(content) ? (
            <div className={styles.content}>
              <PrismicRichText field={content} />
            </div>
          ) : null}
        </div>
        {isFilled.image(image) ? (
          <div className={styles.imageWrapper}>
            <PrismicNextImage field={image} fallbackAlt="" />
          </div>
        ) : null}
      </div>
    </Body>
  );
};
