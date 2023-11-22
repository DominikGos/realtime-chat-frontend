import { store } from "@/store";

export function leaveChats(): void {
    store.state.auth.chatsIds.forEach((chatId: number) => {
        window.Echo.leave(`chat.${chatId}`)
    })
}