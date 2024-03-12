<script setup lang="ts">
import Panel from '../components/panels/Panel.vue';
import MainNavbar from '../components/MainNavbar.vue';
import Chat from '../components/chat/Chat.vue';
import { store } from '@/store';
import ProfileVue from '@/components/profile/Profile.vue';
</script>

<template>
  <div class="absolute top-0 bottom-0 right-0 left-0 flex flex-col-reverse h-full lg:flex-row overflow-hidden">
    <MainNavbar />
    <Panel />
    <Transition name="fade" mode="out-in">
      <Chat v-if="store.state.components.chat" :key="store.state.components.chat.id" />
    </Transition>
    <ProfileVue />
  </div>
</template>