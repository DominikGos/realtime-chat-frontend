<script setup lang="ts">
import {store} from '@/store';
import { ref } from 'vue';

const props = defineProps<{
  fileLink: string,
}>();

const linkParts: string[] = props.fileLink.split('.');
const extension: string = linkParts[linkParts.length - 1];
const isImage = ref(false);
const isVideo = ref(false);

isImage.value = store.state.fileExtensions.image.includes(extension)
isVideo.value = store.state.fileExtensions.video.includes(extension)

</script>

<template>
  <div class="overflow-hidden flex items-center justify-center">
    <img v-if="isImage" :src="fileLink" class="rounded-md">
    <video v-else-if="isVideo" :src="fileLink" class="rounded-md" autoplay loop muted></video>
  </div>
</template>