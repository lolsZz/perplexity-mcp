"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const fs_1 = require("fs");
const path_1 = require("path");
const config_js_1 = require("../config.js");
const utils_js_1 = require("../utils.js");
class DatabaseService {
    db;
    constructor() {
        const dbPath = (0, utils_js_1.expandHomeDir)(config_js_1.config.db.path);
        const dbDir = (0, path_1.dirname)(dbPath);
        if (!(0, fs_1.existsSync)(dbDir)) {
            (0, fs_1.mkdirSync)(dbDir, { recursive: true });
        }
        this.db = new better_sqlite3_1.default(dbPath, { fileMustExist: false });
        this.initializeDatabase();
    }
    initializeDatabase() {
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
    getChatHistory(chatId) {
        return this.db
            .prepare("SELECT role, content FROM messages WHERE chat_id = ? ORDER BY created_at ASC")
            .all(chatId);
    }
    saveChatMessage(chatId, message) {
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
    close() {
        this.db.close();
    }
}
exports.DatabaseService = DatabaseService;
