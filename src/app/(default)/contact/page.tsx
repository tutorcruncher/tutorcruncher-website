import { Metadata } from "next/types";

import { ContactForm } from "@/components/features/contact-form";
import { LocationsList } from "@/components/features/locations/locations-list";
import { Hero } from "@/components/ui/hero";
import { formatMetaData } from "@/helpers/metaData";
import { fetchContactPage } from "@/lib/prismic/contact";
import { RenderSchemas } from "@/components/schema";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await fetchContactPage();

  const url = `https://tutorcruncher.com/contact`;

  return formatMetaData(meta.title, meta.description, url);
}

const ContactPage = async () => {
  const { heading, subheading, content, locations, schemas } =
    await fetchContactPage();
  return (
    <>
      <RenderSchemas schemas={schemas} />
      <Hero heading={heading} intro={subheading} />
      <ContactForm content={content} />
      <LocationsList locations={locations} />
    </>
  );
};

export default ContactPage;
