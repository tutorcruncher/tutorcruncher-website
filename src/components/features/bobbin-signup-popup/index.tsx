"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import cookie from "js-cookie";

import styles from "./bobbin-signup-popup.module.scss";
import { CloseSvg } from "@/svgs/close";

const COOKIE_NAME = "bobbinSignupPopup";
const COOKIE_VALUE = "dismissed";
const SHOW_DELAY_MS = 3000;
const CTA_URL = "https://withbobbin.com";

const benefits = [
  "Create bespoke lesson plans in seconds",
  "Run online sessions and capture every thread in one place",
  "Get parent-ready reporting in a cinch",
  "Use data insights to track student progress with ease",
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
    <circle cx="12" cy="12" r="9.08" fill="#1d1914" />
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

export const BobbinSignupPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (cookie.get(COOKIE_NAME)) return;

    const timer = setTimeout(() => setIsOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
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
      aria-label="Bobbin signup"
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
        <div className={styles.imageWrap}>
          <Image
            src="/img/bobbin-popup.png"
            alt="Better lessons. Built with Bobbin."
            width={918}
            height={538}
            priority
          />
        </div>
        <div className={styles.content}>
          <div className={styles.topGroup}>
            <div className={styles.logo}>
              <Image
                src="/img/bobbin-logo.svg"
                alt="Bobbin"
                width={208}
                height={52}
                className={styles.logoImg}
              />
            </div>
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
            Find out more
            <ArrowRightIcon />
          </a>
        </div>
      </div>
    </div>
  );
};
