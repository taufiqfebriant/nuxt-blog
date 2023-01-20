<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import CustomIcon from '../components/CustomIcon.vue';

type Post = {
	id: number;
	title: string;
	body: string;
	userId: number;
	tags: string[];
	reactions: number;
};

type JsonResponse = {
	posts: Post[];
	total: number;
	skip: number;
	limit: number;
};

const fetchPosts = async (): Promise<JsonResponse> => {
	const response = await fetch('https://dummyjson.com/posts?limit=10');
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	return response.json();
};

const { data, isError, isLoading } = useQuery({
	queryKey: ['posts'],
	queryFn: fetchPosts,
});
</script>

<template>
	<h1 class="text-5xl font-bold">Nuxt Blog</h1>

	<div v-if="isLoading" class="mt-10 flex justify-center">
		<CustomIcon
			id="spinner"
			class="h-8 w-8 animate-spin fill-[#050C18] text-[#D4D6DC]"
		/>
	</div>

	<p v-else-if="isError">Something went wrong.</p>

	<p v-else-if="!data?.posts.length">No posts found.</p>

	<div v-else class="mt-10 flex flex-col gap-y-10">
		<NuxtLink v-for="post in data.posts" :key="post.id" :to="`/${post.id}`">
			<h2 class="text-xl font-medium">{{ post.title }}</h2>

			<p class="mt-2 text-gray-600 line-clamp-2">{{ post.body }}</p>
		</NuxtLink>
	</div>
</template>
