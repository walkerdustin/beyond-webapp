<script lang="ts">
	import Button, { Label, Icon } from '@smui/button';
	import TextField from '@smui/textfield';
	import Checkbox from '@smui/checkbox';
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	import { onDestroy } from 'svelte';

	let email = '';
	let loginError: boolean = false;
	let requestSent: boolean = false;
	let signUp_errorMessage: string = '';
	let signUp_succesfull = false;

	///////////////////// This is for signUp
	async function submit() {
		console.log('submit!: ' + email + '  ' + password);
		requestSent = true;
		const res = await signUp(email, password);
		requestSent = false;
	}
	async function signUp(email: string, password: string) {
		console.log('calling SignUp with email: ' + email + ' and password: ');

		const { data, error } = await supabase.auth.signUp({
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
			signUp_succesfull = true;
			loginError = false;
		}
		console.log(data);
		console.log(error);
	}

	let password = '';
	let password_repeat = '';

	// check if the passwords are the same
	let password_repeat_error = false;
	let password_repeat_error_msg = 'Die Passwörter stimmen nicht überein';
	$: if (password != password_repeat) {
		password_repeat_error = new_password_repeat_field_touched ? true : false;
	} else {
		password_repeat_error = false;
	}
	let new_password_repeat_field_touched = false;
	$: if (password_repeat.length > 0) {
		new_password_repeat_field_touched = true;
	}

	// check if password is to short
	let password_to_short = false;
	let password_to_short_msg = 'Das Passwort muss mindestens 8 Zeichen lang sein';
	let new_password_field_touched = false;
	$: if (password.length < 8) {
		password_to_short = new_password_field_touched ? true : false;
	} else {
		password_to_short = false;
	}
	$: if (password.length > 0) {
		new_password_field_touched = true;
	}
	// set the error to false again, because it is anoying if the error shows up before the user has even started typing
	password_to_short = false;
	password_repeat_error = false;

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

	///////////////////// This is for signUp
	async function checkForSession() {
		const { data, error } = await supabase.auth.getSession();
		console.log('session = ', data.session);
		if (data.session) {
			await goto('/');
		} else {
			console.log('email not yet confirmed');
		}
	}
	const checkForSessionInterval = setInterval(checkForSession, 1000);
	onDestroy(() => clearInterval(checkForSessionInterval));
	// if the user has confirmed their email, the session should exist
</script>

<!-- <div class="flex mx-auto m-3">
	<h2 class="text-xl text-sky-400">Willkommen bei Beyond</h2>
</div> -->

<div class="mdc-elevation--z8 mx-auto m-4 mt-8 w-96 bg-white rounded-lg p-5">
	<form on:submit|preventDefault={submit} class="flex flex-col">
		<h2 class="font-bold mb-2 mx-auto mb-4">Hier registrieren</h2>
		<p>Ihre e-mail Adresse:</p>
		<TextField variant="filled" bind:value={email} label="email" type="email" required />
		<p class="mt-4">Ihr Passwort:</p>
		<TextField
			variant="filled"
			bind:value={password}
			label="passwort"
			type={password_input_type}
			required
		/>
		<p class="mt-4">Passwort wiederholen:</p>
		<TextField
			variant="filled"
			bind:value={password_repeat}
			label="passwort"
			type={password_input_type}
			required
		/>
		<div class="flex flex-row mt-3 mb-3">
			<Checkbox bind:checked={show_password} /> <span class="my-auto">passwort anzeigen</span>
		</div>

		<Button
			fullwidth
			disabled={requestSent || password_repeat_error || password_to_short}
			variant="raised">registrieren</Button
		>

		{#if loginError}
			<p class="text-red-700 mt-2">{signUp_errorMessage}</p>
		{/if}

		{#if password_to_short}
			<p class="text-red-700 mt-2">{password_to_short_msg}</p>
		{/if}
		{#if password_repeat_error}
			<p class="text-red-700 mt-2">{password_repeat_error_msg}</p>
		{/if}
	</form>
</div>

<div class="flex mx-auto m-3">
	<p class="text-blue-700">
		<a href="/login">Schon einen account? Hier anmelden.</a>
	</p>
</div>

{#if signUp_succesfull}
	<div class="flex flex-col mx-auto m-3">
		<p class="text-teal-700 mx-auto mb-2">Bestätigen Sie Ihre e-mail Adresse.</p>
		<p class="mx-auto text-blue-700 ">
			<a href="/login">Danach hier anmelden.</a>
		</p>
	</div>
{/if}

<style>
	/* @tailwind components;
	@tailwind utilities; */
</style>
