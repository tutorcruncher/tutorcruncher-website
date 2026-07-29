"use client";

import { FormEvent, useState } from "react";

import styles from "./ebook-form.module.scss";
import { EbookFormProps } from "./types";
import { Action } from "@/components/ui/action";
import { Heading } from "@/components/ui/heading";

/**
 * Mailchimp's embed code points at `/subscribe/post`, which does a full form
 * POST and navigates the visitor off to a Mailchimp-hosted confirmation page.
 * That would strand them away from the download, so we submit to the JSONP
 * `post-json` endpoint instead and keep the visitor on the page. This lets the
 * editor paste the action URL straight out of Mailchimp without editing it.
 */
const toJsonpUrl = (actionUrl: string) =>
  actionUrl.replace("/subscribe/post?", "/subscribe/post-json?");

export const EbookForm = ({
  heading,
  actionUrl,
  honeypotField,
  gdprOptions,
  gdprHeading,
  gdprRequired,
  collectFirstName,
  collectLastName,
  collectCompany,
  submitLabel,
  onSuccess,
}: EbookFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!actionUrl) {
      setErrorMessage("This form is not configured yet. Please try again later.");
      return;
    }

    // Unticked checkboxes are absent from FormData, so consent is only ever
    // sent to Mailchimp when the visitor actually gave it.
    if (gdprRequired && gdprOptions?.length) {
      const formEl = e.currentTarget;
      const anyChecked = gdprOptions.some(
        (option) =>
          (formEl.elements.namedItem(option.field) as HTMLInputElement | null)
            ?.checked
      );

      if (!anyChecked) {
        setErrorMessage(
          "Please choose at least one option so we know how to contact you."
        );
        return;
      }
    }

    setIsLoading(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      params.set(key, value as string);
    });

    const callbackName = `mc_ebook_resp_${Date.now()}`;
    const url = `${toJsonpUrl(actionUrl)}&${params.toString()}&c=${callbackName}`;

    // JSONP requires hanging the callback off `window` by a generated name,
    // which has no typed representation.
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const cleanup = () => {
      delete (window as any)[callbackName];
      script.remove();
    };

    (window as any)[callbackName] = (data: { result: string; msg: string }) => {
      /* eslint-enable @typescript-eslint/no-explicit-any */
      // Someone who already subscribed still asked for the ebook, so treat that
      // as a success rather than blocking them from the file they came for.
      if (data.result === "success" || data.msg?.includes("already subscribed")) {
        onSuccess();
      } else {
        const msg = data.msg || "Something went wrong. Please try again.";
        setErrorMessage(msg.replace(/<a [^>]+>[^<]+<\/a>/, "").trim());
      }
      setIsLoading(false);
      cleanup();
    };

    const script = document.createElement("script");
    script.src = url;
    script.onerror = () => {
      setErrorMessage("Something went wrong. Please try again.");
      setIsLoading(false);
      cleanup();
    };
    document.body.appendChild(script);
  };

  return (
    <div className={styles.form}>
      {heading ? (
        <Heading size="xsmall" variant="h2" noMargin>
          {heading}
        </Heading>
      ) : null}

      <form onSubmit={handleSubmit}>
        {honeypotField ? (
          <div
            style={{ position: "absolute", left: "-5000px" }}
            aria-hidden="true"
          >
            <input type="text" name={honeypotField} tabIndex={-1} defaultValue="" />
          </div>
        ) : null}

        {collectFirstName ? (
          <label className={styles.field}>
            <span>First name</span>
            <input
              type="text"
              name="FNAME"
              autoComplete="given-name"
              required
              disabled={isLoading}
              className={styles.input}
            />
          </label>
        ) : null}

        {collectLastName ? (
          <label className={styles.field}>
            <span>Last name</span>
            <input
              type="text"
              name="LNAME"
              autoComplete="family-name"
              disabled={isLoading}
              className={styles.input}
            />
          </label>
        ) : null}

        {collectCompany ? (
          <label className={styles.field}>
            <span>Company</span>
            <input
              type="text"
              name="ORG_NAME"
              autoComplete="organization"
              disabled={isLoading}
              className={styles.input}
            />
          </label>
        ) : null}

        <label className={styles.field}>
          <span>Email</span>
          <input
            type="email"
            name="EMAIL"
            autoComplete="email"
            required
            disabled={isLoading}
            className={styles.input}
          />
        </label>

        {gdprOptions?.length ? (
          <fieldset className={styles.gdpr}>
            <legend>{gdprHeading || "How would you like to hear from us?"}</legend>
            {gdprOptions.map((option) => (
              <label key={option.field} className={styles.consent}>
                <input
                  type="checkbox"
                  name={option.field}
                  value="Y"
                  disabled={isLoading}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </fieldset>
        ) : null}

        <Action
          disableAnimation
          type="submit"
          disabled={isLoading}
          loading={isLoading}
          fullwidth
        >
          {submitLabel || "Get the ebook"}
        </Action>

        <div className={styles.legalText}>
          <p>
            You can unsubscribe at any time by clicking the link in the footer
            of our emails. We use Mailchimp as our marketing platform; by
            subscribing you acknowledge that your information will be
            transferred to Mailchimp for processing.
          </p>
        </div>

        {errorMessage ? (
          <p className={styles.errorMessage} role="alert">
            {errorMessage}
          </p>
        ) : null}
      </form>
    </div>
  );
};
