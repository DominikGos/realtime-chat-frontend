<script setup lang="ts">
import InputLabel from '../../components/form/InputLabel.vue';
import CustomInput from '../../components/form/CustomInput.vue';
import InputError from '@/components/form/InputError.vue';
import CustomButton from '../../components/buttons/CustomButton.vue';
import { ref } from 'vue';
import type User from '@/interfaces/User';

const userCredentials = ref<User>({
  email: '',
  password: '',
});

const errorMessage = ref('');

</script>

<template>
  <div class="flex justify-start items-center flex-col h-screen p-4 overflow-y-scroll">
    <form class="mt-5 lg:mt-32 bg-white p-3 flex flex-col shadow-md rounded-xl gap-4 w-full md:w-96">
      <header class="mb-3">
        <h3 class="text-xl font-bold font-mono">Log in to your account</h3>
      </header>
      <div class="flex flex-col gap-3">
        <InputLabel>E-mail</InputLabel>
        <CustomInput type="email" v-model="userCredentials.email" required />
        <InputError v-if="errorMessage">{{ errorMessage }}</InputError>
      </div>
      <div class="flex flex-col gap-3">
        <InputLabel>Password</InputLabel>
        <CustomInput type="password" v-model="userCredentials.password" required />
      </div>
      <div>
        <CustomButton :color="'blue'" type="submit">Login</CustomButton>
      </div>
    </form>
    <p class="text-sm mt-5">Don't have an account?
      <span class="text-cyan-400">
        <RouterLink :to="{ name: 'register' }">register</RouterLink>
      </span>
    </p>
  </div>
</template>
