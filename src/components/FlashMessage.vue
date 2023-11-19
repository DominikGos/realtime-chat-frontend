<script lang="ts" setup>
import { store } from '@/store';
import { computed, ref, watch } from 'vue';


const showMessage = ref<boolean>(false);
const message = ref<string>();
const messageDuration: number = 6000;

watch(
  () => store.state.components.flashMessage,
  (flashMessage: string) => {
    if( ! flashMessage) {
      return;
    }

    message.value = flashMessage;
    showMessage.value = true;

    setTimeout(() => {
      hideFlashMessage();
    }, messageDuration);
  }
)

const classes = computed<string>(() => {
  let classes: string = 'fixed top-8 left-0 bg-white shadow-xl p-3 z-50 rounded-md transition-all duration-500 ';

  if(showMessage.value === true) {
    classes += 'opacity-1 left-8';
  } else {
    classes += 'opacity-0 left-0';
  }

  return classes;
});

function hideFlashMessage(): void {
  store.commit('setFlashMessage', null);
  showMessage.value = false;
}
</script>

<template>
  <div :class="classes">
    <div class="border-l-4 p-3 border-l-green-700 flex items-center justify-center gap-3  ">
      <p>{{ message }}</p>
      <button @click="hideFlashMessage">
        <i class="fa-solid fa-xmark text-gray-600"></i>
      </button>
    </div>
  </div>
</template>