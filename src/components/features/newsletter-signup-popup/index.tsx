"use client";

import { useEffect, useState } from "react";
import cookie from "js-cookie";

import { CheckCircleSvg } from "@/svgs/check-circle";
import { CloseSvg } from "@/svgs/close";
import { NewsletterForm } from "@/components/features/articles/newsletter/newsletter-form";

import { NEWSLETTER_BENEFITS } from "./data";
import styles from "./newsletter-signup-popup.module.scss";

const COOKIE_NAME = "newsletterSignupPopup";
const COOKIE_VALUE = "dismissed";
const SHOW_DELAY_MS = 10000;

export const NewsletterSignupPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (cookie.get(COOKIE_NAME)) return;

    const timer = setTimeout(() => setIsOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        persistDismissal();
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const persistDismissal = () => {
    cookie.set(COOKIE_NAME, COOKIE_VALUE, { expires: 365 });
  };

  const dismiss = () => {
    persistDismissal();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Newsletter signup"
    >
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.close}
          onClick={dismiss}
          aria-label="Close"
        >
          <CloseSvg />
        </button>
        <div className={styles.content}>
          <div className={styles.topGroup}>
            <p className={styles.heading}>Stay in the loop</p>
            <p className={styles.intro}>
              Sign up to the TutorCruncher newsletter and get:
            </p>
            <ul className={styles.benefits}>
              {NEWSLETTER_BENEFITS.map((benefit) => (
                <li key={benefit}>
                  <CheckCircleSvg />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.form}>
            <NewsletterForm onSuccess={persistDismissal} />
          </div>
        </div>
      </div>
    </div>
  );
};
