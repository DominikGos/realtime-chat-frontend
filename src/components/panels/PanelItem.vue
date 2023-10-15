<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  }
});

const classes = computed(() => {
  let classes: string = 'flex p-3 rounded-lg hover:cursor-pointer hover:bg-cyan-50 transition-all duration-200 overflow-hidden relative ';

  if (props.active) {
    classes += 'bg-cyan-50 shadow-md';
  }

  return classes;
});
</script>

<template>
  <div :class="classes" style="min-height: 72px;">
    <div>
      <slot name="start"></slot>
    </div>
    <div class="flex flex-col items-start justify-center text-sm ps-2 pe-2">
      <slot name="middle"></slot>
    </div>
    <div class="absolute right-0 pe-2 flex justify-end text-xs bg-inherit h-full">
      <slot name="end"></slot>
    </div>
  </div>
</template>