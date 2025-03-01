import Database from "better-sqlite3";
import { existsSync, mkdirSync } from "fs";
import { dirname } from "path";
import { config } from "../config.js";
import { expandHomeDir } from "../utils.js";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export class DatabaseService {
  private db: Database.Database;

  constructor() {
    const dbPath = expandHomeDir(config.db.path);
    const dbDir = dirname(dbPath);

    if (!existsSync(dbDir)) {
      mkdirSync(dbDir, { recursive: true });
    }

    this.db = new Database(dbPath, { fileMustExist: false });
    this.initializeDatabase();
  }

  private initializeDatabase() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS chats (
        id TEXT PRIMARY KEY,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chat_id TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (chat_id) REFERENCES chats(id)
      );
    `);
  }

  public getChatHistory(chatId: string): ChatMessage[] {
    return this.db
      .prepare("SELECT role, content FROM messages WHERE chat_id = ? ORDER BY created_at ASC")
      .all(chatId) as ChatMessage[];
  }

  public saveChatMessage(chatId: string, message: ChatMessage): void {
    const transaction = this.db.transaction(() => {
      this.db
        .prepare("INSERT OR IGNORE INTO chats (id) VALUES (?)")
        .run(chatId);

      this.db
        .prepare("INSERT INTO messages (chat_id, role, content) VALUES (?, ?, ?)")
        .run(chatId, message.role, message.content);
    });

    transaction();
  }

  public close(): void {
    this.db.close();
  }
}
