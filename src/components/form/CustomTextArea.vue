<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
	modelValue: String,
	invalid: Boolean
})

const emit = defineEmits(['update:modelValue']);

function handleInputEvent(event: Event) {
	emit('update:modelValue', (event.target as HTMLInputElement).value);
}

const classes = computed<string>(() => {
	let classes = 'w-full bg-gray-100 rounded-md p-2 shadow-md focus:outline-none border border-transparent transition duration-300 ease-in  focus:border-gray-300 focus:bg-white focus:shadow-none '

	if (props.invalid)
		classes += 'border-red-500 shadow-none bg-white focus:border-red-500'

	return classes;
});
</script>

<template>
	<textarea :value="modelValue" @input="handleInputEvent" :class="classes"></textarea>
</template>
