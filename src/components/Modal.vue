<script setup lang="ts">
import ScrollBar from './ScrollBar.vue';
import { computed } from 'vue'

defineEmits(['closeModal'])

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  }
})

const backgroundClasses = computed(() => {
  return [
    props.active
      ? 'bg-black/50 visible opacity-100'
      : 'bg-black/0 invisible opacity-0'
    , 'mx-auto p-3 w-full h-full fixed top-0 bottom-0 right-0 left-0 transition-all duration-500 z-50'
  ]
})

const bodyClasses = computed(() => {
  return [
    props.active
      ? 'translate-x-0 opacity-100'
      : 'translate-x-6 opacity-0'
    , 'mt-5 bg-white rounded-md shadow-md p-3 transition-all duration-500 lg:w-96 mx-auto z-50'
  ]
})

</script>

<template>
  <ScrollBar :class="backgroundClasses">
    <div :class="bodyClasses">
      <div class="flex justify-end">
        <button @click="$emit('closeModal')"><i class="fa-solid fa-x"></i></button>
      </div>
      <slot></slot>
    </div>
  </ScrollBar>
</template>