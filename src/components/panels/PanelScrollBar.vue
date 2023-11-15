<script setup lang="ts">
import ScrollBar from '../ScrollBar.vue';

</script>

<template>
  <ScrollBar class="flex flex-col gap-3 pb-5 h-[calc(100%-94px)]">
    <slot></slot>
  </ScrollBar>
</template>