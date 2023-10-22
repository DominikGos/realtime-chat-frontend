<script setup lang="ts">
import PanelItem from './PanelItem.vue';
import Avatar from '../Avatar.vue';
import { ref, onBeforeMount } from 'vue';
import type User from '@/interfaces/User';
import UserService from '@/services/UserService';

const users = ref<User[]>([]);
const userService = new UserService;
const loading = ref(false);
const newUsersLength = ref();
let offset = 0;
const limit = 15;

await loadUsers(offset);

async function loadUsers(start: number) {
  loading.value = true;

  await userService.getUsers(start);

  loading.value = false;
  offset += limit;
  newUsersLength.value = userService.data.users.length;
  users.value = [...users.value, ...userService.data.users];
}

function loadAfterScroll(e: any) {  
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
</script>

<template>
  <div @scroll="loadAfterScroll" class="flex flex-col gap-3 pb-5 overflow-y-scroll h-[calc(100%-94px)] scrollbar-thin scrollbar-thumb-gray-300 overflow-hidden">
    <PanelItem v-for="user in users" :key="user.id">
      <template v-slot:start>
        <Avatar :size="'medium'" :avatar="user.avatar_link" />
      </template>
      <template v-slot:middle>
        <p>{{ user.first_name }} {{ user.last_name }}</p>
      </template>
    </PanelItem>
  </div>
</template>