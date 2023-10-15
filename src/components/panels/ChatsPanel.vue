<script setup lang="ts">
import PanelItem from './PanelItem.vue';
import Avatar from '../Avatar.vue';
import { onBeforeMount, ref } from 'vue';

</script>

<template>
  <div class="flex flex-col gap-3">
    
    <PanelItem :active="false">
      <template v-slot:start>
        <Avatar :size="'medium'" :avatar="'/flat,800x800,075,f.jpg'"/>
      </template>
      <template v-slot:middle>
        <p>User Name</p>
        <p class=" text-gray-400 truncate w-2/3 lg:w-2/4 xl:w-4/6">Last message Last message Last message</p>
      </template>
      <template v-slot:end>
        <p class="text-xs">12:34</p>
      </template>
    </PanelItem>
 
   
  </div>
</template>