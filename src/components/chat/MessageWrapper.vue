<script setup lang="ts">
import Message from './Message.vue';
import Avatar from '../Avatar.vue';
import FileWrapper from './FileWrapper.vue';

const props = defineProps({
  message: Object,
});

</script>

<template>
  <div :class="[message.userIsAuthor ? 'justify-end' : 'justify-start', 'flex']">
    <div class="p-3 flex flex-col h-min  max-w-[256px] ">
      <div class="flex gap-3 items-end relative">
        <div v-if="message.userIsAuthor === false">
          <Avatar :size="'small'"/>
        </div>
        <div v-if="message.userIsAuthor" class="h-full absolute flex items-center p-3 -left-6">
          <button>
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </button>
        </div>
        <div class="flex flex-col gap-2">
          <Message :message="message"/> <!-- if message has text content -->
          <FileWrapper :message="message"/> <!-- if message has file content -->
        </div>
      </div>
      <div :class="[message.userIsAuthor ? 'justify-start' : 'justify-end ', 'h-8 flex p-2']">
        <p class="text-xs">12:34</p>
      </div>
    </div>
  </div>
</template>