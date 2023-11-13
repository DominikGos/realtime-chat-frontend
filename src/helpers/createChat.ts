import type Chat from "@/interfaces/Chat";
import ChatService from "@/services/ChatService";
import { store } from "@/store";

const chatService: ChatService = new ChatService;

export async function createChat(friendId: number): Promise<void> {
    await chatService.createChat(friendId);
  
    const userChatsIds: number[] = store.state.auth.chatsIds;
    const createdChat: Chat = chatService.data.chat;
  
    store.commit('setChat', chatService.data.chat);
    store.commit('setUserChatsIds', [...userChatsIds, ...[createdChat.id]])
  }