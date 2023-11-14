<script setup lang="ts">
import type ModalFile from '@/interfaces/ModalFile';
import ScrollBar from './ScrollBar.vue';
import { store } from '@/store';
import { computed, ref, watch } from 'vue'

defineEmits(['closeFileModal'])

const showFileModal = ref(false);
const file = ref<ModalFile>();

watch(
  () => store.state.components.file,
  (fileResource) => {
    if (!fileResource)
      return;

    file.value = fileResource;

    showFileModal.value = true;
  }, { immediate: true }
)

function closeFileModal(e: any): void {
  file.value = undefined;
  showFileModal.value = false;
  store.commit('setFile', null);
}

const backgroundClasses = computed(() => {
  return [
    showFileModal.value
      ? 'bg-black/50 visible opacity-100'
      : 'bg-black/0 invisible opacity-0'
    , 'mx-auto p-5 w-screen h-screen fixed top-0 right-0 left left-0 transition-all duration-500 z-50'
  ]
})

const bodyClasses = computed(() => {
  return [
    showFileModal.value
      ? 'translate-y-0 opacity-100'
      : 'translate-y-6 opacity-0'
    , 'flex justify-center items-center mt-5 bg-white w-auto shadow-md transition-all duration-500 mx-auto z-50 w-min-[80%] lg:w-[50%]'
  ]
})
</script>

<template>
  <ScrollBar :class="backgroundClasses" @click="closeFileModal">
    <img v-if="file?.type === 'image'" :src="file.link" :class="bodyClasses">
    <video v-else-if="file?.type === 'video'" :src="file.link" :class="bodyClasses" autoplay loop controls></video>
  </ScrollBar>
</template>