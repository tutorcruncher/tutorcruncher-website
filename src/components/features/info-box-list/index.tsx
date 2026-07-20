"use client";
import clsx from "clsx";
import { useState } from "react";

import { Body } from "@/components/ui/body";
import { Heading } from "@/components/ui/heading";
import { Modal } from "@/components/ui/modal/modal";

import styles from "./info-box-list.module.scss";
import { InfoCard } from "@/components/ui/info-card";
import { Feature, InfoBoxListProps } from "./types";
import { ArrowLink } from "@/components/ui/arrow-link";
import { PrismicNextImage } from "@prismicio/next";

export const InfoBoxList = ({
  title,
  features,
  background,
}: InfoBoxListProps) => {
  const [selectedItem, setSelectedItem] = useState<Feature | null>(null);

  const handleCardClick = (integration) => {
    setSelectedItem(integration);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <Body background={background}>
        <Heading variant="h2" className={styles.title} center>
          {title}
        </Heading>
        <div className={clsx(styles.cards, "animate-children")}>
          {features.map((integration) => (
            <InfoCard
              key={integration.title}
              title={integration.title}
              intro={integration.intro}
              icon={integration.icon}
              variant="feature"
              onClick={() => handleCardClick(integration)}
              imageFilter
            />
          ))}
        </div>
        <div className="animate">
          <ArrowLink text="View all features" href="/features" />
        </div>
      </Body>
      {selectedItem ? (
        <Modal isOpen={true} onClose={closeModal}>
          <div className={styles.modal}>
            {selectedItem.icon ? (
              <PrismicNextImage
                field={selectedItem.icon}
                className={styles.icon}
                fallbackAlt=""
              />
            ) : null}
            <Heading size="small" variant="h2" noMargin>
              {selectedItem.title}
            </Heading>
            <div>{selectedItem.content}</div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};
