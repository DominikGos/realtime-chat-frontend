<script setup lang="ts">
import ChatHeader from './ChatHeader.vue';
import ChatFooter from './ChatFooter.vue';
import MessageWrapper from './MessageWrapper.vue';
import { ref, watch } from 'vue';
import { store } from '@/store';
import type Chat from '@/interfaces/Chat';
import type User from '@/interfaces/User';
import Avatar from '../Avatar.vue';

const chat = ref<Chat>();
const friend = ref<User>();

watch(
  () => store.state.components.chat,
  (chatResource) => {
    chat.value = chatResource    

    friend.value = setFriend(chat.value!.users);
    
  }, { immediate: true}
)

function setFriend(users: User[]): User {
  const friends: User[] = users.filter((user) => {
    return user.id != store.state.auth.user.id;
  })

  return friends[0];
}

const messageOne = ref({
  userIsAuthor: true,
});

const messageTwo = ref({
  userIsAuthor: false,
});
</script>

<template>
  <div class="w-screen h-screen fixed right-0 top-0 bg-white  flex flex-col lg:static lg:border-l-2 lg:border-gray-100">
    <ChatHeader>
      <template v-slot:members>
        <Avatar :size="'small'" :avatar="friend?.avatar_link"/>
        <p class=" font-medium">{{ friend?.first_name }} {{ friend?.last_name }}</p>
      </template>
    </ChatHeader>
    <main class="h-full w-full flex flex-col-reverse gap-3 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300">
      <MessageWrapper :message="messageOne"/>
      <MessageWrapper :message="messageTwo"/>
    </main>
    <ChatFooter/>
  </div>
</template>