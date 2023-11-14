<script setup lang="ts">
import CustomInput from '../form/CustomInput.vue';
import ChatsPanel from './ChatsPanel.vue';
import UsersPanel from './UsersPanel.vue';
import SearchedUsersPanel from './SearchedUsersPanel.vue';
import LoadingSpinner from '../LoadingSpinner.vue';
import { ref, watch } from 'vue';
import { store } from '@/store';

const userName = ref<string>('');

watch(
  () => store.state.components.panel.name,
  (panelName) => {
    if(panelName != 'SearchedUsers') {
      userName.value = '';
    }
  }
)

function showSearchedUsers(): void {
  store.commit('setPanel', 'SearchedUsers');
}
</script>

<template>
  <div
    class="w-full h-[calc(100%-64px)] p-4 bg-white lg:h-full lg:shadow-lg lg:w-72 lg:min-w-[18rem] xl:w-80 xl:min-w-[20rem] 2xl:w-96 2xl:min-w-[24rem]">
    <header class="mb-5 w-full">
      <Transition name="fade" mode="out-in">
        <h3 class="font-semibold text-2xl" :key="store.state.components.panel.name">
          <p v-if="store.state.components.panel.name === 'SearchedUsers'"> Searched users </p>
          <p v-else> {{ store.state.components.panel.name }} </p>
        </h3>
      </Transition>
      <form class="mt-5">
        <CustomInput @input="showSearchedUsers" @click="showSearchedUsers" placeholder="find users ..." v-model="userName" />
      </form>
    </header>
    <Transition name="fade" mode="out-in">
      <Suspense>
        <ChatsPanel v-if="store.state.components.panel.name === 'Chats'" />
        <UsersPanel v-else-if="store.state.components.panel.name === 'Users'" />
        <SearchedUsersPanel :userName="userName" v-else-if="store.state.components.panel.name === 'SearchedUsers'" />
        <template #fallback>
          <LoadingSpinner class="flex justify-center"/>
        </template>
      </Suspense>
    </Transition>
  </div>
</template>