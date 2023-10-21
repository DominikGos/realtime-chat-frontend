<script setup lang="ts">
import { ref, watch } from 'vue';
import CustomInput from '../form/CustomInput.vue';
import ChatsPanel from './ChatsPanel.vue';
import UsersPanel from './UsersPanel.vue';
import { store } from '@/store';


watch(
  () => store.state.components.panel.name,
  (name) => {
    store.commit('setPanel', name)
  }
)
</script>

<template>
  <div
    class="w-full h-[calc(100%-50px)] p-4 overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-300 bg-white lg:h-full lg:shadow-lg lg:w-72 lg:min-w-[18rem] xl:w-80 xl:min-w-[20rem] 2xl:w-96 2xl:min-w-[24rem]">
    <header class="mb-5 w-full">
      <Transition name="fade" mode="out-in">
        <h3 class="font-semibold text-2xl" :key="store.state.components.panel.name">
          {{ store.state.components.panel.name }}
        </h3>
      </Transition>
      <form class="mt-5">
        <CustomInput placeholder="find user" />
      </form>
    </header>
    <Transition name="fade" mode="out-in">
      <ChatsPanel v-if="store.state.components.panel.name === 'Chats'" />
      <UsersPanel v-else-if="store.state.components.panel.name === 'Users'" />
    </Transition>
  </div>
</template>