<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue';
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade" appear>
      <Component :is="Component" />
    </Transition>
  </RouterView>
</template>
