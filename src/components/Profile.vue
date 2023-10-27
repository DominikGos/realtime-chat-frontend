<script setup lang="ts">
import Modal from './Modal.vue';
import Avatar from './Avatar.vue';
import { ref, watch } from 'vue';
import type User from '@/interfaces/User';
import { store } from '@/store';

const user = ref<User>();
const showProfile = ref(false);

watch(
  () => store.state.components.profile,
  (profileResource) => {
    if( ! profileResource) 
      return;

    showProfile.value = true;

    user.value = profileResource;
  }, { immediate: true }
)

function hideProfile() {
  store.commit('setProfile', null)

  showProfile.value = false
}

</script>

<template>
  <Modal :active="showProfile" @closeModal="hideProfile">
    <div class="flex flex-col gap-8">
      <header class="flex flex-col justify-center items-center gap-3">
        <Avatar :size="'large'" :avatar="user?.avatar_link" :active="user?.signed_in"/>
        <p class="text-center font-semibold">{{ user?.first_name }} {{  user?.last_name }}</p>
      </header>
      <main class="mt-5">
      </main>
    </div>
  </Modal>
</template>