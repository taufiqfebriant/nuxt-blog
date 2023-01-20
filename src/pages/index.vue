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
	<div class="flex items-center justify-between">
		<h1 class="text-7xl font-bold">Nuxt Blog</h1>

		<Icon name="logos:nuxt-icon" size="4.2rem" />
	</div>

	<div v-if="isLoading" class="mt-10 flex justify-center">
		<CustomIcon
			id="spinner"
			class="h-10 w-10 animate-spin fill-[#050C18] text-[#D4D6DC]"
		/>
	</div>

	<p v-else-if="isError">Something went wrong.</p>

	<p v-else-if="!data?.posts.length">No posts found.</p>

	<div v-else class="mt-14 flex flex-col gap-y-14">
		<NuxtLink v-for="post in data.posts" :key="post.id" :to="`/${post.id}`">
			<h2 class="text-[2rem] font-semibold">{{ post.title }}</h2>

			<p class="mt-2 text-[1.5rem] text-gray-600 line-clamp-2">
				{{ post.body }}
			</p>

			<div class="mt-5 flex divide-x divide-gray-600 text-gray-600">
				<div class="flex items-center gap-x-3 pr-4">
					<Icon name="material-symbols:add-reaction-outline" size="1.6rem" />
					<p class="text-[1.3rem]">{{ post.reactions }} reactions</p>
				</div>

				<div class="flex items-center gap-x-3 pl-4">
					<p v-for="tag in post.tags" :key="tag" class="text-[1.3rem]">
						#{{ tag }}
					</p>
				</div>
			</div>
		</NuxtLink>
	</div>
</template>
