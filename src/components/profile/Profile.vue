<script setup lang="ts">
import Modal from '../Modal.vue';
import Avatar from '../Avatar.vue';
import { ref, watch, computed } from 'vue';
import type User from '@/interfaces/User';
import { store } from '@/store';
import ProfileUpdateForm from './ProfileUpdateForm.vue';
import UserService from '@/services/UserService';

const userService: UserService = new UserService();
const user = ref<User>({
  first_name: '',
  last_name: '',
  email: '',
});
const showProfile = ref(false);

watch(
  () => store.state.components.profile,
  (profileResource: User) => {
    if (!profileResource)
      return;

    showProfile.value = true;
    user.value = profileResource;
  }, { immediate: true }
)

function hideProfile(): void {
  store.commit('setProfile', null)

  showProfile.value = false
}

const itsAuthUser = computed<Boolean>(() => {
  return user.value.id === store.state.auth.user?.id;
})
</script>

<template>
  <Modal :active="showProfile" @closeModal="hideProfile">
    <div v-if=" ! itsAuthUser" class="flex flex-col gap-8">
      <header class="flex flex-col justify-center items-center gap-3">
        <Avatar :size="'large'" :avatar="user?.avatar_link" :active="user?.signed_in" />
        <p class="text-center font-semibold">{{ user?.first_name }} {{ user?.last_name }}</p>
      </header>
    </div>
    <ProfileUpdateForm v-else-if="itsAuthUser" :user="user"/>
  </Modal>
</template>