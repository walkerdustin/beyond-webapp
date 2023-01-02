<script lang="ts">
	import Textfield from '@smui/textfield';
	import Button, { Label } from '@smui/button';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { Circle2 } from 'svelte-loading-spinners';

	export let handle_question_answer: (option: 0 | 1) => void;
	let loading = true;

	onMount(async () => {
		await new Promise((f) => setTimeout(f, 5000)); // simulate delay
		loading = false;
	});
</script>

<h2 class="mx-auto mb-4">Testament wird generiert</h2>
<div class="mx-auto mb-4">
	{#if loading}
		<Circle2 size="60" unit="px" />
	{:else}
		<p>Testament wurde generiert</p>
	{/if}
</div>

<div class="mx-auto mt-auto mb-4">
	<Button variant="raised" on:click={() => handle_question_answer(1)}>Fertig</Button>
</div>

<style>
	/* @tailwind components;
@tailwind utilities; */
</style>
