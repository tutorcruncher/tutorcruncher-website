export interface GdprOption {
  /** Mailchimp field name, e.g. `gdpr[71425]`. */
  field: string;
  /** Visible label, e.g. "Email marketing". */
  label: string;
}

export interface EbookFormProps {
  heading?: string;
  actionUrl?: string;
  honeypotField?: string;
  /**
   * Mailchimp GDPR consent checkboxes. Rendered unticked so consent is an
   * affirmative act, and only submitted when the visitor actually ticks them.
   */
  gdprOptions?: GdprOption[];
  /** Intro copy shown above the consent checkboxes. */
  gdprHeading?: string;
  /** Require at least one consent box before the form can be submitted. */
  gdprRequired?: boolean;
  collectFirstName?: boolean;
  collectLastName?: boolean;
  collectCompany?: boolean;
  submitLabel?: string;
  onSuccess: () => void;
}
