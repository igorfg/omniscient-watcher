import axios from "axios";
import 'dotenv/config';
import { MangaEntry } from "../types/MangaEntry";

const discordWebhookUrl = process.env.WEBHOOK_URL;

export const sendChapterToDiscord = async (chapter: MangaEntry, isNewChapter: boolean) => {
  const newChapterMessage = `New ${chapter.mangaTitle} chapter available: ${chapter.url}`;
  const newMangaMessage = `${chapter.mangaTitle} is now being tracked: ${chapter.url}`;

  await axios({
    method: 'POST',
    url: discordWebhookUrl,
    data: {
      content: isNewChapter ? newChapterMessage : newMangaMessage,
    }
  });
};