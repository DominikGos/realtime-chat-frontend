<script setup lang="ts">
import { store } from '@/store';
import { ref } from 'vue';


const props = defineProps<{
  fileLink: string
}>();

defineEmits<{
  removeFile: [fileLink: string]
}>();

const linkParts: string[] = props.fileLink.split('.');
const extension: string = linkParts[linkParts.length - 1];
const isImage = ref(false);
const isVideo = ref(false);

isImage.value = store.state.fileExtensions.image.includes(extension)
isVideo.value = store.state.fileExtensions.video.includes(extension)


</script>

<template>
  <div class="bg-white rounded-md w-11 h-11 min-w-[2.75rem] relative border border-gray-300">
    <div class="flex justify-center items-center w-full h-full overflow-hidden rounded-md">
      <img v-if="isImage" :src="fileLink">
      <video v-else-if="isVideo" :src="fileLink" autoplay loop muted></video>
    </div>
    <button @click="$emit('removeFile', fileLink)" type="button"
      class="justify-center items-center rounded-full w-5 h-5 -right-1 -top-1 absolute flex border border-gray-300 bg-white">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
</template>