"use client";
import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import Link from "next/link";
import styles from "./cookie-consent-banner.module.scss";
import { Heading } from "../ui/heading";
import { Action } from "../ui/action";

const REQUIRED_COOKIES = [
  "_ga=",
  "_gid=",
  "_gat=",
  "_gat_enquirytcs=",
  "cookieControlPrefs=",
  "cookieControl=",
  // Dismissal flags for our own popups — functional, not tracking. Without
  // these the popups reappear for anyone who declines analytics.
  "bobbinSignupPopup=",
  "newsletterSignupPopup=",
];

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [consentOptions, setConsentOptions] = useState({
    analytics_storage: true,
    ad_personalization: true,
    ad_storage: true,
    ad_user_data: true,
  });

  const cookieTypes = [
    {
      type: "Analytics",
      value: "analytics_storage",
      description:
        "Cookies related to site visits and browser usage for our third-party applications.",
    },
    {
      type: "Preferences",
      value: "ad_personalization",
      description: "Cookies related to personalized advertising.",
    },
    {
      type: "Marketing",
      value: ["ad_storage", "ad_user_data"],
      description:
        "Cookies related to storing cookies related to advertising and sending user data related to advertising to Google.",
    },
  ];

  useEffect(() => {
    const consentCookie = cookie.get("cookieControl");
    if (!consentCookie) {
      setShowBanner(true);
    }
  }, []);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setConsentOptions((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const clearCookies = () => {
    const cookies = document.cookie.split("; ");
    const keepCookies = cookies.filter((cookie) =>
      REQUIRED_COOKIES.some((required) => cookie.includes(required))
    );
    cookies.forEach((cookie) => {
      if (!keepCookies.includes(cookie)) {
        document.cookie = cookie + "; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      }
    });
  };

  const handleAccept = () => {
    saveCookiePreferences();
    setShowBanner(false);
    cookie.set("cookieControl", "accepted", { expires: 365 });
    setGA4ConsentOptions("update");

    if (!consentOptions.analytics_storage) {
      clearCookies();
      window.location.reload();
    }
  };

  const saveCookiePreferences = () => {
    const selectedOptions = Object.keys(consentOptions).filter(
      (key) => consentOptions[key]
    );
    const serializedPreferences = encodeURIComponent(
      JSON.stringify(selectedOptions)
    );
    cookie.set("cookieControlPrefs", serializedPreferences, { expires: 365 });
  };

  const setGA4ConsentOptions = (type) => {
    const consentOptionsDefault = {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    };

    Object.keys(consentOptions).forEach((key) => {
      consentOptionsDefault[key] = consentOptions[key] ? "granted" : "denied";
    });

    if (window.gtag) {
      window.gtag("consent", type, consentOptionsDefault);
    }
  };

  if (!showBanner) {
    return null;
  }

  const acceptText = showOptions ? "Accept selected" : "Accept all";

  return (
    <div className={styles.consentBannerOverlay}>
      <div className={styles.consentBanner}>
        <Heading size="xsmall" noMargin>
          We value your privacy
        </Heading>
        <p>
          This website uses cookies to ensure you get the best experience on our
          website.{" "}
          <Link href="/terms/#1-privacy-policy">View privacy policy.</Link>
        </p>
        {showOptions ? (
          <div>
            <p>Select cookies to accept</p>
            <ul className={styles.cookieTypes}>
              <li>
                <input type="checkbox" name="necessary" checked disabled />{" "}
                <label title="These are cookies that are essential for the website to work correctly.">
                  Necessary
                </label>
              </li>
              {cookieTypes.map(({ type, value, description }) => (
                <li key={type}>
                  <input
                    type="checkbox"
                    id={`gdpr-cookietype-${type}`}
                    name={Array.isArray(value) ? value[0] : value}
                    checked={
                      Array.isArray(value)
                        ? value.every((v) => consentOptions[v])
                        : consentOptions[value]
                    }
                    onChange={handleCheckboxChange}
                  />{" "}
                  <label
                    htmlFor={`gdpr-cookietype-${type}`}
                    title={description}
                  >
                    {type}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className={styles.buttonContainer}>
          <Action onClick={handleAccept}>{acceptText}</Action>
          <Action
            variant="white"
            onClick={() => setShowOptions(true)}
            disabled={showOptions}
          >
            Manage options
          </Action>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
