<script setup lang="ts">
import Panel from '../components/panels/Panel.vue';
import MainNavbar from '../components/MainNavbar.vue';
import Chat from '../components/chat/Chat.vue';
import { store } from '@/store';
import ProfileVue from '@/components/Profile.vue';
</script>

<template>
  <div class="flex flex-col-reverse h-screen lg:flex-row">
    <MainNavbar/>
    <Panel/>
    <Transition name="fade" mode="out-in">
      <Chat v-if="store.state.components.chat" :key="store.state.components.chat.id"/>
    </Transition>
    <ProfileVue/>
  </div>
</template>