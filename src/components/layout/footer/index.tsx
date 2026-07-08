import Link from "next/link";

import { Action } from "@/components/ui/action";
import LogoSvg from "@/svgs/logo";

import { Accordion } from "./accordion";
import styles from "./footer.module.scss";
import { FooterSocialLinks } from "./social-links";
import { SOLUTIONS_MENU } from "../header/navigation/solutions-menu/data";

export const Footer = async () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerContent}>
          <div className={styles.logo}>
            <LogoSvg />
            <p className={styles.tagLine}>
              The most comprehensive software for tutoring companies
            </p>
          </div>
          <div className={styles.links}>
            <Accordion title="Solutions">
              {SOLUTIONS_MENU.map((solution) => (
                <Link key={solution.title} href={solution.url}>
                  {solution.title}
                </Link>
              ))}
              <Link href="/tutoring-calculator">Tutoring calculator</Link>
            </Accordion>
            <Accordion title="Features">
              <Link href="/features/tutor-client-student-management">
                Tutor, client &amp; student management
              </Link>
              <Link href="/features/billing-and-payroll">
                Billing &amp; payroll
              </Link>
              <Link href="/features/calendar-and-scheduling">
                Calendar &amp; scheduling
              </Link>
              <Link href="/features/customization">Customization</Link>
              <Link href="/features">View all</Link>
            </Accordion>
            <Accordion title="About us">
              <Link href="/about">About</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/reviews">Reviews</Link>
              <Link href="/careers">Careers</Link>
              <Link href="/pricing">Pricing</Link>
            </Accordion>
            <Accordion title="Support">
              <Link href="/contact">Contact</Link>
              <Link href="/changes">Change log</Link>
              <Link href="https://help.tutorcruncher.com/en/" target="_blank">
                Help centre
              </Link>
            </Accordion>
          </div>
          <div className={styles.book}>
            <Action href="/book-a-call">Book a call</Action>
          </div>
          <div className={styles.socialLinks}>
            <FooterSocialLinks />
          </div>
          <div className={styles.legalLinks}>
            <Link href="https://api.tutorcruncher.com/" target="_blank">
              API Documentation
            </Link>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/sitemap">Sitemap</Link>
            <Link href="https://status.tutorcruncher.com" target="_blank">Status</Link>
          </div>
        </div>
        <div className={styles.end}>
          <p>
            © All rights reserved {new Date().getFullYear()}. TutorCruncher™
            and the TutorCruncher dinosaur logo are trademarks of TutorCruncher
            Limited (Company number 08385970) and may not be used or reproduced
            without consent of the owner.
          </p>
        </div>
      </div>
    </footer>
  );
};
