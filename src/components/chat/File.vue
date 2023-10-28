<script setup lang="ts">
import { store } from '@/store';
import { ref } from 'vue';
import type ModalFile from '@/interfaces/ModalFile';

const props = defineProps<{
  fileLink: string,
}>();

const linkParts: string[] = props.fileLink.split('.');
const extension: string = linkParts[linkParts.length - 1];
const isImage = ref(false);
const isVideo = ref(false);

isImage.value = store.state.fileExtensions.image.includes(extension)
isVideo.value = store.state.fileExtensions.video.includes(extension)

function zoomFile(modalFile: ModalFile): void {
  store.commit('setFile', modalFile);
}
</script>

<template>
  <div class="overflow-hidden flex items-center justify-center">
    <img v-if="isImage" :src="fileLink" class="rounded-md cursor-pointer"
      @click="zoomFile({ link: fileLink, type: 'image' })">
    <video v-else-if="isVideo" :src="fileLink" class="rounded-md cursor-pointer" autoplay loop muted
      @click="zoomFile({ link: fileLink, type: 'video' })"></video>
  </div>
</template>