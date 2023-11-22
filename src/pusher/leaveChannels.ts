import type User from "@/interfaces/User";
import { store } from "@/store";

export function leaveChannels(authUser: User): void {
    store.state.auth.chatsIds.forEach((chatId: number) => {
        window.Echo.leave(`chat.${chatId}`);
    })

    window.Echo.leave(`new.chat.with.user.${authUser.id}`);

    window.Echo.leave('user.updated');
}