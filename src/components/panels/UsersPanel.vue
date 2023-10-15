<script setup lang="ts">
import PanelItem from './PanelItem.vue';
import Avatar from '../Avatar.vue';
import { ref, onBeforeMount } from 'vue';
import type User from '@/interfaces/User';
import CustomButton from '../buttons/CustomButton.vue';

defineEmits<{
  openChat: [withUserUid: string]
}>();
</script>

<template>
  <div class="flex flex-col gap-3">
    <PanelItem>
      <template v-slot:start>
        <Avatar :size="'medium'"/>
      </template>
      <template v-slot:middle>
        <p>User Name</p>
      </template>
    </PanelItem>
    <CustomButton :color="'blue'">Load new users</CustomButton>
  </div>
</template>