import styles from "./ebook-download.module.scss";
import { EbookDownloadProps } from "./types";
import { FORM_COPY } from "../mailchimp";
import { Heading } from "@/components/ui/heading";

export const EbookDownload = ({
  fileUrl,
  fileName,
  downloadLabel,
}: EbookDownloadProps) => (
  <div className={styles.download}>
    <Heading size="xsmall" variant="h2" noMargin>
      {FORM_COPY.successHeading}
    </Heading>

    <p className={styles.message}>{FORM_COPY.successMessage}</p>

    {/*
      A plain anchor rather than the `Action` component: `Action` renders a
      Next `Link`, which intercepts navigation client-side and drops the
      `download` attribute, so the PDF would open in a tab instead of saving.
    */}
    {fileUrl ? (
      <a
        href={fileUrl}
        className={styles.downloadButton}
        download={fileName || true}
        target="_blank"
        rel="noopener noreferrer"
      >
        {downloadLabel || FORM_COPY.downloadLabel}
      </a>
    ) : null}
  </div>
);
