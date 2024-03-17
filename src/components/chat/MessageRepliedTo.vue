<script setup lang="ts">
import type MessageInterface from '@/interfaces/Message';
import Message from './Message.vue';
import FileWrapper from './FileWrapper.vue';
import { computed } from 'vue';
import { store } from '@/store';

const props = defineProps<{
  message: MessageInterface
}>();


const repliedToWho = computed<string>(() => {
  if (!store.state.auth.user || !props.message.answer_to_message) return '';

  if (props.message.user.id === store.state.auth.user.id && props.message.answer_to_message.user.id === store.state.auth.user.id) {
    return 'You answered to yourself.';
  } else if (props.message.user.id === store.state.auth.user.id && props.message.answer_to_message.user.id !== store.state.auth.user.id) {
    return `You answered to ${props.message.answer_to_message.user.first_name}.`;
  } else if (props.message.user.id !== store.state.auth.user.id && props.message.answer_to_message.user.id === store.state.auth.user.id) {
    return `${props.message.user.first_name} answered to you.`;
  } else if (props.message.user.id !== store.state.auth.user.id && props.message.answer_to_message.user.id === props.message.user.id) {
    return `${props.message.user.first_name} answered himself/herself.`;
  } else if (props.message.user.id !== store.state.auth.user.id && props.message.answer_to_message.user.id !== props.message.user.id) {
    return `${props.message.user.first_name} answered to ${props.message.answer_to_message.user.first_name}.`;
  }
  return '';
});

const classes = computed<string>(() => {
  return (props.message.user.id === store.state.auth.user?.id
    ? 'translate-x-6'
    : '-translate-x-6') + ' flex flex-col gap-2 scale-75 translate-y-6';
});
</script>

<template>
  <div :class="classes" v-if="message.answer_to_message">
    <p class="text-gray-400"><i class="fa-solid fa-reply"></i> {{ repliedToWho }}</p>
    <Message v-if="message.answer_to_message.text" :message="message.answer_to_message" :userIsAuthor="true"
      class=" bg-gray-300" />
    <FileWrapper v-if="message.answer_to_message.files_links.length > 0"
      :filesLinks="message.answer_to_message.files_links" />
  </div>
</template>