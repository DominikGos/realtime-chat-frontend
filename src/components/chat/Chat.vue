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
const messages = ref<Message[]>();
let messagesOffset = 0;

watch(
  () => store.state.components.chat,
  async (chatResource) => {
    if( ! chatResource) 
      return;

    chat.value = chatResource
    
    friend.value = setFriend(chat.value!.users);
    await loadMessages(messagesOffset);
    messages.value = messageService.data.messages;

  }, { immediate: true }
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
  await messageService.getMessages(chat.value!.id, start);
}


function showProfile(user?: User): void {
  store.commit('setProfile', user);
}
</script>

<template>
  <div class="w-screen h-screen fixed right-0 top-0 bg-white  flex flex-col lg:static lg:border-l-2 lg:border-gray-100">
    <ChatError/>
    <FileModal/>
    <ChatHeader>
      <template v-slot:members>
        <Avatar :size="'small'" class="cursor-pointer" :active="friend?.signed_in" :avatar="friend?.avatar_link" @click="showProfile(friend)"/>
        <p class="cursor-pointer font-medium" @click="showProfile(friend)">{{ friend?.first_name }} {{ friend?.last_name }}</p>
      </template>
    </ChatHeader>
    <main
      class="h-full w-full flex flex-col-reverse gap-3 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300">
      <TransitionGroup name="list">
        <MessageWrapper v-for="message in messages" :key="message.id" :message="message"/>
      </TransitionGroup>
    </main>
    <ChatFooter />
  </div>
</template>