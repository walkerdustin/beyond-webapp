<script lang="ts">
	import Button, { Label, Icon } from '@smui/button';
	import TextField from '@smui/textfield';
	import { supabase } from '$lib/supabaseClient';
	import Checkbox from '@smui/checkbox';

	let requestSent = false;
	let new_password = '';

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
	let loginError: boolean = false;
	let signUp_errorMessage: string = '';
	let password_update_succesfull = false;

	async function submit() {
		console.log('submit!: ' + '  ' + new_password);
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
</script>

<div class="mdc-elevation--z8 mx-auto m-3 w-96 bg-white rounded-lg p-3">
	<form on:submit|preventDefault={submit} class="flex flex-col gap-4">
		<h2 class="font-bold mb-2 mx-auto">neues Passwort eingeben</h2>
		<TextField
			variant="filled"
			bind:value={new_password}
			label="password"
			type={password_input_type}
			required
		/>
		<div class="flex flex-row">
			<Checkbox bind:checked={show_password} /> <span class="my-auto">show password</span>
		</div>

		<Button fullwidth disabled={requestSent}>speichern</Button>
		{#if loginError}
			<p class="text-red-700 mx-auto">{signUp_errorMessage}</p>
		{/if}

		{#if password_update_succesfull}
			<p class="text-green-700 mx-auto">Passwort erfolgreich geändert</p>

			<div class="mx-auto">
				<Button>
					<a href="/" draggable="false" class="h-">
						<Label>weiter zur App</Label>
					</a>
				</Button>
			</div>
		{/if}
	</form>
</div>
