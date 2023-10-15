<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  avatar: String,
  active: Boolean,
  size: {
    type: String,
    default: 'medium',
    validator(value: string) {
      return ['small', 'medium', 'large'].includes(value)
    }
  }
});

const wrapperClasses = computed(() => {
  let classes: string = 'bg-gray-300 rounded-full flex items-center justify-center overflow-hidden relative ';

  switch (props.size) {
    case 'small':
      classes += 'w-8 h-8 min-w-[2rem] min-h-[2rem]'
      break;
    case 'medium':
      classes += 'w-12 h-12 min-w-[3rem] min-h-[3rem]'
      break;
    case 'large':
      classes += 'w-16 h-16 min-w-[4rem] min-h-[4rem]'
      break;
  };

  return classes;
})

const iconClasses = computed(() => {
  let classes: string = 'fa-solid fa-user absolute -bottom-1 text-white ';

  switch (props.size) {
    case 'small':
      classes += 'text-2xl '
      break;
    case 'medium':
      classes += 'text-4xl '
      break;
    case 'large':
      classes += 'text-5xl '
      break;
  };

  return classes;
})
</script>

<template>
  <div :class="wrapperClasses">
    <img v-if="avatar" :src="avatar" alt="avatar">
    <i v-else :class="iconClasses"></i>
  </div>
</template>