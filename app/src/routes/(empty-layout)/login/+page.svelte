<script lang="ts">
	import Button, { Label, Icon } from '@smui/button';
	import TextField from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	import { login } from './login.store.js';
	// import { _ } from 'svelte-i18n';
	import Input from '$lib/components/Input.svelte';
	// import Button from '$lib/components/Button.svelte';

	let user = '';
	let password = '';
	let loginError: boolean = false;

	async function submit() {
		// const auth = await authenticateUser(user, password);
		// if (auth.user) {
		// 	loginError = false;
		// } else {
		// 	loginError = true;
		// }
	}
</script>

<div class="flex mx-auto m-3">
	<h2>Login</h2>
</div>

<div class="mdc-elevation--z8 mx-auto m-3 w-96 bg-white rounded-lg p-3">
	<form on:submit|preventDefault={submit} class="flex flex-col gap-4">
		<h2 class="font-bold mb-2 mx-auto">Hier einloggen</h2>
		<TextField variant="filled" bind:value={user} label="username" />
		<TextField variant="filled" bind:value={password} label="password" />

		<Button size="normal" fullwidth>Login</Button>

		<p class="text-red-700 mx-auto {loginError ? '' : 'hidden'}">wrong credentials</p>
	</form>
</div>

<style>
	@tailwind components;
	@tailwind utilities;
</style>
