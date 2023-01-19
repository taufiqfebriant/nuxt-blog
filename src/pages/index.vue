<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

useHead({
	title: 'Vue Blog',
});

type JsonResponse = {
	posts: Post[];
	total: number;
	skip: number;
	limit: number;
};

type Post = {
	id: number;
	title: string;
	body: string;
	userId: number;
	tags: string[];
	reactions: number;
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
	<h1 class="font-bold text-5xl">Vue Blog</h1>

	<p v-if="isLoading">Loading...</p>

	<p v-else-if="isError">Something went wrong.</p>

	<p v-else-if="!data?.posts.length">No posts found.</p>

	<div class="grid grid-cols-4 gap-4 mt-10" v-else>
		<NuxtLink
			:to="`/${post.id}`"
			v-for="post in data.posts"
			:key="post.id"
			class="border rounded px-4 py-3"
		>
			<h2 class="font-semibold text-lg">{{ post.title }}</h2>
		</NuxtLink>
	</div>
</template>
