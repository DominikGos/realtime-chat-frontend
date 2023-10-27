<script setup lang="ts">
const spinnerPath: string = 'Rolling-1s-200px (2).gif';
</script>

<template>
  <div>
    <img :src="spinnerPath" alt="loading ..." class="w-6 h-6 min-w-[1.5rem] min-h-[1.5rem]">
  </div>
</template>