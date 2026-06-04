"use client";
import { EmblaOptionsType } from "embla-carousel";
import ClassNames from "embla-carousel-class-names";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";

import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";

import { Testimonial } from "../testimonial";
import { ITestimonialsProps } from "../types";
import styles from "./testimonial-slider.module.scss";

export const TestimonialSlider = ({
  heading,
  testimonials,
  background = "blue",
}: ITestimonialsProps) => {
  const options: EmblaOptionsType = { loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [ClassNames()]);

  return (
    <Body
      containerSize="screenWidth"
      background={background}
      spacing="small"
      heading={
        <Heading variant="div" size="xlarge" center>
          {heading}
        </Heading>
      }
    >
      <section className={styles.embla}>
        <div className={styles.embla__viewport} ref={emblaRef}>
          <div className={styles.embla__container}>
            {testimonials.map((item, index) => (
              <>
                <div className={styles.embla__slide} key={index}>
                  <Testimonial
                    shortTestimonial={item.shortTestimonial}
                    companyLogo={item.companyLogo}
                    companyName={item.companyName}
                    reviewerImage={item.reviewerImage}
                    reviewerName={item.reviewerName}
                    reviewerRole={item.reviewerRole}
                  />
                </div>
              </>
            ))}
          </div>
        </div>

        <div className={styles.arrows}>
          <button
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous testimonial"
          >
            <svg
              width="81"
              height="81"
              viewBox="0 0 81 81"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <g id="Group 1321322613">
                <rect
                  id="Rectangle 346251959"
                  width="80.6602"
                  height="80.6602"
                  rx="26.8867"
                  transform="matrix(-1 0 0 1 80.7188 0)"
                  fill="#362E83"
                />
                <path
                  id="&#226;&#134;&#146;"
                  d="M55.5078 38.2761H30.5366L39.5706 29.2421L37.1843 26.8984L23.9316 40.1511L37.1843 53.4037L39.5706 51.0173L30.5366 42.026H55.5078V38.2761Z"
                  fill="#FFFDF6"
                />
              </g>
            </svg>
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next testimonial"
          >
            <svg
              width="82"
              height="81"
              viewBox="0 0 82 81"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <rect
                width="80.6602"
                height="80.6602"
                rx="26.8867"
                transform="matrix(1 0 0 -1 0.664062 81)"
                fill="#362E83"
              />
              <path
                d="M25.875 42.7239H50.8462L41.8122 51.7579L44.1986 54.1016L57.4512 40.8489L44.1986 27.5963L41.8122 29.9827L50.8462 38.974H25.875L25.875 42.7239Z"
                fill="#FFFDF6"
              />
            </svg>
          </button>
        </div>
      </section>
    </Body>
  );
};
