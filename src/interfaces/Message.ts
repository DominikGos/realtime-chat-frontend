import type User from "./User";

export default interface Message {
    id?: number,
    text?: string,
    created_at?: string,
    updated_at?: string,
    files: string[],
    user: User,
}