<script setup lang="ts">
import Avatar from '../Avatar.vue';
</script>

<template>
  <header class="w-full border-b-2 p-3 border-gray-100 flex justify-center items-center relative">
    <button class="absolute left-0 top-0 p-3 h-full flex items-center">
      <i class="fa-solid fa-caret-left text-cyan-400"></i>
    </button>
    <div class="flex items-center gap-2">
      <slot name="members"></slot>
    </div>
    <div class="absolute right-0 top-0 flex items-center gap-3 h-full p-3">
      <button>
        <i class="fa-solid fa-phone text-cyan-400"></i>
      </button>
      <button>
        <i class="fa-solid fa-video text-cyan-400"></i>
      </button>
    </div>
  </header>
</template>