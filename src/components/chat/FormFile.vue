<script setup lang="ts">
defineEmits([
  'removeFile'
])

</script>

<template>
  <div class="bg-white rounded-md w-11 h-11 min-w-[2.75rem] relative border border-gray-300">
    <div class="w-full h-full overflow-hidden rounded-md">
      <img src="flat,800x800,075,f.jpg">
    </div>
    <button @click="$emit('removeFile')"
      class="justify-center items-center rounded-full w-5 h-5 -right-1 -top-1 absolute flex border border-gray-300 bg-white">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
</template>