<script setup lang="ts">
import InputLabel from '../../components/form/InputLabel.vue';
import CustomInput from '../../components/form/CustomInput.vue';
import InputError from '@/components/form/InputError.vue';
import CustomButton from '../../components/buttons/CustomButton.vue';
import { ref } from 'vue';
import AuthService from '@/services/AuthService';
import { useRouter, type Router } from 'vue-router';
import { setFlashMessage } from '@/helpers/setFlashMessage';
import type UserCredentialsRegister from '@/interfaces/UserCredentialsRegister';

const auth: AuthService = new AuthService;
const router: Router = useRouter();
const errors = ref();
const formProcessing = ref<boolean>();
const userCredentials = ref<UserCredentialsRegister>({
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  password_confirmation: ''
});

async function submit(): Promise<void> {
  formProcessing.value = true;

  await auth.register(userCredentials.value)

  errors.value = auth.errors;
  formProcessing.value = auth.processing;

  if ( ! auth.hasAnyErrors) {
    setFlashMessage({content: 'Now you can log in.', status: 'success'});
    router.push({ name: 'login' });
  }
}

</script>

<template>
  <div class="flex justify-start items-center flex-col h-screen p-4 overflow-y-scroll">
    <form @submit.prevent="submit"
      class="mt-5 lg:mt-32 bg-white p-3 flex flex-col shadow-md rounded-xl gap-4 w-full md:w-96">
      <header class="mb-3">
        <h3 class="text-xl font-bold font-mono">Create your account</h3>
      </header>
      <div class="flex flex-col gap-3">
        <InputLabel>E-mail</InputLabel>
        <CustomInput type="email" v-model="userCredentials.email" :invalid="errors?.email" required name="email" />
        <InputError v-if="errors?.email" :errors="errors.email" />
      </div>
      <div class="flex gap-2">
        <div class="flex flex-col gap-3 w-full">
          <InputLabel>First name</InputLabel>
          <CustomInput type="text" v-model="userCredentials.first_name" :invalid="errors?.first_name" required name="first_name" />
          <InputError v-if="errors?.first_name" :errors="errors.first_name" />
        </div>
        <div class="flex flex-col gap-3 w-full">
          <InputLabel>Last name</InputLabel>
          <CustomInput type="text" v-model="userCredentials.last_name" :invalid="errors?.last_name" required name="last_name" />
          <InputError v-if="errors?.last_name" :errors="errors.last_name" />
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <InputLabel>Password</InputLabel>
        <CustomInput type="password" v-model="userCredentials.password" :invalid="errors?.password" required />
        <InputError v-if="errors?.password" :errors="errors.password" />
      </div>
      <div class="flex flex-col gap-3">
        <InputLabel>Confirm Password</InputLabel>
        <CustomInput type="password" v-model="userCredentials.password_confirmation" :invalid="errors?.password_confirmation" required />
        <InputError v-if="errors?.password_confirmation" :errors="errors.password_confirmation" />
      </div>
      <div>
        <CustomButton :color="'blue'" type="submit" :loading="formProcessing">Register</CustomButton>
      </div>
    </form>
    <p class="text-sm mt-5">Already have an account?
      <span class="text-cyan-400">
        <RouterLink :to="{ name: 'login' }">login</RouterLink>
      </span>
    </p>
  </div>
</template>
