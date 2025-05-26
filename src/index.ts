import express from "express";
import { ListRelation } from "./types/ListRelation";
import { fetchLatestMDChapter, fetchMDList } from "./services/MangaDexService";
import { Chapter } from "./types/Chapter";
import { MangaEntry } from "./types/MangaEntry"
import { insertOrUpdateManga, getMangaById } from "./db/Manga";
import { sendChapterToDiscord } from "./services/DiscordService";

const getLatestChapters = async (): Promise<MangaEntry[]> => {
  const mangaDexList: ListRelation[] = await fetchMDList();
  
  const mangaDexChapters =  await Promise.all(mangaDexList.map( async (manga) => {
    const mangaDexChapter: Chapter = await fetchLatestMDChapter(manga.id);

    if (!mangaDexChapter) {
      return null;
    }

    const { id } = mangaDexChapter;
    const { externalUrl, chapter } = mangaDexChapter.attributes;

    return {
      mangaDexId: manga.id,
      mangaTitle: manga.attributes.title.en,
      currentChapter: Number(chapter),
      url: externalUrl ?? `https://mangadex.org/chapter/${id}`,
    }
  }));

  return mangaDexChapters.filter((chapter) => chapter !== null);
};

const checkAndUpdateMangaEntries = async () => {
  let latestChapters: MangaEntry[] = [];

  try {
    latestChapters = await getLatestChapters();
  } catch (error) {
    console.log(`Error fetching latest chapters: ${error}`);
  }

  latestChapters.forEach((chapter) => {
    const storedManga = getMangaById(chapter);
    const incomingChapter = Number(chapter?.currentChapter);
    const isNewManga = !storedManga;
    const isNewerChapter = storedManga && storedManga.current_chapter < incomingChapter;
    
    if (isNewManga || isNewerChapter) {
      if (isNewerChapter) {
        sendChapterToDiscord(chapter, true);
      } else {
        sendChapterToDiscord(chapter, false);
      }
      insertOrUpdateManga(chapter);
    }
  });
};

const app = express();

app.listen(5000, async () => {
  console.log("App is running!");

  await checkAndUpdateMangaEntries();
  setInterval(() => {
    checkAndUpdateMangaEntries();
  }, 15 * 60 * 1000);
});
