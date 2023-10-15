<script setup lang="ts">
const props = defineProps({
  file: Object,
});

</script>

<template>
  <div class="overflow-hidden flex items-center justify-center">
    <img :src="file.image" alt="image" class="rounded-md">
  </div>
</template>