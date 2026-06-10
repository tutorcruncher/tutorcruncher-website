import { Heading } from "@/components/ui/heading";
import { PrismicImage } from "@prismicio/react";

import styles from "./testimonials-list.module.scss";

export const TestimonialList = ({ testimonials }) => {
  return (
    <div className={styles.testimonialsList}>
      {testimonials.map(
        ({
          companyLogo,
          id,
          reviewerName,
          reviewerRole,
          testimonial,
          companyName,
          reviewerImage,
          segment,
          location,
          tag,
        }) => {
          // Prefer the manual tag override; otherwise derive "Location - Plan"
          // (e.g. "US - Pay as you go") from the structured fields.
          const displayTag =
            tag?.trim() || [location, segment].filter(Boolean).join(" - ");

          return (
          <div className={styles.testimonial} key={id}>
            {displayTag ? (
              <span className={styles.tag}>{displayTag}</span>
            ) : null}
            <div className="main-content">{testimonial}</div>
            <div className={styles.cite}>
              {reviewerImage?.url ? (
                <PrismicImage
                  field={reviewerImage}
                  className={styles.reviewerImage}
                />
              ) : (
                <PrismicImage field={companyLogo} />
              )}
              <div>
                <Heading size="xxsmall" variant="h3" noMargin>
                  {reviewerName}
                </Heading>
                <p>
                  {reviewerRole} - {companyName}
                </p>
              </div>
            </div>
          </div>
          );
        }
      )}
    </div>
  );
};
