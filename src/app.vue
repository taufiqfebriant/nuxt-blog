<template>
	<header class="border-b py-4 sticky top-0">
		<div class="flex justify-between container mx-auto">
			<h2 class="font-semibold text-xl">Vue Blog</h2>

			<nav>
				<ul>
					<li>
						<NuxtLink to="/" class="underline">Home</NuxtLink>
					</li>
				</ul>
			</nav>
		</div>
	</header>

	<main class="container mx-auto pt-8 pb-4">
		<NuxtPage />
	</main>
</template>
