<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  color: {
    type: String,
    required: true,
    validator(value) {
      return ['red', 'blue', 'gray', 'green'].includes(value as string)
    }
  },
  loading: {
    type: Boolean,
    default: false,
  }
});

const loadingSpinnerGifPath: string = '/Rolling-1s-200px.gif';

const classes = computed<String>(() => {
  let classes: string = 'rounded-md focus:ring-2 hover:cursor-pointer transition-all p-2 flex items-center gap-2 '

  switch (props.color) {
    case 'blue':
      classes += 'bg-cyan-400 text-white focus:ring-cyan-400 hover:bg-cyan-300'    
      break;
    case 'red':
      classes += 'bg-red-400 text-white focus:ring-red-400 hover:bg-red-300'    
      break;
    case 'gray':
      classes += 'bg-gray-400 text-white focus:ring-gray-400 hover:bg-gray-300'    
      break;
    case 'green':
      classes += 'bg-emerald-400 text-white focus:ring-emerald-400 hover:bg-emerald-300'    
      break;
  }

  return classes;
})
</script>

<template>
  <button :class="classes" :disabled="loading">
    <slot></slot>
    <img v-if="loading" class="w-4" :src="loadingSpinnerGifPath"> 
  </button>
</template>