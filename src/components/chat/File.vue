<script setup lang="ts">

const props = defineProps<{
  fileLink: string,
}>();

</script>

<template>
  <div class="overflow-hidden flex items-center justify-center">
    <img :src="fileLink" class="rounded-md">
  </div>
</template>