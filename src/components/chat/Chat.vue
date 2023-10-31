<script setup lang="ts">
import ChatHeader from './ChatHeader.vue';
import ChatFooter from './ChatFooter.vue';
import MessageWrapper from './MessageWrapper.vue';
import { onErrorCaptured, ref, watch } from 'vue';
import { store } from '@/store';
import type Chat from '@/interfaces/Chat';
import type User from '@/interfaces/User';
import type Message from '@/interfaces/Message';
import Avatar from '../Avatar.vue';
import MessageService from '@/services/MessageService'
import ChatError from './ChatError.vue';
import FileModal from '../FileModal.vue';

const chat = ref<Chat>();
const friend = ref<User>();
const messageService = new MessageService;
const messages = ref<Message[]>([]);
const messagesLoading = ref(false);
let messagesOffset = 0;
const messagesLimit = 15;

watch(
  () => store.state.components.chat,
  async (chatResource) => {
    if (!chatResource)
      return;

    chat.value = chatResource
    friend.value = setFriend(chat.value!.users);

    await loadMessages(messagesOffset);

  }, { immediate: true }
)

watch(
  () => store.state.auth.newMessage,
  async (newMessageResource?: Message) => {
    if (!newMessageResource)
      return;

    if (chat.value?.id === newMessageResource.chat_id) {
      messages.value.unshift(newMessageResource);
      messagesOffset++;
    }
  }
)

watch(
  () => store.state.auth.removedMessage,
  async (removedMessageResource?: Message) => {
    if (!removedMessageResource)
      return;

    if (chat.value?.id === removedMessageResource.chat_id) {
      let messageIndex: number | undefined;

      messages.value.forEach((message, index) => {
        if (message.id === removedMessageResource.id)
          messageIndex = index;
      });

      if(messageIndex === 0 || messageIndex) {
        messages.value.splice(messageIndex, 1)
        messagesOffset--;
      }
    }
  }
)

onErrorCaptured((error) => {
  store.commit('setChatError', error)

  return false;
})

function setFriend(users: User[]): User {
  const friends: User[] = users.filter((user) => {
    return user.id != store.state.auth.user.id;
  })

  return friends[0];
}

async function loadMessages(start: number) {
  messagesLoading.value = true;

  await messageService.getMessages(chat.value!.id, start, messagesLimit);

  messagesLoading.value = false;

  if (messageService.data.messages.length > 0) {
    messages.value = [...messages.value, ...messageService.data.messages];
    messagesOffset += messageService.data.messages.length;
  }
}

function loadAfterScroll(e: any): void {
  setTimeout(async () => {
    if (messagesLoading.value) {
      return;
    }

    const chatBody = e.target as HTMLDivElement;

    if (Math.abs(chatBody.scrollTop) + chatBody.clientHeight >= chatBody.scrollHeight - 10) {
      await loadMessages(messagesOffset);
    }
  }, 1000);
}

function showProfile(user?: User): void {
  store.commit('setProfile', user);
}
</script>

<template>
  <div class="w-screen h-screen fixed right-0 top-0 bg-white  flex flex-col lg:static lg:border-l-2 lg:border-gray-100">
    <ChatError />
    <FileModal />
    <ChatHeader>
      <template v-slot:members>
        <Avatar :size="'small'" class="cursor-pointer" :active="friend?.signed_in" :avatar="friend?.avatar_link"
          @click="showProfile(friend)" />
        <p class="cursor-pointer font-medium" @click="showProfile(friend)">{{ friend?.first_name }} {{ friend?.last_name
        }}</p>
      </template>
    </ChatHeader>
    <main @scroll="loadAfterScroll"
      class="h-full w-full flex flex-col-reverse gap-3 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300">
      <TransitionGroup name="list">
        <MessageWrapper v-for="message in messages" :key="message.id" :message="message" />
      </TransitionGroup>
    </main>
    <ChatFooter />
  </div>
</template>