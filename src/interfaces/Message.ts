import type Chat from "./Chat";
import type User from "./User";

export default interface Message {
    id?: number,
    text?: string,
    created_at?: string,
    updated_at?: string,
    files_links: string[],
    answer_to_message?: Message,
    answer_to_message_id?: number,
    user: User,
    chat?: Chat,
}