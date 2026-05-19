"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    ga?: () => void;
  }
}

const LoginRedirectPage = () => {
  useEffect(() => {
    const checkGA = () => {
      if (
        window.dataLayer &&
        window.dataLayer.some(
          (event: Record<string, string>) => event.event === "gtm.js"
        )
      ) {
        window.location.href = "https://app.tutorcruncher.com/";
      } else {
        setTimeout(checkGA, 500);
      }
    };

    checkGA();
  }, []);

  return (
    <p className="text-center">
      Redirecting you to TutorCruncher’s login page. If that doesn&apos;t
      happen, please click here.
    </p>
  );
};

export default LoginRedirectPage;
