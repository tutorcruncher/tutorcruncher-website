"use client";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import {
  IconButtonLink,
  IconButtonProps,
} from "@/components/ui/icon-button-link";
import { Facebook } from "@/svgs/facebook";
import { LinkedIn } from "@/svgs/linkedin";
import { Twitter } from "@/svgs/twitter";

import styles from "./shareLinks.module.scss";

export const socials = [
  {
    outlet: "Facebook",
    href: "https://www.facebook.com/sharer.php?u={url}",
    label: "Share on Facebook",
    icon: <Facebook />,
  },
  {
    outlet: "Twitter",
    href: "https://twitter.com/intent/tweet?url={url}&text={title}",
    label: "Share on Twitter",
    icon: <Twitter />,
  },
  {
    outlet: "LinkedIn",
    href: "https://www.linkedin.com/sharing/share-offsite/?url={url}",
    label: "Share on LinkedIn",
    icon: <LinkedIn />,
  },
];

export const ArticleShareLinks = ({
  title,
  variant,
}: {
  title: string;
  variant: IconButtonProps["variant"];
}) => {
  const pathname = usePathname();
  return (
    <div className={clsx(styles.shareLinksWrapper)}>
      Share:
      <div className={styles.shareLinks}>
        {socials.map((social) => (
          <IconButtonLink
            variant={variant}
            key={social.outlet}
            href={social.href
              .replace(
                "{url}",
                encodeURIComponent(
                  `https://tutorcruncher.com${pathname}?utm_source=tutorcruncherblog`
                )
              )
              .replace("{title}", encodeURIComponent(title))}
            ariaLabel={social.label}
          >
            {social.icon}
          </IconButtonLink>
        ))}
      </div>
    </div>
  );
};
