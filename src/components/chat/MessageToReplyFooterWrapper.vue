<script setup lang="ts">
import removeMessageToAnswer from '@/helpers/removeMessageToAnswer';
import type Message from '@/interfaces/Message';
import { store } from '@/store';
import { computed, ref, watch } from 'vue';


const show = ref<boolean>(false);
const replyTo = ref<Message>();

watch(
  () => store.state.components.messageToAnswer,
  (messageToAnswer?: Message) => {
    if (!messageToAnswer) {
      show.value = false;
      return;
    }

    replyTo.value = messageToAnswer;
    show.value = true;
  },
  { immediate: true }
)

const answerToWho = computed<string>(() => {
  if( ! replyTo.value) return '';

  if(replyTo.value?.user.id === store.state.auth.user?.id) {
    return 'Answer to yourself.';
  } else {
    return `Answer to ${replyTo.value?.user.first_name}`;
  }
});

const contentOfMessageToReply = computed<string>(() => {
  if( ! replyTo.value) return '';
  
  if(replyTo.value.text) return replyTo.value.text;
  else if( ! (replyTo.value.text) && replyTo.value.files_links.length > 0) return 'file';

  return '';
});

function closeMessageReply(): void {
  removeMessageToAnswer();
  show.value = false;
}

</script>

<template>
  <div v-if="show" class="flex flex-col items-start pb-4 mb-2 relative w-full flex-1 overflow-hidden">
    <button type="button" class="absolute right-4 top-0" @click="closeMessageReply">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <h3 class=" font-semibold"> {{ answerToWho }}</h3>
    <div class="w-full max-h-12">
      <p class="text-sm break-words w-full"> {{  contentOfMessageToReply }} </p>
    </div>
  </div>
</template>