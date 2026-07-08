import { Metadata } from "next/types";

import { Community } from "@/components/features/community";
import { RenderSchemas } from "@/components/schema";
import { formatMetaData } from "@/helpers/metaData";
import { fetchCommunityPage } from "@/lib/prismic/community";

export async function generateMetadata(): Promise<Metadata> {
  const url = `https://tutorcruncher.com/community`;
  const { meta } = await fetchCommunityPage();

  return formatMetaData(
    meta.title || "Leaders in Tutoring Community | TutorCruncher",
    meta.description ||
      "Join the Leaders in Tutoring community. Meet like-minded education leaders to learn and grow together at our regular in-person and online events.",
    url
  );
}

const CommunityPage = async () => {
  const { content, schemas } = await fetchCommunityPage();

  return (
    <>
      <RenderSchemas schemas={schemas} />
      <Community content={content} />
    </>
  );
};

export default CommunityPage;
