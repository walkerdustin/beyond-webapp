<script lang="ts">
	import Button, { Label, Icon } from '@smui/button';
	import TextField from '@smui/textfield';
	import { supabase } from '$lib/supabaseClient';
	// follow tutorial at
	// https://supabase.com/docs/reference/javascript/auth-resetpasswordforemail

	let email = '';
	let loginError: boolean = false;
	let requestSent = false;
	async function submit() {
		requestSent = true;
		const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: 'https://app.service-beyond.de/update-password'
		});
	}
</script>

<div class="flex flex-col content-center">
	<h2>Passwort zurückseztzen</h2>
	<p>geben Sie ihre email ein, um ihr Passwort zurückzusetzten</p>

	<div class="mdc-elevation--z8 mx-auto m-3 w-96 bg-white rounded-lg p-3">
		<form on:submit|preventDefault={submit} class="flex flex-col gap-4">
			<TextField variant="filled" bind:value={email} label="email" type="email" required />

			<Button fullwidth disabled={requestSent}>Passwort zurücksetzten</Button>
			{#if requestSent}
				<p class="text-primary mx-auto">
					Wenn ein Konto mit dieser email adresse besteht, wurde Ihnen eine e-mail mit einem link
					gesendet.
				</p>
			{/if}
		</form>
	</div>
</div>
