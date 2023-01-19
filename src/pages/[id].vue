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
	<p v-if="isLoading">Loading...</p>

	<p v-else-if="isError">Something went wrong.</p>

	<p v-else-if="!data">No post found.</p>

	<template v-else>
		<Head>
			<Title>{{ data.title }} | Vue Blog</Title>
		</Head>

		<h1 class="text-5xl font-bold">{{ data.title }}</h1>
		<p class="mt-4">{{ data.body }}</p>
	</template>
</template>
