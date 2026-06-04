import type { ReactNode } from "react";

import { BackgroundColour } from "@/types/backgroundColor";

export interface ITestimonialProps {
  testimonial: ReactNode;
  shortTestimonial: string;
  reviewerImage?: {
    url: string;
    alt?: string;
    width: number;
    height: number;
  };
  companyLogo?: {
    url: string;
    alt?: string;
    width: number;
    height: number;
  };
  companyName: string;
  reviewerName: string;
  reviewerRole: string;
}

export interface ITestimonialsProps {
  heading: ReactNode;
  testimonials: ITestimonialProps[];
  background?: BackgroundColour;
}
