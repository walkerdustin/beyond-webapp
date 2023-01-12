<script lang="ts">
	import Button, { Label, Icon } from '@smui/button';
	import TextField from '@smui/textfield';
	import { supabase } from '$lib/supabaseClient';
	import Checkbox from '@smui/checkbox';
	import { user_s } from '$lib/global-store';

	// supabase.auth.onAuthStateChange(async (event, session) => {
	// 	if (event == 'PASSWORD_RECOVERY') {
	// 		const newPassword = prompt('What would you like your new password to be?');
	// 		if (newPassword) {
	// 			const { data, error } = await supabase.auth.updateUser({ password: newPassword });
	// 			console.log(data, error);
	// 			if (data) alert('Password updated successfully!');
	// 			if (error) alert('There was an error updating your password.');
	// 		}
	// 	}
	// });

	let requestSent = false;
	let loginError: boolean = false;
	let signUp_errorMessage: string = '';
	let password_update_succesfull = false;
	async function check_oldPassword(old_password: string) {
		// check if the old password is correct by trying to login with it

		const { data, error } = await supabase.auth.signInWithPassword({
			email: user_s?.email ? user_s?.email : '',
			password: old_password
		});
		if (error) {
			return false;
		} else {
			return true;
		}
	}

	async function submit() {
		console.log('submit!: ' + '  ' + new_password);

		// check if the old password is correct by trying to login with it
		const old_password_correct = await check_oldPassword(old_password);
		if (!old_password_correct) {
			loginError = true;
			signUp_errorMessage = 'Das alte Passwort ist nicht korrekt';
			return;
		} else {
			loginError = false;
		}

		requestSent = true;
		const { data, error } = await supabase.auth.updateUser({ password: new_password });
		if (error) {
			console.log('name', error.name);
			console.log('cause', error.cause);
			console.log('message', error.message);
			loginError = true;
			signUp_errorMessage = error.message;
		} else {
			password_update_succesfull = true;
			loginError = false;
		}
		requestSent = false;
	}

	function passwordvisible(visible: boolean) {
		return visible ? 'text' : 'password';
	}
	let show_password = false;
	let password_input_type = 'password';
	$: password_input_type = passwordvisible(show_password);

	let old_password = '';
	let new_password = '';
	let new_password_repeat = '';

	// check if the passwords are the same
	let password_repeat_error = false;
	let password_repeat_error_msg = 'Die Passwörter stimmen nicht überein';
	$: if (new_password != new_password_repeat) {
		password_repeat_error = new_password_repeat_field_touched ? true : false;
	} else {
		password_repeat_error = false;
	}
	let new_password_repeat_field_touched = false;
	$: if (new_password_repeat.length > 0) {
		new_password_repeat_field_touched = true;
	}

	// check if password is to short
	let password_to_short = false;
	let password_to_short_msg = 'Das Passwort muss mindestens 8 Zeichen lang sein';
	let new_password_field_touched = false;
	$: if (new_password.length < 8) {
		password_to_short = new_password_field_touched ? true : false;
	} else {
		password_to_short = false;
	}
	$: if (new_password.length > 0) {
		new_password_field_touched = true;
	}
	// set the error to false again, because it is anoying if the error shows up before the user has even started typing
	password_to_short = false;
	password_repeat_error = false;
</script>

<div class="mdc-elevation--z8 mx-auto m-4 mt-8 w-96 bg-white rounded-lg p-5">
	<form on:submit|preventDefault={submit} class="flex flex-col">
		<h2 class="font-bold mb-2 mx-auto">Passwort ändern</h2>
		<p>Altes Passwort:</p>
		<TextField
			variant="filled"
			bind:value={old_password}
			label="altes passwort"
			type={password_input_type}
			required
		/>

		<p class="mt-4">Neues Passwort:</p>
		<TextField
			variant="filled"
			bind:value={new_password}
			label="neues passwort"
			type={password_input_type}
			required
		/>

		<p class="mt-4">Neues Passwort wiederholen:</p>
		<TextField
			variant="filled"
			bind:value={new_password_repeat}
			label="neues passwort"
			type={password_input_type}
			required
		/>

		<div class="flex flex-row mt-2 mb-2">
			<Checkbox bind:checked={show_password} /> <span class="my-auto">passwort anzeigen</span>
		</div>

		<Button fullwidth disabled={requestSent} variant="raised">speichern</Button>
		<div class="mt-2" />
		{#if password_to_short}
			<p class="text-red-700 mx-auto">{password_to_short_msg}</p>
		{/if}
		{#if password_repeat_error}
			<p class="text-red-700 mx-auto">{password_repeat_error_msg}</p>
		{/if}
		{#if loginError}
			<p class="text-red-700 mx-auto">{signUp_errorMessage}</p>
		{/if}

		{#if password_update_succesfull}
			<p class="text-green-700 mx-auto">Passwort erfolgreich geändert</p>
		{/if}
	</form>
</div>

<div class="mx-auto flex justify-center mt-8">
	<Button variant="raised">
		<a href="/" draggable="false">
			<Label>zurück</Label>
		</a>
	</Button>
</div>

<style>
	/* @tailwind components;
	@tailwind utilities; */
</style>
