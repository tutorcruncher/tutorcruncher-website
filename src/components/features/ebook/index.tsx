"use client";

import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { useState } from "react";

import { EbookDownload } from "./ebook-download";
import { EbookForm } from "./ebook-form";
import styles from "./ebook.module.scss";
import { FORM_COPY, MAILCHIMP } from "./mailchimp";
import { EbookProps } from "./types";
import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

export const Ebook = ({ data }: EbookProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // An unset "Link to Media" field is an empty object with no `url`/`name`,
  // so narrow before reading them.
  const file = data.file;
  const fileUrl = file && "url" in file ? file.url : undefined;
  const fileName = file && "name" in file ? file.name : undefined;

  return (
    <Body containerSize="large" spacing="medium" background="blue">
      <div className={styles.layout}>
        <div className={styles.content}>
          {data.title ? (
            <Heading size="large" variant="h1">
              {data.title}
            </Heading>
          ) : null}

          {data.image?.url ? (
            <PrismicNextImage
              field={data.image}
              className={styles.image}
              sizes="(max-width: 800px) 100vw, 50vw"
              // Prismic's alt text is used when set. Falling back to
              // decorative is safe here because the heading beside the image
              // already names the ebook — but set alt text in Prismic when the
              // cover conveys anything the title doesn't.
              fallbackAlt=""
            />
          ) : null}

          {data.description?.length ? (
            <div className={styles.description}>
              <PrismicRichText field={data.description} />
            </div>
          ) : null}
        </div>

        <div className={styles.aside}>
          {isSubmitted ? (
            <EbookDownload
              fileUrl={fileUrl}
              fileName={fileName}
              downloadLabel={FORM_COPY.downloadLabel}
            />
          ) : (
            <EbookForm
              heading={FORM_COPY.heading}
              submitLabel={FORM_COPY.submitLabel}
              actionUrl={MAILCHIMP.actionUrl}
              honeypotField={MAILCHIMP.honeypotField}
              gdprHeading={MAILCHIMP.gdprHeading}
              gdprOptions={[...MAILCHIMP.gdprOptions]}
              gdprRequired={MAILCHIMP.gdprRequired}
              collectFirstName
              collectLastName
              collectCompany
              onSuccess={() => setIsSubmitted(true)}
            />
          )}
        </div>
      </div>
    </Body>
  );
};
