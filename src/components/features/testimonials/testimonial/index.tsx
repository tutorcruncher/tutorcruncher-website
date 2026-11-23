import styles from "./testimonial.module.scss";
import { PrismicNextImage } from "@prismicio/next";

// Logos are often uploaded on a large square canvas with empty space around
// them, which makes them render tiny. Crop the transparent (or white) border
// off at the CDN so the logo itself fills the available space.
const LOGO_IMGIX_PARAMS = {
  trim: "color",
  "trim-color": "00FFFFFF",
} as const;

export const Testimonial = ({
  shortTestimonial,
  reviewerImage,
  companyLogo,
  reviewerName,
  companyName,
  reviewerRole,
}) => {
  return (
    <div className={styles.slide}>
      <div className={styles.logo}>
        <PrismicNextImage
          field={companyLogo}
          fallbackAlt=""
          imgixParams={LOGO_IMGIX_PARAMS}
        />
      </div>
      <div className={styles.testimonial}>&#34;{shortTestimonial}&#34;</div>
      <div className={styles.cite}>
        <PrismicNextImage field={reviewerImage} fallbackAlt="" />
        <div className={styles.info}>
          <p className={styles.name}>{reviewerName}</p>
          <p className={styles.role}>
            {reviewerRole}, {companyName}
          </p>
        </div>
      </div>
    </div>
  );
};
