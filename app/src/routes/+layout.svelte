<script>
	import { assets } from '$app/paths';
</script>

<svelte:head>
	<!-- Site Styles -->
	<link rel="stylesheet" href="{assets}/site.css" />
</svelte:head>

<slot />

<style>
	@tailwind components;
	@tailwind utilities;
</style>
