<script setup lang="ts">
defineProps<{
  errors: string[]
}>();
</script>

<template>
  <div class="text-red-500 text-sm">
    <span v-for="error in errors" :key="error">
      {{ error }}
    </span>
  </div>
</template>