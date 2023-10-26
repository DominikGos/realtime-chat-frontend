<script setup lang="ts">
import { computed, ref } from 'vue';
import File from './File.vue';

const props = defineProps<{
  filesLinks: string[]
}>();

const classes = computed(() => {
  let classes: string = 'grid gap-2 ';

  if(props.filesLinks.length == 1) {
    classes += 'grid-cols-1'
  } else if(props.filesLinks.length > 1) {
    classes += 'grid-cols-2'
  }

  return classes;
})

</script>

<template>
  <div :class="classes">
    <File v-for="fileLink in filesLinks" :fileLink="fileLink"/>
  </div>
</template>