import "../../styles/globals.scss";

import { Inter } from "next/font/google";

import AnimateObserver from "@/components/AnimateObserver";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { GoogleTagManager } from "@next/third-parties/google";
import { TrackingProvider } from "../providers/tracking-provider";
import IntercomClientComponent from "@/components/intercom/intercom";
import CookieConsentBanner from "@/components/cookie-consent-banner";
import Image from "next/image";
import Script from "next/script";
import { organizationSchema } from "@/schema/structured-data";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/mnd5til.css" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="describedby"
          type="application/json"
          href="/.well-known/ai-plugin.json"
        />
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="LLM-readable site summary"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      <body>
        <TrackingProvider>
          <CookieConsentBanner />
          <Header />
          <main>{children}</main>
          <Footer />
          <AnimateObserver />
          <IntercomClientComponent />
        </TrackingProvider>
        <Script
          id="clickcease-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var script = document.createElement('script');
              script.defer = true;
              script.type = 'text/javascript';
              script.src = 'https://www.clickcease.com/monitor/stat.js';
              document.head.appendChild(script);
            `,
          }}
        />
        <noscript>
          <a href="https://www.clickcease.com" rel="nofollow">
            <Image
              loading="lazy"
              src="https://monitor.clickcease.com/stats/stats.aspx"
              alt="ClickCease"
              width={1}
              height={1}
              unoptimized
            />
          </a>
        </noscript>
      </body>
    </html>
  );
}
