export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}
export declare class DatabaseService {
    private db;
    constructor();
    private initializeDatabase;
    getChatHistory(chatId: string): ChatMessage[];
    saveChatMessage(chatId: string, message: ChatMessage): void;
    close(): void;
}
