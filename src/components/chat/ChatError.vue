<script setup lang="ts">
import Modal from '../Modal.vue';
import { ref, watch } from 'vue';
import { store } from '@/store';
import { AxiosError } from 'axios';
import CustomButton from '../buttons/CustomButton.vue';

const showError = ref(false);
const error = ref<AxiosError>();
const defaultMessage: string = 'Something went wrong.';

watch(
  () => store.state.errors.chatError,
  (e) => {
    if( ! e) 
      return;

    error.value = e;
    showError.value = true;

  }, { immediate: true }
)

function hideError() {
  store.commit('setChatError', null)

  showError.value = false
}
</script>

<template>
  <Modal :active="showError" @closeModal="hideError">
    <p class="text-red-500">
      {{ error?.message ?? defaultMessage }}
    </p>
    <div class="flex justify-end mt-2">
      <CustomButton :color="'gray'" @click="hideError">
        Cancel
      </CustomButton>
    </div>
  </Modal>
</template>