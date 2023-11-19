<script setup lang="ts">
import ErrorModal from './components/ErrorModal.vue';
</script>

<template>
  <ErrorModal />
  <RouterView v-slot="{ Component }">
    <Transition name="fade" appear>
      <Component :is="Component" />
    </Transition>
  </RouterView>
</template>
