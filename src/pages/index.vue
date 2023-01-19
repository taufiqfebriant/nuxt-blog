<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

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
	<h1 class="text-5xl font-bold">Vue Blog</h1>

	<p v-if="isLoading">Loading...</p>

	<p v-else-if="isError">Something went wrong.</p>

	<p v-else-if="!data?.posts.length">No posts found.</p>

	<div v-else class="mt-10 grid grid-cols-4 gap-4">
		<NuxtLink
			v-for="post in data.posts"
			:key="post.id"
			:to="`/${post.id}`"
			class="rounded border px-4 py-3"
		>
			<h2 class="text-lg font-semibold">{{ post.title }}</h2>
		</NuxtLink>
	</div>
</template>
