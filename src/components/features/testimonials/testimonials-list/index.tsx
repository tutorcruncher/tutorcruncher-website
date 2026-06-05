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
          tag,
        }) => (
          <div className={styles.testimonial} key={id}>
            {tag ? <span className={styles.tag}>{tag}</span> : null}
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
        )
      )}
    </div>
  );
};
