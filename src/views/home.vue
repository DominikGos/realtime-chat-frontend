<script setup lang="ts">
import Panel from '../components/panels/Panel.vue';
import MainNavbar from '../components/MainNavbar.vue';
import Chat from '../components/chat/Chat.vue';
import { store } from '@/store';
import ProfileVue from '@/components/profile/Profile.vue';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { watch } from 'vue';
import { listenChats, listenNewChats } from '@/listeners/chat';
import { listenUsers } from '@/listeners/user';
import type User from '@/interfaces/User';

window.Pusher = Pusher;

watch(
  () => store.state.auth.user, 
  (user?: User) => {
    if (!user)
      return;

    window.Echo = new Echo({
      authEndpoint: `${import.meta.env.VITE_API_HOST}/broadcasting/auth`,
      broadcaster: 'pusher',
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
      forceTLS: true,
      auth: {
        headers: {
          Authorization: 'Bearer ' + user?.token
        },
      },
    });

  }, { immediate: true }
);

listenChats();
listenUsers();
listenNewChats();
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