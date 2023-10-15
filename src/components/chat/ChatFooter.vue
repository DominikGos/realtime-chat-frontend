<script setup lang="ts">
import { ref, computed } from 'vue';
import FormFile from './FormFile.vue'

const showSendButton = ref(false);
const message = ref({
  text: '',
  files: [
    /*  {
       path: 'file'
     } */
  ],
});

function changeSendButtonVisibility(e: any): void {
  if (e.target.value.length > 0)
    showSendButton.value = true
  else
    showSendButton.value = false
}

function addFile(e: any): void {
  //const filePath = uploadFile() add upload file function

  message.value.files.push({ path: '/file-path' })
}

function removeFile(/* filePath: string */): void {
  //const filePath = removeFile() add remove file function

  message.value.files.shift()
}

const textInputClasses = computed(() => {
  let classes = 'peer py-2 pl-3 pr-10 w-full border-r border-l border-b border-gray-100 focus:border-gray-300 bg-gray-100 focus:bg-white focus:outline-none text-gray-800 transition duration-300 ease-in ';

  if (message.value.files.length > 0) {
    classes += 'rounded-bl-3xl rounded-br-3xl'
  } else {
    classes += 'rounded-full border-t'
  }

  return classes;
});
</script>

<template>
  <form @submit.prevent class="flex gap-3 items-end w-full p-3 border-t-2 border-gray-100 bg-white ">
    <div class="flex gap-2 items-center">
      <input @change="addFile" type="file" ref="file" id="file" class="hidden" multiple />
      <label for="file" class="cursor-pointer">
        <i class="fa-regular fa-image text-cyan-400"></i>
      </label>
    </div>
    <div class="flex flex-col-reverse w-full overflow-hidden">
      <input @input="changeSendButtonVisibility" :class="textInputClasses" type="text"
        placeholder="Type your message ..." />
      <div v-if="message.files.length > 0"
        class="flex gap-2 peer-focus:bg-white peer-focus:border-t peer-focus:border-r peer-focus:border-l peer-focus:border-b-transparent border border-transparent  peer-focus:border-gray-300 transition duration-300 ease-in overflow-x-auto bg-gray-100 p-3 rounded-tl-2xl rounded-tr-2xl scrollbar-thin scrollbar-thumb-gray-300">
        <FormFile v-for="file in message.files" @removeFile="removeFile" />
      </div>
    </div>
    <Transition name="fade">
      <button v-if="showSendButton">
        <i class="fa-solid fa-paper-plane text-cyan-400"></i>
      </button>
    </Transition>
  </form>
</template>