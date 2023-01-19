<template>
	<header class="sticky top-0 border-b bg-white py-4">
		<div class="container mx-auto flex justify-between">
			<h2 class="text-xl font-semibold">Nuxt Blog</h2>

			<nav>
				<ul>
					<li>
						<NuxtLink to="/" class="underline">Home</NuxtLink>
					</li>
				</ul>
			</nav>
		</div>
	</header>

	<main class="container mx-auto pt-8 pb-4" v-bind="$attrs">
		<NuxtPage />
	</main>
</template>
