import styles from "./trustpilot-rating.module.scss";

interface TrustpilotRatingProps {
  ratingLabel?: string;
  reviewsLabel?: string;
  linkLabel?: string;
  linkUrl?: string;
}

const Star = () => (
  <svg
    width="16"
    height="15"
    viewBox="0 0 16 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M3.28 14.05c-.16 0-.33-.05-.47-.16-.3-.22-.4-.57-.3-.92l1.27-3.88c.06-.17 0-.37-.14-.46L.33 6.23a.65.65 0 0 1-.29-.92c.11-.34.42-.56.77-.56h4.08c.18 0 .35-.11.4-.3L6.56.57c.11-.35.42-.57.77-.57.35 0 .66.22.77.57l1.25 3.9c.05.17.22.3.4.3h4.08c.37 0 .66.22.77.57.11.35 0 .7-.29.92l-3.3 2.4c-.14.11-.2.3-.14.46l1.26 3.88c.11.35 0 .7-.29.92-.3.22-.66.22-.96 0L7.59 11.5a.42.42 0 0 0-.5 0L3.8 13.9a.92.92 0 0 1-.52.15Z"
      fill="currentColor"
    />
  </svg>
);

export const TrustpilotRating = ({
  ratingLabel = "4.8 average rating",
  reviewsLabel = "500+ reviews",
  linkLabel,
  linkUrl,
}: TrustpilotRatingProps) => {
  return (
    <div className={styles.rating}>
      <span className={styles.stars} aria-hidden>
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </span>
      <span>{ratingLabel}</span>
      <span className={styles.divider} aria-hidden />
      <span>{reviewsLabel}</span>
      {linkLabel ? (
        <>
          <span className={styles.divider} aria-hidden />
          {linkUrl ? (
            <a href={linkUrl} target="_blank" rel="noopener noreferrer">
              {linkLabel}
            </a>
          ) : (
            <span>{linkLabel}</span>
          )}
        </>
      ) : null}
    </div>
  );
};
