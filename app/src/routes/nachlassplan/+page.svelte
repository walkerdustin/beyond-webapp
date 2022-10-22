<script lang="ts">
	// import Card from '@smui/card';

	let progress = 0.4;
	import { Title } from '@smui/top-app-bar';
	import NachlassplanCard from './nachlassplan_card.svelte';
</script>

<div class="">
	<div class="mx-auto my-2 flex flex-row justify-center">
		<h1>Nachlassplan</h1>
	</div>

	<div class="flex flex-row justify-center">
		<NachlassplanCard
			title="Persönliche Informationen"
			description="Geben Sie Ihre Daten und die Daten ihrer Vertrauenspersonen ein."
			progress={0.4}
		/>
	</div>
</div>

<style>
	@tailwind components;
	@tailwind utilities;
	/* .background {
		background-color: var(--mdc-theme-background, #fff);
	} */
</style>
