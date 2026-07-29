import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Ebook } from "@/components/features/ebook";
import { formatMetaData } from "@/helpers/metaData";
import { fetchAllEbooks, fetchEbookByUid } from "@/lib/prismic/ebook";

export async function generateMetadata({
  params,
}: {
  params: { uid: string };
}): Promise<Metadata> {
  try {
    const content = await fetchEbookByUid(params.uid);

    if (!content) return null;

    const url = `https://tutorcruncher.com/ebook/${params.uid}`;
    return formatMetaData(
      content.data.meta_title,
      content.data.meta_description,
      url
    );
  } catch {
    return null;
  }
}

export default async function EbookPage({
  params,
}: {
  params: { uid: string };
}) {
  try {
    const content = await fetchEbookByUid(params.uid);

    if (!content) {
      return notFound();
    }

    return <Ebook data={content.data} />;
  } catch {
    return notFound();
  }
}

export async function generateStaticParams() {
  try {
    const pages = await fetchAllEbooks();
    return pages.map((document) => ({
      uid: document.uid,
    }));
  } catch {
    console.error("Error fetching ebooks");
    return [];
  }
}
