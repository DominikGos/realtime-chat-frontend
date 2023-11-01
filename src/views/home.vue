<script setup lang="ts">
import Panel from '../components/panels/Panel.vue';
import MainNavbar from '../components/MainNavbar.vue';
import Chat from '../components/chat/Chat.vue';
import { store } from '@/store';
import ProfileVue from '@/components/Profile.vue';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import AuthService from '../services/AuthService';
import { watch } from 'vue';
import type Message from '@/interfaces/Message';
import { listenChats } from '@/listeners/chat';

const authService = new AuthService;
window.Pusher = Pusher;

window.Echo = new Echo({
  authEndpoint: 'http://realtime-chat/broadcasting/auth',
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true,
  auth: {
    headers: {
      Authorization: 'Bearer ' + authService.getUserFromTheBrowser()?.token
    },
  },
});

listenChats();
</script>

<template>
  <div class="flex flex-col-reverse h-screen lg:flex-row">
    <MainNavbar />
    <Panel />
    <Transition name="fade" mode="out-in">
      <Chat v-if="store.state.components.chat" :key="store.state.components.chat.id" />
    </Transition>
    <ProfileVue />
  </div>
</template>