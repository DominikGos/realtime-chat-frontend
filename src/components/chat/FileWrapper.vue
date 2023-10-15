<script setup lang="ts">
import { computed, ref } from 'vue';
import File from './File.vue';

const files = ref([
  {
    id: 1,
    image: 'https://noticiassalamanca.com/wp-content/uploads/2022/07/vida-eusebio.jpg'
  },
  
 
])

const classes = computed(() => {
  let classes: string = 'grid gap-2 ';

  if(files.value.length == 1) {
    classes += 'grid-cols-1'
  } else if(files.value.length > 1) {
    classes += 'grid-cols-2'
  }

  return classes;
})

</script>

<template>
  <div :class="classes">
    <File v-for="file in files" :key="file.id" :file="file"/>
  </div>
</template>