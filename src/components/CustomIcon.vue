<script setup lang="ts">
const icons = ['spinner'] as const;
type Icon = (typeof icons)[number];

const props = defineProps<{
	id: Icon;
}>();
</script>

<template>
	<svg v-bind="$attrs">
		<use :href="`/images/sprite.svg#icon-${props.id}`" />
	</svg>
</template>
