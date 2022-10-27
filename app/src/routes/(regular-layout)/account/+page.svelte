<script lang="ts">
	import Button, { Label, Icon } from '@smui/button';
	import TextField from '@smui/textfield';
	import { supabase } from '$lib/supabaseClient';
	import { Svg } from '@smui/common/elements';
	import { mdiLogout } from '@mdi/js';
	import { mdiFormTextboxPassword } from '@mdi/js';
	import { mdiDelete } from '@mdi/js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { AuthSession } from '@supabase/supabase-js';
	async function signOut() {
		console.log('SignOut');
		const { error } = await supabase.auth.signOut();
		if (!error) {
			console.log('logging out');
			document.cookie = '';
			document.cookie = '';
			// await goto('/loggedOut', { replaceState: true });
			window.location.href = '/loggedOut';
		}
	}

	let clicked = 0;

	let loading = false;
	let username: string | null = null;
	let website: string | null = null;
	let email = '';
	let avatarUrl: string | null = null;
</script>

<div class="mdc-elevation--z8 mx-auto m-3 w-60 bg-white rounded-lg p-3 flex flex-col">
	<Button on:click={signOut}>
		<Icon component={Svg} viewBox="0 0 24 24">
			<path fill="currentColor" d={mdiLogout} />
		</Icon>
		<Label>ausloggen</Label>
	</Button>

	<Button on:click={() => clicked++}>
		<Icon component={Svg} viewBox="0 0 24 24">
			<path fill="currentColor" d={mdiFormTextboxPassword} />
		</Icon>
		<Label>passwort ändern</Label>
	</Button>

	<Button disabled>
		<Icon component={Svg} viewBox="0 0 24 24">
			<path fill="currentColor" d={mdiDelete} />
		</Icon>
		<Label>Account Löschen</Label>
	</Button>
</div>

<style>
	@tailwind components;
	@tailwind utilities;
</style>
