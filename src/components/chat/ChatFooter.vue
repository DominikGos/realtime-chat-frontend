<script setup lang="ts">
import { ref, computed } from 'vue';
import FormFile from './FormFile.vue'
import type Message from '@/interfaces/Message';
import { store } from '@/store';
import MessageService from '@/services/MessageService';
import type Chat from '@/interfaces/Chat';
import LoadingSpinner from '../LoadingSpinner.vue';

const messageService: MessageService = new MessageService;
const chat: Chat = store.state.components.chat;
const message = ref<Message>({
  user: store.state.auth.user,
  files_links: [],
});

const showSendButton = ref<boolean>(false);
const messageSending = ref<boolean>(false);

async function sendMessage(): Promise<void> {
  messageSending.value = true;

  await messageService.createMessage(chat.id, message.value)

  messageSending.value = false;

  if ( ! messageService.hasAnyErrors) {
    message.value.text = undefined;
    message.value.files_links = [];
    message.value.created_at = undefined;
  }

  changeSendButtonVisibility();
}

function changeSendButtonVisibility(): void {
  if (message.value.files_links.length > 0)
    showSendButton.value = true;
  else if (message.value.text && message.value.text.length > 0)
    showSendButton.value = true
  else
    showSendButton.value = false
}

async function addFile(e: Event): Promise<void> {
  const input = e.target as HTMLInputElement;

  await messageService.createFile(input.files!);

  if ( ! messageService.hasAnyErrors) {
    message.value.files_links = [...message.value.files_links, ...messageService.data.files_links];
  }

  input.value = '';
  changeSendButtonVisibility();
}

async function removeFile(fileLink: string): Promise<void> {
  await messageService.removeFile(fileLink);

  if ( ! messageService.hasAnyErrors) {
    const index: number = message.value.files_links.indexOf(fileLink);
    message.value.files_links.splice(index, 1)
  }

  changeSendButtonVisibility();
}

const textInputClasses = computed<string>(() => {
  let classes: string = 'peer py-2 pl-3 pr-10 w-full shadow-md border-r border-l border-b border-gray-100 focus:shadow-none focus:border-gray-300 bg-gray-100 focus:bg-white focus:outline-none text-gray-800 transition duration-300 ease-in ';

  if (message.value.files_links.length > 0) {
    classes += 'rounded-bl-3xl rounded-br-3xl'
  } else {
    classes += 'rounded-full border-t'
  }

  return classes;
});
</script>

<template>
  <form @submit.prevent="sendMessage" 
    class="flex gap-3 ps-3 pe-3 items-center w-full border-t-2 border-gray-100 bg-white ">
    <div class="flex gap-2 items-center">
      <input @change="addFile" type="file" ref="file" id="file" class="hidden" multiple />
      <label for="file" class="cursor-pointer">
        <i class="fa-regular fa-image text-cyan-400"></i>
      </label>
    </div>
    <div class="flex flex-col-reverse w-full overflow-hidden p-3">
      <input @input="changeSendButtonVisibility" v-model="message.text" :class="textInputClasses" type="text" :disabled="messageSending"
        placeholder="Type your message ..." />
      <div v-if="message.files_links.length > 0"
        class="flex gap-2 peer-focus:bg-white peer-focus:border-t shadow-md peer-focus:shadow-none peer-focus:border-r peer-focus:border-l peer-focus:border-b-transparent border border-transparent  peer-focus:border-gray-300 transition duration-300 ease-in overflow-x-auto bg-gray-100 p-3 rounded-tl-2xl rounded-tr-2xl scrollbar-thin scrollbar-thumb-gray-300">
        <FormFile v-for="fileLink in message.files_links" @removeFile="removeFile" :fileLink="fileLink" />
      </div>
    </div>
    <Transition name="fade">
      <button v-if="showSendButton">
        <LoadingSpinner v-if="messageSending" />
        <i v-else class="fa-solid fa-paper-plane text-cyan-400 w-6 h-6 min-w-[1.5rem] min-h-[1.5rem]"></i>
      </button>
    </Transition>
  </form>
</template>