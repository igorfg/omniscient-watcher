import axios from "axios";
import 'dotenv/config';
import { MangaEntry } from "../types/MangaEntry";

const discordWebhookUrl = process.env.WEBHOOK_URL;

export const sendChapterToDiscord = async (chapter: MangaEntry, isNewChapter: boolean) => {
  const newChapterMessage = `New chapter available: ${chapter.url}`;
  const newMangaMessage = `New manga being tracked: ${chapter.url}`;

  const resp = await axios({
    method: 'POST',
    url: discordWebhookUrl,
    data: {
      content: isNewChapter ? newChapterMessage : newMangaMessage,
    }
  });
};