"use client";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

import { Action } from "@/components/ui/action";
import LogoSvg from "@/svgs/logo";

import styles from "./header.module.scss";
import { Navigation } from "./navigation";
import TrackingLink from "@/components/ui/tracking-link/tracking-link";

export const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);

  const handleNavigationOpen = (isOpen: boolean) => {
    document.body.className = isOpen ? "navigation-open" : "";
    setNavigationOpen(isOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="Go to homepage via site logo"
        >
          <LogoSvg />
        </Link>
        <button
          type="button"
          className={clsx(styles.menuButton, [navigationOpen && styles.open])}
          onClick={() => handleNavigationOpen(!navigationOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <div className={styles.menuIcon}>
            <span aria-hidden="true" className={styles.menuLine} />
            <span aria-hidden="true" className={styles.menuLine} />
          </div>
        </button>
        <Navigation
          navigationOpen={navigationOpen}
          setNavigationOpen={setNavigationOpen}
        />
        <div className={styles.headerActions}>
          <Action href="/login-redirect" variant="outline">
            Login
          </Action>
          <TrackingLink
            url="https://app.tutorcruncher.com/start/1/"
            text="Start a free trial"
            variant="solid"
          />
        </div>
      </div>
    </header>
  );
};
