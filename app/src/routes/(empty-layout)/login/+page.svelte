<script lang="ts">
	import Button, { Label, Icon } from '@smui/button';
	import TextField from '@smui/textfield';
	import Checkbox from '@smui/checkbox';
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	import { mdiMenu } from '@mdi/js';
	import { Svg } from '@smui/common/elements';
	import { mdiEyeOff } from '@mdi/js';

	let email = '';
	let password = '';
	let loginError: boolean = false;
	let requestSent: boolean = false;
	let signUp_errorMessage: string = '';

	async function submit() {
		console.log('submit!: ');
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
	function passwordvisible(visible: boolean) {
		return visible ? 'text' : 'password';
	}
	let show_password = false;
	let password_input_type = 'password';
	$: password_input_type = passwordvisible(show_password);
	// $: {
	// 	console.log('the password type is '+ password_input_type);
	// }
	// $: {
	// 	console.log('show_password is '+ show_password);
	// }
</script>

<!-- <div class="flex mx-auto m-3">
	<h2>Hier einloggen</h2>
</div> -->

<div class="mdc-elevation--z8 mx-auto m-3 w-96 bg-white rounded-lg p-3">
	<form on:submit|preventDefault={submit} class="flex flex-col gap-4">
		<h2 class="font-bold mb-2 mx-auto">Hier einloggen</h2>
		<TextField variant="filled" bind:value={email} label="email" type="email" required />
		<TextField
			variant="filled"
			bind:value={password}
			label="passwort"
			type={password_input_type}
			required
		/>
		<div class="flex flex-row">
			<Checkbox bind:checked={show_password} /> <span class="my-auto">passwort anzeigen</span>
		</div>

		<Button size="normal" fullwidth disabled={requestSent} variant="raised">einloggen</Button>
		{#if loginError}
			<p class="text-red-700 mx-auto">{signUp_errorMessage}</p>
		{/if}
	</form>
</div>

<div class="flex flex-col mx-auto m-3">
	<p class="text-primary">
		<a href="/signUp"> Du hast noch keinen Account? Hier registrieren.</a>
	</p>
	<!-- make a new line to seperate the links -->
	<br />
	<p>
		<a class="text-primary " href="reset-password">Passwort vergessen?</a>
	</p>
</div>

<style>
	/* @tailwind components;
	@tailwind utilities; */
</style>
