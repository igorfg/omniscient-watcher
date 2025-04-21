import axios from "axios";
import 'dotenv/config';
import { ListRelation } from "../types/ListRelation";

const baseUrl = 'https://api.mangadex.org';
const headers = {
  'Content-Type': 'application/json',
}

export const fetchMDList = async () => {
  const listId = process.env.MANGADEX_LIST_ID;

  try {
    const resp = await axios({
      method: 'GET',
      url: `${baseUrl}/list/${listId}`,
      params: {
        includes: ['manga']
      },
      headers,
    });
    const relationships = resp.data.data.relationships;
    return relationships.filter((relationship: ListRelation) => relationship.type === 'manga');
  } catch (error) {
    console.log(`Error fetching MDList`);
    return [];
  }

};

export const fetchLatestMDChapter = async (id: string) => {
  const resp = await axios({
    method: 'GET',
    url: `${baseUrl}/manga/${id}/feed`,
    params: {
      translatedLanguage: ['en'],
      order: {
        chapter: 'desc'
      },
      includeFuturePublishAt: 0,
      limit: 1,
    },
    headers,
  });

  return resp.data.data[0];
};
