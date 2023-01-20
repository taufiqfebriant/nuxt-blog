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

const postQuery = reactive(
	useQuery({
		queryKey: ['posts', { id }],
		queryFn: fetchPost,
	})
);

interface User {
	id: number;
	username: string;
}

interface Comment {
	id: number;
	body: string;
	postId: number;
	user: User;
}

interface Root {
	comments: Comment[];
	total: number;
	skip: number;
	limit: number;
}

const fetchComments = async (): Promise<Root> => {
	const response = await fetch(`https://dummyjson.com/comments/post/${id}`);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	return response.json();
};

const commentsQuery = reactive(
	useQuery({
		queryKey: ['comments', { postId: id }],
		queryFn: fetchComments,
	})
);
</script>

<template>
	<main
		v-if="postQuery.isLoading || commentsQuery.isLoading"
		class="flex justify-center"
	>
		<CustomIcon
			id="spinner"
			class="h-10 w-10 animate-spin fill-[#050C18] text-[#D4D6DC]"
		/>
	</main>

	<p v-else-if="postQuery.isError">Something went wrong.</p>

	<p v-else-if="!postQuery.data">No post found.</p>

	<main v-else>
		<Head>
			<Title>{{ postQuery.data.title }} | Nuxt Blog</Title>
		</Head>

		<NuxtLink to="/" class="text-[1.6rem] font-medium text-gray-600 underline"
			>Back</NuxtLink
		>

		<h1 class="mt-8 text-7xl font-bold">{{ postQuery.data.title }}</h1>

		<div class="mt-8 flex divide-x divide-gray-500 text-gray-500">
			<p class="pr-4 text-[1.4rem]">{{ postQuery.data.reactions }} reactions</p>

			<div class="flex items-center gap-x-3 pl-4">
				<p v-for="tag in postQuery.data.tags" :key="tag" class="text-[1.4rem]">
					#{{ tag }}
				</p>
			</div>
		</div>

		<p class="mt-12 text-[1.65rem] text-gray-600">{{ postQuery.data.body }}</p>

		<hr class="mt-10 border-gray-300" />

		<h2 class="mt-8 text-5xl font-bold">Comments</h2>

		<div
			v-for="comment in commentsQuery.data?.comments"
			:key="comment.id"
			class="mt-6 flex flex-col gap-y-10"
		>
			<article>
				<h3 class="text-[1.3rem] text-gray-500">
					{{ comment.user.username }}
				</h3>
				<p class="text-[1.65rem] text-gray-600">{{ comment.body }}</p>
			</article>
		</div>
	</main>
</template>
