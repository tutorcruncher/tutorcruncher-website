import type { ReactNode } from "react";

import { NewsletterSignupPopup } from "@/components/features/newsletter-signup-popup";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <NewsletterSignupPopup />
    </>
  );
}
