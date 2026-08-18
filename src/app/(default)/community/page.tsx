import { Metadata } from "next";
import { notFound } from "next/navigation";

import { CommunityHero } from "@/components/features/community/community-hero";
import { CommunityIntro } from "@/components/features/community/community-intro";
import { CommunityNewsletter } from "@/components/features/community/community-newsletter";
import { EventsSection } from "@/components/features/community/events-section";
import { formatMetaData } from "@/helpers/metaData";
import { fetchCommunityPage } from "@/lib/prismic/community";
import { RenderSchemas } from "@/components/schema";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { data } = await fetchCommunityPage();
    const url = "https://tutorcruncher.com/community";

    return formatMetaData(data.meta_title, data.meta_description, url);
  } catch {
    return formatMetaData(null, null, null);
  }
}

export default async function CommunityPage() {
  try {
    const { data, upcomingEvents, previousEvents, schemas } =
      await fetchCommunityPage();

    return (
      <>
        <RenderSchemas schemas={schemas} />
        <CommunityHero
          eyebrow={data.hero_eyebrow}
          heading={data.hero_heading}
          subheading={data.hero_subheading}
          buttonText={data.hero_button_text}
          buttonLink={data.hero_button_link}
        />
        <CommunityIntro
          heading={data.intro_heading}
          content={data.intro_content}
          image={data.intro_image}
        />
        {upcomingEvents.length ? (
          <EventsSection
            title={data.upcoming_events_title || "Upcoming events"}
            events={upcomingEvents}
            upcoming
          />
        ) : null}
        {previousEvents.length ? (
          <EventsSection
            title={data.previous_events_title || "Catch up on previous events"}
            events={previousEvents}
          />
        ) : null}
        <CommunityNewsletter
          eyebrow={data.newsletter_eyebrow}
          heading={data.newsletter_heading}
          description={data.newsletter_description}
          buttonText={data.newsletter_button_text}
        />
      </>
    );
  } catch {
    return notFound();
  }
}
