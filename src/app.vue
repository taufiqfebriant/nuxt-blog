<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);

useHead({
	titleTemplate: (titleChunk) => {
		return titleChunk ? `${titleChunk} | Nuxt Blog` : 'Nuxt Blog';
	},
});
</script>

<template>
	<div class="mx-auto max-w-[65rem] pt-20 pb-14">
		<div class="flex justify-end">
			<button
				type="button"
				class="mb-10 rounded-lg bg-gray-200 p-3 text-black dark:bg-[#272729] dark:text-white"
				@click="toggleDark()"
			>
				<ClientOnly>
					<template #placeholder>
						<CustomIcon
							id="spinner"
							class="h-8 w-8 animate-spin fill-black text-gray-200 dark:fill-white dark:text-[#272729]"
						/>
					</template>

					<Icon
						size="20px"
						:name="
							isDark
								? 'material-symbols:light-mode-outline'
								: 'material-symbols:dark-mode-outline'
						"
					/>
				</ClientOnly>
			</button>
		</div>

		<NuxtPage />
	</div>
</template>
