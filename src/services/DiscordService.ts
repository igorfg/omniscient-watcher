import axios from "axios";
import 'dotenv/config';
import { MangaEntry } from "../types/MangaEntry";

const discordWebhookUrl = process.env.WEBHOOK_URL;

export const sendChapterToDiscord = async (chapter: MangaEntry, isNewChapter: boolean) => {
  const newChapterMessage = `New ${chapter.mangaTitle} chapter available: ${chapter.url}`;
  const newMangaMessage = `${chapter.mangaTitle} is now being tracked: ${chapter.url}`;

  const maxRetries = 10;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      await axios({
        method: 'POST',
        url: discordWebhookUrl,
        data: {
          content: isNewChapter ? newChapterMessage : newMangaMessage,
        }
      });
      console.log('Message sent to Discord successfully.');
      return; // Exit function if successful
    } catch (e) {
      attempt++;
      console.log(`Attempt ${attempt} failed.`);

      if (axios.isAxiosError(e)) {
        const { data, status } = e.response || {};
        console.log('Response data:', data);
        console.log('Response status:', status);

        if (data?.retry_after) {
          const retryAfterMs = data.retry_after * 1000;
          console.log(`Rate limited. Waiting ${retryAfterMs}ms before retrying...`);
          await new Promise(resolve => setTimeout(resolve, retryAfterMs));
        } else {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      if (attempt >= maxRetries) {
        console.error('Max retries reached. Failed to send message.');
        throw e;
      }
    }
  }
};