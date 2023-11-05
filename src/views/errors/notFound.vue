<script setup lang="ts">
import CustomButton from '../../components/buttons/CustomButton.vue';
</script>
<template>
  <header class="flex justify-center items-center mt-10 gap-2">
    <h3 class=" text-4xl font-semibold">Not found.</h3>
    <RouterLink :to="{ name: 'home' }">
      <CustomButton :color="'blue'">Home</CustomButton>
    </RouterLink>
  </header>
</template>