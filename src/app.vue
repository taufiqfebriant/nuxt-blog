<script setup lang="ts">
import { useDark } from '@vueuse/core';

const isDark = useDark();
</script>

<template>
	<div class="mx-auto max-w-[65rem] pt-20 pb-14">
		<div class="flex justify-end">
			<button
				type="button"
				class="mb-10 rounded-lg bg-gray-200 p-3 text-gray-500 dark:bg-[#272729] dark:text-white"
			>
				<ClientOnly>
					<template #placeholder>
						<CustomIcon
							id="spinner"
							class="h-8 w-8 animate-spin fill-gray-600 text-gray-300"
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
