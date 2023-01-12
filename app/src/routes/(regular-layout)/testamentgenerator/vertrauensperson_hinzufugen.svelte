<script lang="ts">
	import Textfield from '@smui/textfield';
	import Button, { Label } from '@smui/button';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import Card from '@smui/card/src/Card.svelte';
	import { family_members } from './testamentgenerator_store';

	export let handle_question_answer: (option: 0 | 1) => void;
	let vertrauensperson_id = 0;
</script>

<h3 class="font-bold mx-auto mb-4">Vertrauensperson hinzufügen</h3>

<div class="mdc-elevation--z8  flex flex-row self-center p-2 rounded-md text-center mb-3">
	<span class="my-auto mr-4">aus Liste auswählen:</span>
	<select
		required
		bind:value={vertrauensperson_id}
		class="ml-1 flex-grow select select-sm my-auto w-48"
	>
		<!-- <option disabled selected>{auswählen}</option> -->
		{#each $family_members as member}
			<option value={member.id}>{member.first_name} {member.last_name}</option>
		{/each}
	</select>
</div>

<div class="mx-auto mt-auto mb-4">
	<Button variant="raised" on:click={() => handle_question_answer(1)}>Fertig</Button>
</div>

<style>
	/* @tailwind components;
	@tailwind utilities; */
</style>
