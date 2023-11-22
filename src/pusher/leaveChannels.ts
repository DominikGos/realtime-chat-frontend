import type User from "@/interfaces/User";
import { store } from "@/store";

export function leaveChannels(authUser?: User): void {
    if( ! window.Echo) {
        return;
    }
    
    if(store.state.auth.chatsIds) {
        store.state.auth.chatsIds.forEach((chatId: number) => {
            window.Echo.leave(`chat.${chatId}`);
        })
    }

    if(authUser) {
        window.Echo.leave(`new.chat.with.user.${authUser.id}`);
    }

    window.Echo.leave('user.updated');
}