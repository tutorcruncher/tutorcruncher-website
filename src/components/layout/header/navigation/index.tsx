"use client";

import clsx from "clsx";
import { usePathname } from "next/dist/client/components/navigation";
import Link from "next/dist/client/link";
import type { Dispatch, MouseEvent, SetStateAction } from "react";
import { useEffect, useState } from "react";

import { Action } from "@/components/ui/action";

import styles from "./navigation.module.scss";
import { SolutionsMenu } from "./solutions-menu";
import { ChevronDown } from "@/svgs/chevron-down";
import TrackingLink from "@/components/ui/tracking-link/tracking-link";

const NavigationItems = [
  {
    title: "Home",
    link: "/",
    mobileOnly: true,
  },
  {
    title: "Solutions",
    link: "/solutions",
  },
  {
    title: "Features",
    link: "/features",
  },
  {
    title: "Integrations",
    link: "/integrations",
  },
  {
    title: "Pricing",
    link: "/pricing",
  },
  {
    title: "Knowledge Hub",
    link: "/blog",
  },
];

interface NavigationProps {
  navigationOpen: boolean;
  setNavigationOpen: Dispatch<SetStateAction<boolean>>;
}

export const Navigation = ({
  navigationOpen,
  setNavigationOpen,
}: NavigationProps) => {
  const pathname = usePathname();
  const [solutionsVisbile, setSolutionsVisible] = useState(false);

  const handleToggleSolutionsMenu = (event) => {
    event.stopPropagation();
    setSolutionsVisible((prev) => !prev);
  };

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const linkHrefPathname = new URL(event.currentTarget.href).pathname;
    if (linkHrefPathname === pathname) {
      setNavigationOpen(false);
      setSolutionsVisible(false);
    }
  };

  useEffect(() => {
    setNavigationOpen(false);
    setSolutionsVisible(false);
    document.body.className = "";
  }, [pathname, setNavigationOpen]);

  return (
    <nav className={clsx(styles.primaryNav, [navigationOpen && styles.open])}>
      <ul>
        {NavigationItems.map((item) => {
          return (
            <li
              key={item.title}
              className={clsx(styles.hasChildren, {
                [styles.mobileOnly]: item.mobileOnly,
              })}
            >
              {item.title === "Solutions" ? (
                <>
                  <button
                    type="button"
                    onClick={handleToggleSolutionsMenu}
                    className={clsx(
                      styles.navigationLink,
                      solutionsVisbile && styles.solutionsVisible
                    )}
                  >
                    <span>{item.title}</span>
                    <ChevronDown />
                  </button>
                  <SolutionsMenu
                    solutionsVisbile={solutionsVisbile}
                    setSolutionsVisible={setSolutionsVisible}
                  />
                </>
              ) : (
                <Link
                  href={item.link}
                  className={styles.navigationLink}
                  onClick={(e) => handleLinkClick(e)}
                >
                  {item.title}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      <div className={styles.mobileActions}>
        <Action href="/login-redirect" variant="outline">
          Login
        </Action>
        <TrackingLink
          url="https://app.tutorcruncher.com/start/1/"
          text="Start a free trial"
          variant="solid"
        />
      </div>
    </nav>
  );
};
