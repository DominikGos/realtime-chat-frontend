<script setup lang="ts">
const props = defineProps({
  modelValue: String,
});

defineEmits(['update:modelValue']);
</script>

<template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
    class="w-full bg-gray-100 rounded-md p-2 shadow-md focus:outline-none border border-transparent transition duration-300 ease-in  focus:border-gray-300 focus:bg-white focus:shadow-none" autocomplete="on" />
</template>