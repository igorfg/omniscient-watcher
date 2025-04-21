import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const db = new Database(path.join(dataDir, 'omniscient-watcher.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS Manga (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mangadex_id TEXT UNIQUE NOT NULL,
    current_chapter INTEGER
  );
`);

console.log('✅ Manga table initialized!');
