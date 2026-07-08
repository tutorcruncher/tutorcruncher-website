"use client";

import { useState } from "react";

import { Action } from "@/components/ui/action";

import styles from "./community.module.scss";

interface NewsletterFormProps {
  ctaText: string;
}

export const NewsletterForm = ({ ctaText }: NewsletterFormProps) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Placeholder: to be wired up to the mailing list provider later.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className={styles.formSuccess}>
        Thanks! You&apos;re on the list — we&apos;ll be in touch with our next
        events.
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.formLabel} htmlFor="community-email">
        Email address
      </label>
      <div className={styles.formRow}>
        <input
          id="community-email"
          type="email"
          required
          placeholder="you@yourcompany.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.formInput}
        />
        <Action type="submit" variant="solid">
          {ctaText}
        </Action>
      </div>
    </form>
  );
};
