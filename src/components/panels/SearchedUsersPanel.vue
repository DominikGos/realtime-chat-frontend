<script setup lang="ts">
import PanelItem from './PanelItem.vue';
import Avatar from '../Avatar.vue';
import ScrollBar from '../ScrollBar.vue';
import LoadingSpinner from '../LoadingSpinner.vue';
import { ref, watch } from 'vue';
import type User from '@/interfaces/User';
import UserServive from '@/services/UserService';
import { createChat } from '@/helpers/createChat';
import { store } from '@/store';

const props = defineProps<{
  userName?: string,
}>();

const userService: UserServive = new UserServive;
const users = ref<User[]>([]);
const delay: number = 1000;
let delayOver = ref<boolean>(true);

watch(
  () => props.userName,
  (name) => {
    if (!props.userName) {
      users.value = [];

      return;
    }

    if (delayOver.value) {
      delayOver.value = false;

      setTimeout(async () => {
        if (props.userName) {
          searchUsers(props.userName);
        }

        delayOver.value = true;
      }, delay);
    }
  }
)

async function searchUsers(userName: string): Promise<void> {
  await userService.searchUsers(userName);

  if (!userService.errors) {
    users.value = userService.data.users.filter((user: User) => {
      return user.id !== store.state.auth.user.id;
    })
  }
}
</script>

<template>
  <ScrollBar class="flex flex-col gap-3 pb-5 h-[calc(100%-94px)]">
    <TransitionGroup name="list">
      <PanelItem v-for="user in users" :key="user.id" @click="createChat(user.id!)">
        <template v-slot:start>
          <Avatar :size="'medium'" :active="user.signed_in" :avatar="user.avatar_link" />
        </template>
        <template v-slot:middle>
          <p>{{ user.first_name }} {{ user.last_name }}</p>
        </template>
      </PanelItem>
    </TransitionGroup>
    <Transition name="fade">
      <LoadingSpinner v-if="!delayOver" class="flex justify-center" />
    </Transition>
  </ScrollBar>
</template>