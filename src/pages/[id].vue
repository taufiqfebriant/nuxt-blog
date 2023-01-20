<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

const route = useRoute();
const id = route.params.id;

type Post = {
	id: number;
	title: string;
	body: string;
	userId: number;
	tags: string[];
	reactions: number;
};

const fetchPost = async (): Promise<Post> => {
	const response = await fetch(`https://dummyjson.com/posts/${id}`);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	return response.json();
};

const { data, isError, isLoading } = useQuery({
	queryKey: ['posts', { id }],
	queryFn: fetchPost,
});
</script>

<template>
	<div v-if="isLoading" class="flex justify-center">
		<CustomIcon
			id="spinner"
			class="h-10 w-10 animate-spin fill-[#050C18] text-[#D4D6DC]"
		/>
	</div>

	<p v-else-if="isError">Something went wrong.</p>

	<p v-else-if="!data">No post found.</p>

	<div v-else>
		<Head>
			<Title>{{ data.title }} | Nuxt Blog</Title>
		</Head>

		<NuxtLink to="/" class="text-[1.6rem] font-medium text-gray-600 underline"
			>Back</NuxtLink
		>

		<h1 class="mt-8 text-7xl font-bold">{{ data.title }}</h1>

		<div class="mt-8 flex divide-x divide-gray-600 text-gray-600">
			<p class="pr-4 text-[1.4rem]">{{ data.reactions }} reactions</p>

			<div class="flex items-center gap-x-3 pl-4">
				<p v-for="tag in data.tags" :key="tag" class="text-[1.4rem]">
					#{{ tag }}
				</p>
			</div>
		</div>

		<p class="mt-12 text-[1.65rem] text-gray-600">{{ data.body }}</p>
	</div>
</template>
