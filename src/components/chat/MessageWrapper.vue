<script setup lang="ts">
import Message from './Message.vue';
import Avatar from '../Avatar.vue';
import FileWrapper from './FileWrapper.vue';
import type MessageInterface from '@/interfaces/Message';
import type User from '@/interfaces/User';
import { store } from '@/store';
import { ref } from 'vue';
import MessageSettings from './MessageSettings.vue';
import CustomButton from '../buttons/CustomButton.vue';
import MessageService from '@/services/MessageService'

const props = defineProps<{
  message: MessageInterface,
}>();

const messageService: MessageService = new MessageService;
const authUser: User = store.state.auth.user;
const userIsAuthor: Boolean = authUser.id === props.message.user.id;
const showSettings = ref(false);
const loadingDeletion = ref(false);

async function deleteMessage(message: MessageInterface): Promise<void> {
  loadingDeletion.value = true;
  
  await messageService.deleteMessage(store.state.components.chat.id, message.id!);
  
  loadingDeletion.value = false;
  showSettings.value = false;
}
</script>

<template>
  <div :class="[userIsAuthor ? 'justify-end' : 'justify-start', 'flex']">
    <Transition name="fade">
      <MessageSettings v-if="showSettings">
        <CustomButton :color="'red'" @click="deleteMessage(message)" :loading="loadingDeletion">Delete</CustomButton>
        <button class="text-center text-sm" @click="showSettings = false">Close</button>
      </MessageSettings>
    </Transition>
    <div class="p-3 flex flex-col h-min  max-w-[256px] ">
      <div class="flex gap-3 items-end relative">
        <div v-if="userIsAuthor === false">
          <Avatar :size="'small'" :avatar="message.user.avatar_link" />
        </div>
        <div v-if="userIsAuthor" class="h-full absolute flex items-center p-3 -left-6">
          <button @click="showSettings = ! showSettings">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
        </div>
        <div class="flex flex-col gap-2">
          <Message v-if="message.text" :message="message" :userIsAuthor="userIsAuthor" />
          <FileWrapper v-if="message.files_links.length > 0" :filesLinks="message.files_links" />
        </div>
      </div>
      <div :class="[userIsAuthor ? 'justify-start' : 'justify-end ', 'h-8 flex p-2']">
        <p class="text-xs">{{ message.created_at }}</p>
      </div>
    </div>
  </div>
</template>