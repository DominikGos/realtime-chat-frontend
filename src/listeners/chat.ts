import type Message from "@/interfaces/Message";
import { store } from "@/store";
import { watch } from "vue";

export function listenChats() {
    return watch(
        () => store.state.auth.chatsIds,
        (ids?: number[]) => {
          if (!ids?.length) {
            return;
          }
      
          ids.forEach(chatId => {
            window.Echo.private(`chat.${chatId}`)
              .listen('MessageSent', (e: any) => {
                const message: Message = e.message;
                message.chat_id = chatId
      
                store.commit('setNewMessage', message)
              })
              .listen('MessageRemoved', (e: any) => {
                const message: Message = e.removed_message;
                message.chat_id = chatId
      
                store.commit('setRemovedMessage', message)
              })
          })
        }
      )
}