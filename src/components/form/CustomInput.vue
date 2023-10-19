<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue: string,
  invalid?: boolean | string
}>();

const emit = defineEmits(['update:modelValue']);

const classes = computed<string>(() => {
  let classes = 'w-full bg-gray-100 rounded-md p-2 shadow-md focus:outline-none border border-transparent transition duration-300 ease-in  focus:border-gray-300 focus:bg-white focus:shadow-none '
  
  if(props.invalid) 
    classes += 'border-red-500 shadow-none bg-white focus:border-red-500'

  return classes;
});

function handleInputEvent(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}
</script>

<template>
  <input :value="modelValue" @input="handleInputEvent" :class="classes" autocomplete="on"/>
</template>