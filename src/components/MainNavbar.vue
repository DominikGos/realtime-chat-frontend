<script setup lang="ts">
import NavButton from './buttons/NavButton.vue';
import Modal from './Modal.vue';
import CustomButton from './buttons/CustomButton.vue';
import { ref } from 'vue';
import AuthService from '@/services/AuthService';
import { useRouter, type Router } from 'vue-router';
import { store } from '@/store';

const authService: AuthService = new AuthService;
const logoutConfirmationIsOpen = ref(false);
const logoutSpinner = ref(false);
const router: Router = useRouter();

function showLogoutConfirmation(): void {
  logoutConfirmationIsOpen.value = true;
}

function closeLogoutConfirmation(): void {
  logoutConfirmationIsOpen.value = false;
}

async function logout(): Promise<void> {
  logoutSpinner.value = true;

  await authService.logout();

  logoutSpinner.value = false;
  store.commit('setUser', undefined);
  authService.removeUserFromTheBrowser();  
  router.push({name: 'login'});
}
</script>

<template>
  <nav class="flex w-full p-3 bg-white border-t-2 relative border-gray-100 lg:flex-col lg:justify-between lg:h-full lg:w-16 lg:min-w-[4rem] lg:border-t-0 lg:border-r-2">
    <Modal :active="logoutConfirmationIsOpen" @closeModal="closeLogoutConfirmation">
      <form @submit.prevent="logout">
        <p class="mt-3">Do you want to log out?</p>
        <div class="flex justify-end">
          <CustomButton :color="'red'" class="mt-3" :loading="logoutSpinner">
            Log out
          </CustomButton>
        </div>
      </form>
    </Modal>
    <div class="hidden lg:flex lg:justify-center">
      <i class="fa-brands fa-vuejs text-2xl text-cyan-400"></i>
    </div>
    <ul class="flex gap-5 justify-evenly w-full lg:flex-col lg:h-3/5 lg:items-center">
      <li>
        <NavButton :active="store.state.components.panel.name === 'Chats'" @click="store.commit('setPanel', 'Chats')">
          <i class="fa-solid fa-message"></i>
        </NavButton>
      </li>
      <li>
        <NavButton :active="store.state.components.panel.name === 'Users'" @click="store.commit('setPanel', 'Users')">
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