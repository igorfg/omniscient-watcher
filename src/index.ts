import express from "express";
import 'dotenv/config';
import { ListRelation } from "./types/ListRelation";
import { fetchLatestMDChapter, fetchMDList } from "./services/MangaDexService";
import { Chapter } from "./types/Chapter";

const app = express();

app.listen(5000, async () => {
  console.log("App is running!");
  const mangaDexList: ListRelation[] = await fetchMDList();
  
  const chapterLinks = await Promise.all(mangaDexList.map( async (manga) => {
    const chapter: Chapter = await fetchLatestMDChapter(manga.id);
    const { id } = chapter;
    const { externalUrl } = chapter.attributes;

    return externalUrl ?? `https://mangadex.org/chapter/${id}`;
  }));

  console.log(chapterLinks);

});
