"use client";

import { ReactNode } from "react";

import { Action } from "@/components/ui/action";
import { ActionProps } from "@/components/ui/action/types";
import { useTrackedHref } from "@/hooks/use-tracked-href";

interface TrackedActionProps extends Omit<ActionProps, "children"> {
  href: string;
  children: ReactNode;
}

/**
 * An `Action` whose href carries the current tracking params on the pages that
 * opt into it (see `useTrackedHref`). Everywhere else it renders exactly like a
 * plain `Action`, so it is safe to use for shared internal CTAs.
 */
export const TrackedAction = ({
  href,
  children,
  ...actionProps
}: TrackedActionProps) => {
  const trackedHref = useTrackedHref(href);

  return (
    <Action href={trackedHref} {...actionProps}>
      {children}
    </Action>
  );
};
