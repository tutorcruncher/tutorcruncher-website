/**
 * Mailchimp signup config, lifted from the embed code for the TutorCruncher
 * audience. Hardcoded rather than driven from Prismic because every ebook
 * posts to the same audience — if a future ebook needs its own list, move
 * these onto the custom type.
 */
export const MAILCHIMP = {
  actionUrl:
    "https://tutorcruncher.us13.list-manage.com/subscribe/post?u=ea12d2871ca6b988ff70c3dbe&id=492dd26d91&f_id=0009d7ecf0",
  honeypotField: "b_ea12d2871ca6b988ff70c3dbe_492dd26d91",
  gdprHeading:
    "TutorCruncher will use the information you provide on this form to get in touch with marketing communications. Please let us know how you would like to hear from us:",
  gdprOptions: [
    { field: "gdpr[71425]", label: "Email marketing" },
    { field: "gdpr[71426]", label: "Relevant news and offers" },
    { field: "gdpr[71427]", label: "Blog updates" },
  ],
  /** Mailchimp marks the GDPR fieldset as required on this audience. */
  gdprRequired: true,
} as const;

export const FORM_COPY = {
  heading: "Get your free copy",
  submitLabel: "Send me the ebook",
  downloadLabel: "Download the ebook",
  successHeading: "Thank you!",
  successMessage:
    "Your download is ready. We've also sent a copy to your inbox.",
} as const;
