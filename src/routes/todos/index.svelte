
<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	// see https://kit.svelte.dev/docs#loading
	export const load: Load = ({ session }) => {
		return {
			props: { lang: session.lang }
		};
	};
</script>

<script lang="ts">
	export let lang: string;
</script>

<svelte:head>
	<title>Lang</title>
</svelte:head>

<div class="todos">
	<h1>We use lang: {lang}</h1>
</div>

<style>
	.todos {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
		line-height: 1;
	}
</style>
