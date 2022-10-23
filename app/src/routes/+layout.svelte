<script>
	import { assets } from '$app/paths';
	// import '../../../styles/app.css';
	import '../../src/tailwind.css';

	import { user } from '$lib/sessionStore';
	import { supabase } from '$lib/supabaseClient';
	// import Auth from '$lib/Auth.svelte';
	// import Profile from '$lib/Profile.svelte';
	import { redirect } from '@sveltejs/kit';

	// user.set(supabase.auth.getUser());

	// supabase.auth.onAuthStateChange((_, session) => {
	// 	user.set(session.user);
	// });

	// if (!session.user) {
	// 	throw redirect(303, '/login');
	// }
</script>

<svelte:head>
	<!-- Site Styles -->
	<link rel="stylesheet" href="{assets}/site.css" />
</svelte:head>

<slot />

<style>
	@tailwind components;
	@tailwind utilities;
</style>
