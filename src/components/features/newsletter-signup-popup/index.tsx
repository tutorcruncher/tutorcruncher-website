"use client";

import { useEffect, useState } from "react";
import cookie from "js-cookie";

import { CloseSvg } from "@/svgs/close";

import { NEWSLETTER_SIGNUP_URL } from "./data";
import styles from "./newsletter-signup-popup.module.scss";

const COOKIE_NAME = "newsletterSignupPopup";
const COOKIE_VALUE = "dismissed";
const SHOW_DELAY_MS = 15000;
const CTA_URL = `${NEWSLETTER_SIGNUP_URL}?utm_source=tutorcruncher&utm_medium=popup&utm_campaign=blog-newsletter`;

const benefits = [
  "Monthly updates on what's new in TutorCruncher",
  "Practical tips for running a tutoring business",
  "Industry insights straight to your inbox",
];

const CheckIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9.08" fill="currentColor" />
    <path
      d="M8 12.5l2.8 2.8L16.5 9.5"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M4 10h12m0 0l-5-5m5 5l-5 5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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

  const handleCtaClick = () => {
    persistDismissal();
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
              {benefits.map((benefit) => (
                <li key={benefit}>
                  <CheckIcon />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
            onClick={handleCtaClick}
          >
            Sign up
            <ArrowRightIcon />
          </a>
          <p className={styles.legalText}>
            By signing up to our newsletter you consent to receive marketing
            communications from TutorCruncher. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};
