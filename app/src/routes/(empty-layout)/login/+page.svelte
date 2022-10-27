<script lang="ts">
	import Button, { Label, Icon } from '@smui/button';
	import TextField from '@smui/textfield';
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let loginError: boolean = false;
	let requestSent: boolean = false;
	let signUp_errorMessage: string = '';

	async function submit() {
		console.log('submit!: ' + email + '  ' + password);
		requestSent = true;
		const res = await signIn(email, password);
		requestSent = false;
	}

	async function signIn(email: string, password: string) {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password
		});

		if (error) {
			console.log('name', error.name);
			console.log('cause', error.cause);
			console.log('message', error.message);
			loginError = true;
			signUp_errorMessage = error.message;
		} else {
			console.log(data);
			console.log(error);
			await goto('/');
		}
	}
</script>

<div class="flex mx-auto m-3">
	<h2>Hier einloggen</h2>
</div>

<div class="mdc-elevation--z8 mx-auto m-3 w-96 bg-white rounded-lg p-3">
	<form on:submit|preventDefault={submit} class="flex flex-col gap-4">
		<h2 class="font-bold mb-2 mx-auto">Hier einloggen</h2>
		<TextField variant="filled" bind:value={email} label="email" />
		<TextField variant="filled" bind:value={password} label="password" />

		<Button size="normal" fullwidth disabled={requestSent}>einloggen</Button>
		{#if loginError}
			<p class="text-red-700 mx-auto">{signUp_errorMessage}</p>
		{/if}
	</form>
</div>

<div class="flex mx-auto m-3">
	<p class="text-blue-700">
		<a href="/signUp"> Du hast noch keinen Account? Hier registrieren.</a>
	</p>
</div>

<style>
	@tailwind components;
	@tailwind utilities;

	.Auth-container {
		@apply w-96;
	}
</style>
