<script setup lang="ts">
import ErrorModal from './components/ErrorModal.vue';
import FlashMessage from './components/FlashMessage.vue';
</script>

<template>
  <FlashMessage />
  <ErrorModal />
  <RouterView v-slot="{ Component }">
    <Transition name="fade" appear>
      <Component :is="Component" />
    </Transition>
  </RouterView>
</template>
