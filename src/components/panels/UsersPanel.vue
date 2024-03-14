<script setup lang="ts">
import PanelItem from './PanelItem.vue';
import Avatar from '../Avatar.vue';
import PanelScrollBar from './PanelScrollBar.vue';
import { ref, computed, watch } from 'vue';
import { store } from '@/store';
import type User from '@/interfaces/User';
import UserService from '@/services/UserService';
import { createChat } from '@/helpers/createChat';

const userService: UserService = new UserService;
const users = ref<User[]>([]);
const loading = ref(false);
let offset: number = 0;
const limit: number = 15;
const loadingUsersDelay: number = 1000;
const userDelayOver = ref<boolean>(true);

watch(
  () => store.state.broadcastedData.updatedUser,
  (updatedUserResource?: User) => {
    if (!updatedUserResource)
      return;

      setUpdatedUser(updatedUserResource);
  }
)

function setUpdatedUser(updatedUserResource: User): void {
  users.value.forEach((user: User, index: number) => {
    if (user.id === updatedUserResource.id) {
      users.value[index] = updatedUserResource;
    }
  })
}

async function loadUsers(start: number): Promise<void> {
  loading.value = true;

  await userService.getUsers(start, limit);

  loading.value = false;

  if (userService.data.users.length > 0) {
    users.value = [...users.value, ...userService.data.users];
    offset += userService.data.users.length;
  }
}

function loadAfterScroll(e: any): void {
  if (userDelayOver.value) {
    userDelayOver.value = false;

    setTimeout(async () => {
      const panelTemplate = e.target as HTMLDivElement;

      if (panelTemplate.scrollTop + panelTemplate.clientHeight === panelTemplate.scrollHeight) {
        await loadUsers(offset);
      }

      userDelayOver.value = true;
    }, loadingUsersDelay);
  }
}

const userList = computed<User[]>(() => {
  let userList: User[] = users.value.filter((user) => {
    return user.id != store.state.auth.user?.id;
  })

  return userList;
})

await loadUsers(offset);
</script>

<template>
  <PanelScrollBar @scroll="loadAfterScroll">
    <PanelItem v-for="user in userList" :key="user.id" @click="createChat(user.id!)">
      <template v-slot:start>
        <Avatar :size="'medium'" :active="user.signed_in" :avatar="user.avatar_link" />
      </template>
      <template v-slot:middle>
        <p>{{ user.first_name }} {{ user.last_name }}</p>
      </template>
    </PanelItem>
  </PanelScrollBar>
</template>