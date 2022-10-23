<script>
	import { assets } from '$app/paths';
	// import '../../../styles/app.css';
	import '../../src/tailwind.css';
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
