<script setup lang="ts">
import Message from './Message.vue';
import Avatar from '../Avatar.vue';
import FileWrapper from './FileWrapper.vue';
import type MessageInterface from '@/interfaces/Message';
import type User from '@/interfaces/User';
import { store } from '@/store';
import { computed, ref } from 'vue';

const props = defineProps<{
  message: MessageInterface,
}>();

const authUser: User = store.state.auth.user;
const userIsAuthor: boolean = authUser.id === props.message.user.id;

function openSettingsModal(): void {
  store.commit('setMessageSettings', { showSettings: true, message: props.message});
}

const settingsWrapperClasses = computed<string>(() => {
  return (userIsAuthor ? '-left-12' : '-right-12 flex-row-reverse') + ' group-hover:flex hidden p-2 h-full absolute items-center justify-end gap-1 opacity-70 w-12';
});

function setMessageToAnswer(): void {
  store.commit('setMessageToAnswer', props.message);
}

</script>

<template>
  <div :class="[userIsAuthor ? 'justify-end' : 'justify-start', 'flex']">
    <div :class="[userIsAuthor ? 'items-end' : 'items-start', 'group p-3 flex flex-col h-min max-w-[256px]']">
      <div class="flex gap-3 items-end relative">
        <div v-if="userIsAuthor === false">
          <Avatar :size="'small'" :avatar="message.user.avatar_link" />
        </div>
        <div class="flex flex-col gap-2">
          <Message v-if="message.text" :message="message" :userIsAuthor="userIsAuthor" />
          <FileWrapper v-if="message.files_links.length > 0" :filesLinks="message.files_links" />
        </div>
        <div
          :class="settingsWrapperClasses">
          <button v-if="userIsAuthor" @click="openSettingsModal">
            <i class="fa-solid fa-ellipsis-vertical p-2"></i>
          </button>
          <button @click="setMessageToAnswer" class="p-2">
            <i class="fa-solid fa-reply"></i>
          </button>
        </div>
      </div>
      <div :class="[userIsAuthor ? 'justify-start' : 'justify-end ', 'h-8 flex p-2']">
        <p class="text-xs">{{ message.created_at }}</p>
      </div>
    </div>
  </div>
</template>