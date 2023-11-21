<script lang="ts" setup>
import type FlashMessage from '@/interfaces/FlashMessage';
import { store } from '@/store';
import { computed, ref, watch } from 'vue';

const showMessage = ref<boolean>(false);
const message = ref<FlashMessage>();
const messageDuration: number = 6000;
let timeOutId: number;
let delayOver: boolean = true;

watch(
  () => store.state.components.flashMessage,
  (flashMessage?: FlashMessage) => {
    if( ! flashMessage) {
      return;
    }

    delayOver = false;
    message.value = flashMessage;
    showMessage.value = true;

    if( ! delayOver && timeOutId) {
      clearTimeout(timeOutId);
    }

    timeOutId = setTimeout(() => {
      hideFlashMessage();

      delayOver = true;
    }, messageDuration);
  }
)

const wrapperClasses = computed<string>(() => {
  let classes: string = 'fixed top-8 left-0 bg-white shadow-xl p-3 z-50 rounded-md transition-all duration-500 ';

  if(showMessage.value === true) {
    classes += 'visible opacity-1 left-8';
  } else {
    classes += 'invisible opacity-0 left-0';
  }

  return classes;
});

const bodyClasses = computed<string>(() => {
  let classes: string = 'border-l-4 p-3 flex items-center justify-center gap-3 ';

  switch (message.value?.status) {
    case 'success':
      classes += 'border-l-green-700'
      break;
    case 'fail':
      classes += 'border-l-red-700 '
      break;
  }

  return classes;
});

function hideFlashMessage(): void {
  store.commit('setFlashMessage', null);
  showMessage.value = false;
}
</script>

<template>
  <div :class="wrapperClasses">
    <div :class="bodyClasses">
      <p>{{ message?.content }}</p>
      <button @click="hideFlashMessage">
        <i class="fa-solid fa-xmark text-gray-600"></i>
      </button>
    </div>
  </div>
</template>