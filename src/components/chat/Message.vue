<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  message: Object,
});

const classes = computed(() => {
  let classes = 'p-3 rounded-md '

  if(props.message.userIsAuthor) {
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
      Message content Message content MessagecontentMessagecontentMessage content Message content Message content
    </p>
  </div>
</template>