<script setup lang="ts">
import NavButton from './buttons/NavButton.vue';
import Modal from './Modal.vue';
import CustomButton from './buttons/CustomButton.vue';
import { ref, watch } from 'vue';
import AuthService from '@/services/AuthService';
import { useRouter, type Router } from 'vue-router';
import { store } from '@/store';
import Avatar from './Avatar.vue';
import type User from '@/interfaces/User';
import { setFlashMessage } from '@/helpers/setFlashMessage';

const authService: AuthService = new AuthService;
const authUser = ref<User>(store.state.auth.user)
const logoutConfirmationIsOpen = ref(false);
const logoutSpinner = ref(false);
const router: Router = useRouter();

watch(
  () => store.state.broadcastedData.updatedUser,
  (updatedUserResource?: User) => {
    if (!updatedUserResource)
      return;

    if(updatedUserResource.id === authUser.value.id) {
      authUser.value = updatedUserResource;
    }
  }
)

function showLogoutConfirmation(): void {
  logoutConfirmationIsOpen.value = true;
}

function closeLogoutConfirmation(): void {
  logoutConfirmationIsOpen.value = false;
}

async function logout(): Promise<void> {
  logoutSpinner.value = true;

  await authService.logout();

  if( ! authService.errors) {
    logoutSpinner.value = false;
    setFlashMessage({content: 'You have logged out.', status: 'success'});
    authService.removeUserFromTheBrowser();  
    router.push({name: 'login'});
  }
}

function showProfile(): void {
  store.commit('setProfile', store.state.auth.user)
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
    <ul class="flex justify-evenly items-center w-full lg:flex-col lg:gap-24 lg:justify-end lg:h-3/5">
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
      <li>
        <button @click="showProfile">
          <Avatar :size="'small'" :avatar="authUser.avatar_link"/>
        </button>
      </li>
    </ul>
  </nav>
</template>