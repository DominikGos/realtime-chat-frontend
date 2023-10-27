<script setup lang="ts">
import PanelItem from './PanelItem.vue';
import Avatar from '../Avatar.vue';
import { computed, onBeforeMount, ref } from 'vue';
import ChatService from '@/services/ChatService';
import type Chat from '@/interfaces/Chat';
import type User from '@/interfaces/User';
import { store } from '@/store';

const chatService: ChatService = new ChatService;
const chats = ref<Chat[]>([]);
const loading = ref(false);
let offset: number = 0;

async function loadChats(start: number): Promise<void> {
  loading.value = true;

  await chatService.getChats(start);

  loading.value = false;
  chats.value = [...chats.value, ...chatService.data.chats];
}

function getFriend(chatMembers: User[]): User {
  const friend: User = chatMembers.filter((user) => {
    return user.id != store.state.auth.user.id;
  })[0];

  return friend;
}

const chatList = computed<Chat[]>(() => {
  let chatList: Chat[] = chats.value.filter((chat) => {
    return chat.last_message;
  })

  return chatList;
})

async function setChat(chat: Chat) {
  store.commit('setChat', chat); 
}

await loadChats(offset);
</script>

<template>
  <div class="flex flex-col gap-3 pb-5 overflow-y-scroll h-[calc(100%-94px)] scrollbar-thin scrollbar-thumb-gray-300 overflow-hidden">
    <PanelItem v-for="chat in chatList" :key="chat.id" @click="setChat(chat)" :active="chat.id == store.state.components.chat.id">
      <template v-slot:start>
        <Avatar :size="'medium'" :avatar="getFriend(chat.users)?.avatar_link"/>
      </template>
      <template v-slot:middle>
        <p>{{ getFriend(chat.users)?.first_name }} {{ getFriend(chat.users)?.last_name }}</p>
        <p v-if="chat.last_message?.text" class="text-gray-400 truncate w-[calc(100%-60px)]"> {{ chat.last_message.text }} </p>
        <p v-else-if="chat.last_message?.files_links" class="text-gray-400 truncate w-[calc(100%-60px)]"> sent files {{ `(${chat.last_message.files_links.length})`}} </p>
      </template>
      <template v-slot:end>
        <p class="text-xs">{{ chat.last_message?.created_at }}</p>
      </template>
    </PanelItem>
  </div>
</template>