<script setup lang="ts">
import type ModalFile from '@/interfaces/ModalFile';
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
      ? 'backdrop-brightness-50 visible opacity-100'
      : 'backdrop-brightness-100  invisible opacity-0'
    , 'mx-auto p-5 w-screen h-screen fixed top-0 right-0 left left-0 transition-all duration-500 z-50 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300'
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
  <div :class="backgroundClasses" @click="closeFileModal">
    <img v-if="file?.type === 'image'" :src="file.link" :class="bodyClasses">
    <video v-else-if="file?.type === 'video'" :src="file.link" :class="bodyClasses" autoplay loop controls></video>
  </div>
</template>