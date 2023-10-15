<script setup lang="ts">
defineProps({
  value: {
    type: String,
  },
});
</script>

<template>
  <label class="text-sm font-semibold text-gray-700">
    <span v-if="value">{{ value }}</span>
    <span v-else>
      <slot></slot>
    </span>
  </label>
</template>