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
const limit: number = 15;

async function loadChats(start: number): Promise<void> {
  loading.value = true;

  await chatService.getChats(start);

  loading.value = false;
  offset += limit;
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

await loadChats(offset);
</script>

<template>
  <div class="flex flex-col gap-3">
    
    <PanelItem :active="false" v-for="chat in chatList" :key="chat.id">
      <template v-slot:start>
        <Avatar :size="'medium'" :avatar="getFriend(chat.users)?.avatar_link"/>
      </template>
      <template v-slot:middle>
        <p>{{ getFriend(chat.users)?.first_name }} {{ getFriend(chat.users)?.last_name }}</p>
        <p v-if="chat.last_message?.text" class="text-gray-400 truncate w-2/3 lg:w-2/4 xl:w-4/6"> {{ chat.last_message.text }} </p>
        <p v-else-if="chat.last_message?.files_links" class="text-gray-400 truncate w-2/3 lg:w-2/4 xl:w-4/6"> sent files {{ `(${chat.last_message.files_links.length})`}} </p>
      </template>
      <template v-slot:end>
        <p class="text-xs">{{ chat.last_message?.created_at }}</p>
      </template>
    </PanelItem>
 
   
  </div>
</template>