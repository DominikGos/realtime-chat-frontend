<script setup lang="ts">
import { ref } from 'vue';
import UserService from '@/services/UserService';
import type UserInterface from '@/interfaces/User';
import Avatar from '../Avatar.vue';
import CustomInput from '../form/CustomInput.vue';
import InputError from '../form/InputError.vue';
import InputLabel from '../form/InputLabel.vue';
import CustomButton from '../buttons/CustomButton.vue';

const props = defineProps<{
  user: UserInterface
}>();

const userService: UserService = new UserService;
const userToUpdate = ref<UserInterface>(Object.assign({}, props.user));
let userInitialState: UserInterface = Object.assign({}, props.user);
const userUpdateLoading = ref(false);
const errors = ref();

async function updateProfile(): Promise<void> {
  if ( ! userToUpdate.value.avatar_link && userInitialState.avatar_link) {
    removeAvatar(userInitialState.avatar_link);
  }

  userUpdateLoading.value = true;

  await userService.updateUser(userToUpdate.value);

  errors.value = userService.errors;
  userInitialState = Object.assign({}, userToUpdate.value);
  userUpdateLoading.value = false;
}

async function sendAvatar(e: any): Promise<void> {
  const input = e.target as HTMLInputElement;

  await userService.createFile(input.files!);

  if (!userService.errors) {
    userToUpdate.value.avatar_link = userService.data.files_links[0];
  }

  input.value = '';
}

async function removeAvatar(avatarLink: string): Promise<void> {
  await userService.removeFile(avatarLink);

  if (!userService.errors) {
    removeAvatarLink();
  }
}

function removeAvatarLink(): void {
  userToUpdate.value.avatar_link = '';
}

async function resetForm(): Promise<void> {
  if (userToUpdate.value.avatar_link && !userInitialState.avatar_link) {
    removeAvatar(userToUpdate.value.avatar_link);
  }

  userToUpdate.value = Object.assign({}, userInitialState);
}

</script>

<template>
  <div class="flex flex-col gap-8">
    <header class="flex flex-col justify-center items-center gap-3">
      <div class="relative">
        <Avatar :size="'large'" :avatar="userToUpdate?.avatar_link" />
        <div
          class="flex items-center justify-center absolute bg-gray-300 w-5 h-5 rounded-full outline outline-white right-0 bottom-1 outline-3">
          <div v-if="!userToUpdate.avatar_link">
            <input @change="sendAvatar" type="file" id="avatar" hidden>
            <label for="avatar" class="cursor-pointer">
              <i class="fa-solid fa-camera text-sm"></i>
            </label>
          </div>
          <div v-else>
            <button @click="removeAvatarLink">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      </div>
      <p class="text-center font-semibold">{{ userToUpdate?.first_name }} {{ userToUpdate?.last_name }}</p>
    </header>
    <main class="mt-5">
      <form @submit.prevent="updateProfile" class="flex flex-col gap-4">
        <div class="flex gap-2">
          <div class="flex flex-col gap-3 w-full">
            <InputLabel>First name</InputLabel>
            <CustomInput type="text" v-model="userToUpdate.first_name" required />
            <InputError v-if="errors?.first_name" :errors="errors.first_name" />
          </div>
          <div class="flex flex-col gap-3 w-full">
            <InputLabel>Last name</InputLabel>
            <CustomInput type="text" v-model="userToUpdate.last_name" required />
            <InputError v-if="errors?.last_name" :errors="errors.last_name" />
          </div>
        </div>
        <div class="flex flex-col gap-3">
          <InputLabel>E-mail</InputLabel>
          <CustomInput v-model="userToUpdate.email" type="email" required />
          <InputError v-if="errors?.email" :errors="errors.email" />
        </div>
        <div class="flex gap-3">
          <CustomButton :color="'blue'" type="submit" :loading="userUpdateLoading">Update</CustomButton>
          <CustomButton @click="resetForm" :color="'gray'" type="button">Reset</CustomButton>
        </div>
      </form>
    </main>
  </div>
</template>