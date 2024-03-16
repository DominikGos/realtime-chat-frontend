<script setup lang="ts">
import { ref, watch } from 'vue';
import Modal from '../Modal.vue';
import type Message from '@/interfaces/Message';
import { store } from '@/store';
import MessageService from '@/services/MessageService';
import CustomButton from '../buttons/CustomButton.vue';

const messageService: MessageService = new MessageService();
const loadingDeletion = ref<boolean>(false);
const message = ref<Message>();

watch(
  () => store.state.components.messageSettings.showSettings,
  (showSettings: boolean) => {
    setMessage(store.state.components.messageSettings.message);
  }
)

function setMessage(messageResource: Message): void {
  message.value = messageResource;
}

function hideModel(): void {
  store.commit('setMessageSettings', { showSettings: false, message: message })
}

async function deleteMessage(message: Message): Promise<void> {
  loadingDeletion.value = true;

  await messageService.deleteMessage(store.state.components.chat.id, message.id!);

  loadingDeletion.value = false;

  hideModel();
}
</script>

<template>
  <Modal :active="store.state.components.messageSettings.showSettings" @closeModal="hideModel">
    <CustomButton v-if="message" :color="'red'" @click="deleteMessage(message)" :loading="loadingDeletion">
      Delete message
    </CustomButton>
    <div class="flex w-full justify-end">
      <CustomButton :color="'gray'" @click="hideModel">Cancel</CustomButton>
    </div>
  </Modal>
</template>