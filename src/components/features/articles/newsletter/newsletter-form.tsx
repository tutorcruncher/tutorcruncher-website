 /* eslint-disable */
 "use client";

import { useState, FormEvent } from "react";
import { Action } from "@/components/ui/action";
import styles from "./newsletter.module.scss";

const MAILCHIMP_POST_URL =
  "https://tutorcruncher.us13.list-manage.com/subscribe/post-json?u=ea12d2871ca6b988ff70c3dbe&id=492dd26d91&v_id=5416&f_id=00b5d7ecf0";

interface NewsletterFormProps {
  onSuccess?: () => void;
  buttonText?: string;
}

export const NewsletterForm = ({ onSuccess, buttonText }: NewsletterFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      params.set(key, value as string);
    });

    const callbackName = `mc_resp_${Date.now()}`;
    const url = `${MAILCHIMP_POST_URL}&${params.toString()}&c=${callbackName}`;

    (window as any)[callbackName] = (data: { result: string; msg: string }) => {
      if (data.result === "success") {
        setIsSubmitted(true);
        onSuccess?.();
      } else {
        const msg = data.msg || "Something went wrong. Please try again.";
        setErrorMessage(msg.includes("already subscribed")
          ? "You are already subscribed!"
          : msg.replace(/<a [^>]+>[^<]+<\/a>/, "").trim()
        );
      }
      setIsLoading(false);
      delete (window as any)[callbackName];
      script.remove();
    };

    const script = document.createElement("script");
    script.src = url;
    script.onerror = () => {
      setErrorMessage("Something went wrong. Please try again.");
      setIsLoading(false);
      delete (window as any)[callbackName];
      script.remove();
    };
    document.body.appendChild(script);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="tags" value="7236437" />
      <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
        <input
          type="text"
          name="b_ea12d2871ca6b988ff70c3dbe_492dd26d91"
          tabIndex={-1}
          defaultValue=""
        />
      </div>
      <input
        type="email"
        name="EMAIL"
        placeholder="Email"
        required
        disabled={isLoading || isSubmitted}
        className={styles.input}
      />
      <fieldset className={styles.gdpr}>
        <label className={styles.consent}>
          <input type="checkbox" name="gdpr[71425]" value="Y" disabled={isLoading || isSubmitted} checked />
          <span>Email marketing</span>
        </label>
        {isSubmitted ? (
          <>
          <p className={styles.successMessage}>Thank you for subscribing!</p>
          <p>You can unsubscribe at anytime by clicking the link in the footer of our emails.</p>
          </>
        ) : (
          <>
          <Action disableAnimation type="submit" disabled={isLoading} loading={isLoading}>
            {buttonText || "Subscribe"}
          </Action>
           <p className={styles.legalText}>
          By signing up to our newsletter you consent to receive marketing communications from TutorCruncher.
        </p>
        </>
        )}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

      </fieldset>
    </form>
  );
};
