<script setup lang="ts">
import Panel from '../components/panels/Panel.vue';
import MainNavbar from '../components/MainNavbar.vue';
import ChatsPanel from '../components/panels/ChatsPanel.vue';
import Chat from '../components/chat/Chat.vue';
import UsersPanel from '../components/panels/UsersPanel.vue'
import { ref } from 'vue';

const currentPanelName = ref('Chats');
const currentChatUuid = ref<string>();
</script>

<template>
  <div class="flex flex-col-reverse h-screen lg:flex-row">
    <MainNavbar/>
    <Panel :panelName="currentPanelName">
      <Transition name="fade" mode="out-in">
        <ChatsPanel v-if="currentPanelName === 'Chats'" />
        <UsersPanel v-else-if="currentPanelName === 'Users'"/>
      </Transition>
    </Panel>
    <Transition name="fade" mode="out-in">
      <Chat/>
    </Transition>
  </div>
</template>