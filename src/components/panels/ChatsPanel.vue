<script setup lang="ts">
import PanelItem from './PanelItem.vue';
import Avatar from '../Avatar.vue';
import { computed, onBeforeMount, ref, watch } from 'vue';
import ChatService from '@/services/ChatService';
import type Chat from '@/interfaces/Chat';
import type User from '@/interfaces/User';
import { store } from '@/store';
import type Message from '@/interfaces/Message';

const chatService: ChatService = new ChatService;
const chats = ref<Chat[]>([]);
const loading = ref(false);
let offset: number = 0;

watch(
  () => store.state.broadcastedData.newMessage,
  (newMessageResource?: Message) => {
    if (!newMessageResource)
      return;

    let chatWithNewMessageIndex: number | undefined;

    chats.value.forEach((chat: Chat, index: number) => {
      if (chat.id === newMessageResource.chat!.id) {
        chatWithNewMessageIndex = index;
        const chatWithNewMessage: Chat = newMessageResource.chat!
        chatWithNewMessage.last_message = newMessageResource
        chats.value.splice(index, 1);
        chats.value.unshift(chatWithNewMessage)
      }
    })

    if (typeof chatWithNewMessageIndex !== 'number') {
      const chatWithNewMessage: Chat = newMessageResource.chat!
      chatWithNewMessage.last_message = newMessageResource
      chats.value.unshift(chatWithNewMessage)
    }
  }
)

watch(
  () => store.state.broadcastedData.removedMessage,
  (removedMessageResource?: Message) => {
    if (!removedMessageResource)
      return;

    chats.value.forEach((chat: Chat, index: number) => {
      if (chat.id === removedMessageResource.chat!.id) {
        const chatWithRemovedMessage: Chat = chat;
        chatWithRemovedMessage.last_message = {
          user: removedMessageResource.user,
          text: 'Removed message.',
          files_links: []
        };

        chats.value[index] = chatWithRemovedMessage;
      }
    })
  }
)

async function loadChats(start: number): Promise<void> {
  loading.value = true;

  await chatService.getChats(start);

  loading.value = false;
  chats.value = [...chats.value, ...chatService.data.chats];
}

function getFriend(chatMembers: User[]): User {
  const friend: User = chatMembers.filter((user) => {
    return user.id != store.state.auth.user?.id;
  })[0];

  return friend;
}

const chatList = computed<Chat[]>(() => {
  let chatList: Chat[] = chats.value.filter((chat) => {
    return chat.last_message;
  })

  return chatList;
})

function lastMessage(message: Message): string {
  let lastMessage: string = '';
  let authorName: string = message.user.id == store.state.auth.user?.id
    ? 'you'
    : `${message.user.first_name} ${message.user.last_name}`;

  if (message.text)
    lastMessage = `${authorName}: ${message.text}`
  else if (message.files_links.length > 0)
    lastMessage = `${authorName}: sent files(${message.files_links.length})`

  return lastMessage;
}

async function setChat(chat: Chat) {
  store.commit('setChat', chat);
}

await loadChats(offset);
</script>

<template>
  <div
    class="flex flex-col gap-3 pb-5 overflow-y-scroll h-[calc(100%-94px)] scrollbar-thin scrollbar-thumb-gray-300 overflow-hidden">
    <TransitionGroup name="list">
      <PanelItem v-for="chat in chatList" :key="chat.id" @click="setChat(chat)"
        :active="chat?.id == store.state.components.chat?.id">
        <template v-slot:start>
          <Avatar :size="'medium'" :active="getFriend(chat.users)?.signed_in"
            :avatar="getFriend(chat.users)?.avatar_link" />
        </template>
        <template v-slot:middle>
          <p>{{ getFriend(chat.users)?.first_name }} {{ getFriend(chat.users)?.last_name }}</p>
          <p class="text-gray-400 truncate w-[calc(100%-60px)]"> {{ lastMessage(chat.last_message!) }} </p>
        </template>
        <template v-slot:end>
          <p class="text-xs">{{ chat.last_message?.created_at }}</p>
        </template>
      </PanelItem>
    </TransitionGroup>
    <p v-if="(!loading) && chatList.length === 0" class="text-sm text-center">You have no any conversations.</p>
  </div>
</template>