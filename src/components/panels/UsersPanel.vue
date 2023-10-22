<script setup lang="ts">
import PanelItem from './PanelItem.vue';
import Avatar from '../Avatar.vue';
import { ref, onBeforeMount } from 'vue';
import { store } from '@/store';
import type User from '@/interfaces/User';
import UserService from '@/services/UserService';
import ChatService from '@/services/ChatService';

const userService = new UserService;
const chatService = new ChatService;
const users = ref<User[]>([]);
const loading = ref(false);
let offset = 0;
const limit = 15;

await loadUsers(offset);

async function loadUsers(start: number): Promise<void> {
  loading.value = true;

  await userService.getUsers(start);

  loading.value = false;
  offset += limit;
  users.value = [...users.value, ...userService.data.users];
}

function loadAfterScroll(e: any): void {  
  setTimeout(async () => {
    if(loading.value) {
      return;
    }  

    const panelTemplate = e.target as HTMLDivElement;
    
    if(panelTemplate.scrollTop + panelTemplate.clientHeight === panelTemplate.scrollHeight) {
      await loadUsers(offset);
    }
  }, 1000);
}

async function createChat(friendId: number): Promise<void> {
  await chatService.createChat(friendId);

  store.commit('setChat', chatService.data.chat);
}
</script>

<template>
  <div @scroll="loadAfterScroll" class="flex flex-col gap-3 pb-5 overflow-y-scroll h-[calc(100%-94px)] scrollbar-thin scrollbar-thumb-gray-300 overflow-hidden">
    <PanelItem v-for="user in users" :key="user.id" @click="createChat(user.id!)">
      <template v-slot:start>
        <Avatar :size="'medium'" :avatar="user.avatar_link" />
      </template>
      <template v-slot:middle>
        <p>{{ user.first_name }} {{ user.last_name }}</p>
      </template>
    </PanelItem>
  </div>
</template>