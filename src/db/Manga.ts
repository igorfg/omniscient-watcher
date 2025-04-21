import Database from 'better-sqlite3';
import path from 'path';
import { MangaEntry } from '../types/MangaEntry';
import { DatabaseManga } from '../types/DatabaseManga';

const db = new Database(path.join(__dirname, '../../data/omniscient-watcher.db'));

export const insertOrUpdateManga = (mangaEntry: MangaEntry) => {
  const { mangaDexId, currentChapter } = mangaEntry;

  const stmt = db.prepare(`
    INSERT INTO Manga (mangadex_id, current_chapter)
    VALUES (?, ?)
    ON CONFLICT(mangadex_id) DO UPDATE SET current_chapter = excluded.current_chapter
  `);

  stmt.run(mangaDexId, currentChapter);
};

export const getMangaById = (mangaEntry: MangaEntry): DatabaseManga | undefined => {
  const { mangaDexId } = mangaEntry;

  const stmt = db.prepare('SELECT * FROM Manga WHERE mangadex_id = ?');
  return stmt.get(mangaDexId) as DatabaseManga | undefined;
};
