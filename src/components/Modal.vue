<script setup lang="ts">
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
      ? 'backdrop-brightness-50 visible opacity-100'
      : 'backdrop-brightness-100  invisible opacity-0' 
      , 'mx-auto p-3 w-screen h-screen fixed top-0 right-0 left left-0 transition-all duration-500 z-50'
  ] 
})

const bodyClasses = computed(() => {
  return [
    props.active 
      ? 'translate-y-0 opacity-100'
      : 'translate-y-6 opacity-0'
      , 'mt-5 bg-white rounded-md shadow-md p-3 transition-all duration-500 lg:w-96 mx-auto z-50'
  ] 
})

</script>

<template>
  <div :class="backgroundClasses">
    <div :class="bodyClasses">
      <div class="flex justify-end">
        <button @click="$emit('closeModal')"><i class="fa-solid fa-x"></i></button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>