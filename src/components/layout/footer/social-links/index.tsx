import { IconButtonLink } from "@/components/ui/icon-button-link";
import { Facebook } from "@/svgs/facebook";
import { LinkedIn } from "@/svgs/linkedin";

export const socials = [
  {
    outlet: "Facebook",
    href: "https://www.facebook.com/TutorCruncher",
    label: "Visit our Facebook page",
    icon: <Facebook />,
  },
  {
    outlet: "LinkedIn",
    href: "https://www.linkedin.com/company/tutorcruncher",
    label: "Visit our LinkedIn profile",
    icon: <LinkedIn />,
  },
];

export const FooterSocialLinks = () => {
  return (
    <>
      {socials.map((social) => (
        <IconButtonLink
          key={social.outlet}
          href={social.href}
          ariaLabel={social.label}
        >
          {social.icon}
        </IconButtonLink>
      ))}
    </>
  );
};
