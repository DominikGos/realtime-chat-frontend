import type Chat from "@/interfaces/Chat";
import type Message from "@/interfaces/Message";
import type User from "@/interfaces/User";
import { store } from "@/store";
import { watch } from "vue";

export function listenChats() {
  return watch(
    () => store.state.auth.chatsIds,
    (ids?: number[]) => {
      if (! ids) {
        return;
      }

      ids.forEach(chatId => {
        window.Echo.private(`chat.${chatId}`)
          .listen('MessageSent', (e: any) => {
            
            const message: Message = e.message;
            message.chat!.id = chatId

            store.commit('setNewMessage', message)
          })
          .listen('MessageRemoved', (e: any) => {
            const message: Message = e.removed_message;
            message.chat!.id = chatId

            store.commit('setRemovedMessage', message)
          })
      })
    }, {immediate: true}
  )
}

export function listenNewChats() {
   watch(
    () => store.state.auth.user,
    (authUser?: User) => {
      if (!authUser)
        return; 

      window.Echo.private(`new.chat.with.user.${authUser.id}`)
        .listen('ChatCreated', (e: any) => {
          const userChatsIds: number[] = store.state.auth.chatsIds;
          const createdChat: Chat = e.chat;

          store.commit('setUserChatsIds', [...userChatsIds, ...[createdChat.id]])
        })
    }, {immediate: true}
  )
}