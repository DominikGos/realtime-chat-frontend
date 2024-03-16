<script setup lang="ts">
import type Message from '@/interfaces/Message';
import { computed } from 'vue';

const props = defineProps<{
  message: Message,
  userIsAuthor: Boolean,
}>();

console.log('??');

const classes = computed(() => {
  let classes: string = 'p-3 rounded-md '

  if(props.userIsAuthor) {
    classes += ' bg-cyan-400 text-white';
  } else {
    classes += ' bg-gray-200';
  }

  return classes;
})
</script>

<template>
  <div :class="classes" style="word-break: break-word;">
    <p>
      {{ message.text }}
    </p>
  </div>
</template>