<script setup lang="ts">
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade" appear>
      <Component :is="Component"/>
    </Transition>
  </RouterView>
</template>
