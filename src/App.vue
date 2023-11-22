<script setup lang="ts">
import ErrorModal from './components/ErrorModal.vue';
import FlashMessage from './components/FlashMessage.vue';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { watch } from 'vue';
import { store } from '@/store';
import { listenChats, listenNewChats } from '@/pusher/listeners/chat';
import { listenUsers } from '@/pusher/listeners/user';
import type User from '@/interfaces/User';

window.Pusher = Pusher;

watch(
  () => store.state.auth.user, 
  (user?: User) => {
    if (!user) {
      return;
    }

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

    listenChats();
    listenUsers();
    listenNewChats();
  }, { immediate: true }
);
</script>

<template>
  <FlashMessage />
  <ErrorModal />
  <RouterView v-slot="{ Component }">
    <Transition name="fade" appear>
      <Component :is="Component" />
    </Transition>
  </RouterView>
</template>