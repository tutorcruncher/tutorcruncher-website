import { notFound } from "next/navigation";
import { Metadata } from "next/types";

import { formatMetaData } from "@/helpers/metaData";
import { createClient } from "prismicio";
import { SliceZone } from "@prismicio/react";
import { components } from "slices";

export async function generateMetadata({ params }): Promise<Metadata> {
  try {
    const client = createClient();
    const { data } = await client.getByUID("feature", params.uid);

    const url = `https://tutorcruncher.com/features/${params.uid}`;

    return formatMetaData(data.meta_title, data.meta_description, url);
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const client = createClient();

  const features = await client.getAllByType("feature");

  return features.map((article) => ({
    uid: article.uid,
  }));
}

const FeaturePage = async ({ params }) => {
  try {
    const client = createClient();
    const content = await client.getByUID("feature", params.uid);
    return (
      <SliceZone
        slices={content.data.slices}
        components={components}
        context={{ showHeroActions: true }}
      />
    );
  } catch {
    return notFound();
  }
};

export default FeaturePage;
