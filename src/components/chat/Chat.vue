<script setup lang="ts">
import ChatHeader from './ChatHeader.vue';
import ChatFooter from './ChatFooter.vue';
import MessageWrapper from './MessageWrapper.vue';
import { ref } from 'vue';

const messageOne = ref({
  userIsAuthor: true,
});

const messageTwo = ref({
  userIsAuthor: false,
});
</script>

<template>
  <div class="w-screen h-screen fixed right-0 top-0 bg-white  flex flex-col lg:static lg:border-l-2 lg:border-gray-100">
    <ChatHeader/>
    <main class="h-full w-full flex flex-col-reverse gap-3 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300">
      <MessageWrapper :message="messageOne"/>
      <MessageWrapper :message="messageTwo"/>
    </main>
    <ChatFooter/>
  </div>
</template>