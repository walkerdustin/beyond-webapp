<script lang="ts">
	// import Card from '@smui/card';

	let progress = 0.4;
	import { Title } from '@smui/top-app-bar';
	import NachlassplanCard from './nachlassplan_card.svelte';
	import { supabase } from '$lib/supabaseClient';

	import { onMount } from 'svelte';

	onMount(() => {
		let user = supabase.auth.getUser().then((value) => {
			console.log(value.data.user);
			return value.data.user;
		});
		console.log(supabase.auth.getUser());
		console.log(user);
	});
</script>

<div class="">
	<div class="mx-auto my-2 flex flex-row justify-center">
		<h1>Nachlassplan</h1>
	</div>

	<div class="flex flex-row flex-wrap justify-center max-w-4xl mx-auto">
		<NachlassplanCard
			title="Persönliche Informationen"
			description="Geben Sie Ihre Daten und die Daten ihrer Vertrauenspersonen ein."
			progress={0.7049}
		/>
		<NachlassplanCard
			title="Dokumente Erstellen "
			description="Testament, Patientenverfügung, Bestattungsverfügung und vieles mehr."
			progress={0.12}
		/>
		<NachlassplanCard
			title="Versicherungen"
			description="Verschaffen Sie Ihren Vertrauenspersonen eine Übersicht über Ihre Versicherungen."
			progress={1}
		/>
		<NachlassplanCard
			title="Vermögensübersicht"
			description="Behalten Sie den Überblick über Ihre Vermögensgegenstände. "
			progress={1}
		/>
		<NachlassplanCard
			title="Abonnements "
			description="Informieren Sie Vertrauenspersonen über abgeschlossene Abbonements. "
			progress={1}
		/>
		<NachlassplanCard
			title="Notfallpaket "
			description="Detaillierter, personalisierter Leitfaden für Vertrauenspoersonen im Ernstfall."
			progress={1}
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
