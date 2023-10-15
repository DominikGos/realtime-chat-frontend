<script setup lang="ts">
defineProps({
  value: {
    type: String,
  },
});
</script>

<template>
  <div class="text-red-500 text-sm">
    <span v-if="value">{{ value }}</span>
    <span v-else>
      <slot></slot>
    </span>
  </div>
</template>