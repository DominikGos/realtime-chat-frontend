<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  }
});

const classes = computed(() => {
  let classes: string = 'hover:text-cyan-400 transition-all duration-200 ';

  if(props.active) {
    classes += 'text-cyan-400'
  } else {
    classes += 'text-gray-400'
  }

  return classes;
})
</script>

<template>
  <button :class="classes">
    <slot></slot>
  </button>
</template>