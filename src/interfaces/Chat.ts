import type Message from "./Message";
import type User from "./User";

export default interface Chat {
    id: number,
    created_at?: string,
    updated_at?: string,
    last_message?: Message,
    users: User[],
}