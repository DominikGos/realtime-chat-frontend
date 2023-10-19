<script setup lang="ts">
import InputLabel from '../../components/form/InputLabel.vue';
import CustomInput from '../../components/form/CustomInput.vue';
import InputError from '@/components/form/InputError.vue';
import CustomButton from '../../components/buttons/CustomButton.vue';
import { ref } from 'vue';
import type User from '@/interfaces/User';
import AuthService from '@/services/AuthService';
import { store } from '@/store';

const auth = new AuthService;
const errors = ref();
const formProcessing = ref();
const userCredentials = ref({
  email: '',
  password: '',
})

console.log(store.state.auth.user);

async function submit() {
  formProcessing.value = true;
  
  await auth.login(userCredentials.value as User)
  
  errors.value = auth.errors;
  formProcessing.value = auth.processing;

  if(errors.value === undefined) {
    console.log(store.state.auth.user);
    console.log(auth.data);
    
  }
}

</script>

<template>
  <div class="flex justify-start items-center flex-col h-screen p-4 overflow-y-scroll">
    <form @submit.prevent="submit" class="mt-5 lg:mt-32 bg-white p-3 flex flex-col shadow-md rounded-xl gap-4 w-full md:w-96">
      <header class="mb-3">
        <h3 class="text-xl font-bold font-mono">Log in to your account</h3>
      </header>
      <div class="flex flex-col gap-3">
        <InputLabel>E-mail</InputLabel>
        <CustomInput type="email" v-model="userCredentials.email" :invalid="errors?.email" required autocomplete="email"/>
        <InputError v-if="errors?.email" :errors="errors.email"/>
      </div>
      <div class="flex flex-col gap-3">
        <InputLabel>Password</InputLabel>
        <CustomInput type="password" v-model="userCredentials.password" :invalid="errors?.password" required/>
        <InputError v-if="errors?.password" :errors="errors.password"/>
      </div>
      <div>
        <CustomButton :color="'blue'" type="submit" :loading="formProcessing" :disabled="formProcessing">Login</CustomButton>
      </div>
    </form>
    <p class="text-sm mt-5">Don't have an account?
      <span class="text-cyan-400">
        <RouterLink :to="{ name: 'register'}">register</RouterLink>
      </span>
    </p>
  </div>
</template>
