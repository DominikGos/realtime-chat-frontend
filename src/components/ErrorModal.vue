<script setup lang="ts">
import Modal from '@/components/Modal.vue'
import { ref, watch } from 'vue';
import { store } from '@/store';
import CustomButton from '@/components/buttons/CustomButton.vue';

const showError = ref(false);
const errorMessage = ref<string>('');
const defaultMessage: string = 'Something went wrong.';

watch(
  () => store.state.errors.globalError,
  (e: string) => {
    if( ! e) 
      return;
    console.log(e);
    
    errorMessage.value = e;
    showError.value = true;

  }, { immediate: true }
)

function hideError() {
  store.commit('setGlobalError', null)

  showError.value = false
}
</script>

<template>
  <Modal :active="showError" @closeModal="hideError">
    <p class="text-red-500">
      {{ errorMessage ?? defaultMessage }}
    </p>
    <div class="flex justify-end mt-2">
      <CustomButton :color="'gray'" @click="hideError">
        ok
      </CustomButton>
    </div>
  </Modal>
</template>