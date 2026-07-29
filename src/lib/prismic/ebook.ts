import { createClient } from "prismicio";

import { EbookDocument } from "../../../prismicio-types";

export const fetchAllEbooks = async (): Promise<EbookDocument[]> => {
  const client = createClient();
  try {
    return await client.getAllByType("ebook");
  } catch (error) {
    console.error("Error fetching ebooks:", error);
    return [];
  }
};

export const fetchEbookByUid = async (
  uid: string
): Promise<EbookDocument | null> => {
  const client = createClient();
  try {
    return await client.getByUID("ebook", uid);
  } catch (error) {
    console.error("Error fetching ebook:", error);
    return null;
  }
};
