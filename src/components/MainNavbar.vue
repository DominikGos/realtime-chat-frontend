<script setup lang="ts">
import NavButton from './buttons/NavButton.vue';
import Modal from './Modal.vue';
import CustomButton from './buttons/CustomButton.vue';
import { ref } from 'vue';

const emit = defineEmits<{
  setPanel: [panelName: string]
}>();

const logoutConfirmationIsOpen = ref(false);

function showLogoutConfirmation(): void {
  logoutConfirmationIsOpen.value = true;
}

function closeLogoutConfirmation(): void {
  logoutConfirmationIsOpen.value = false;
}
</script>

<template>
  <nav class="flex w-full p-3 bg-white border-t-2 relative border-gray-100 lg:flex-col lg:justify-between lg:h-full lg:w-16 lg:border-t-0 lg:border-r-2">
    <Modal :active="logoutConfirmationIsOpen" @closeModal="closeLogoutConfirmation">
      <p class="mt-3">Do you want to log out?</p>
      <CustomButton :color="'red'" class="mt-3">
        Log out
      </CustomButton>
    </Modal>
    <div class="hidden lg:flex lg:justify-center">
      <i class="fa-brands fa-vuejs text-2xl text-cyan-400"></i>
    </div>
    <ul class="flex gap-5 justify-evenly w-full lg:flex-col lg:h-3/5 lg:items-center">
      <li>
        <NavButton @click="$emit('setPanel', 'Chats')">
          <i class="fa-solid fa-message"></i>
        </NavButton>
      </li>
      <li>
        <NavButton @click="$emit('setPanel', 'Users')">
          <i class="fa-solid fa-users"></i>
        </NavButton>
      </li>
      <li>
        <NavButton @click="showLogoutConfirmation">
          <i class="fa-solid fa-right-from-bracket"></i>
        </NavButton>
      </li>
    </ul>
  </nav>
</template>