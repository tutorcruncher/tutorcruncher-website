"use client";

import clsx from "clsx";
import { usePathname } from "next/dist/client/components/navigation";
import Link from "next/dist/client/link";
import type { Dispatch, MouseEvent, SetStateAction } from "react";
import { useEffect, useRef, useState } from "react";

import { Action } from "@/components/ui/action";

import styles from "./navigation.module.scss";
import { SolutionsMenu } from "./solutions-menu";
import { ChevronDown } from "@/svgs/chevron-down";
import TrackingLink from "@/components/ui/tracking-link/tracking-link";

interface NavigationItem {
  title: string;
  link: string;
  mobileOnly?: boolean;
  children?: { title: string; link: string }[];
}

const NavigationItems: NavigationItem[] = [
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
    children: [
      { title: "Blog", link: "/blog" },
      { title: "Community", link: "/community" },
    ],
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
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const subMenuRef = useRef<HTMLLIElement>(null);

  const handleToggleSolutionsMenu = (event) => {
    event.stopPropagation();
    setSolutionsVisible((prev) => !prev);
  };

  const handleToggleSubMenu = (event: MouseEvent, title: string) => {
    event.stopPropagation();
    setOpenSubMenu((prev) => (prev === title ? null : title));
  };

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        subMenuRef.current &&
        !subMenuRef.current.contains(event.target as Node)
      ) {
        setOpenSubMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    setOpenSubMenu(null);
    document.body.className = "";
  }, [pathname, setNavigationOpen]);

  return (
    <nav className={clsx(styles.primaryNav, [navigationOpen && styles.open])}>
      <ul>
        {NavigationItems.map((item) => {
          return (
            <li
              key={item.title}
              ref={item.children ? subMenuRef : undefined}
              className={clsx(styles.hasChildren, {
                [styles.mobileOnly]: item.mobileOnly,
                [styles.hasSubMenu]: item.children,
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
              ) : item.children ? (
                <>
                  <button
                    type="button"
                    onClick={(e) => handleToggleSubMenu(e, item.title)}
                    className={clsx(
                      styles.navigationLink,
                      openSubMenu === item.title && styles.solutionsVisible
                    )}
                  >
                    <span>{item.title}</span>
                    <ChevronDown />
                  </button>
                  {openSubMenu === item.title ? (
                    <ul className={styles.subMenu}>
                      {item.children.map((child) => (
                        <li key={child.title}>
                          <Link
                            href={child.link}
                            className={styles.subMenuLink}
                            onClick={(e) => handleLinkClick(e)}
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
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
