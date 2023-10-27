<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  avatar: String,
  active: String,
  size: {
    type: String,
    default: 'medium',
    validator(value: string) {
      return ['small', 'medium', 'large'].includes(value)
    }
  }
});

const wrapperClasses = computed<string>(() => {
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

const iconClasses = computed<string>(() => {
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

const activeStatusClasses = computed<string>(() => {
  let classes: string = 'absolute bg-green-500 rounded-full outline outline-white ';

  switch (props.size) {
    case 'small':
      classes += 'w-2 h-2 right-0 bottom-1 outline-2'
      break;
    case 'medium':
      classes += 'w-3 h-3 right-0 bottom-1 outline-2'
      break;
    case 'large':
      classes += 'w-4 h-4 right-0 bottom-1 outline-3'
      break;
};

return classes;
});
</script>

<template>
  <div class="relative">
    <div :class="wrapperClasses">
      <img v-if="avatar" :src="avatar" alt="avatar">
      <i v-else :class="iconClasses"></i>
    </div>
    <div v-if="props.active" :class="activeStatusClasses"></div>
  </div>
</template>