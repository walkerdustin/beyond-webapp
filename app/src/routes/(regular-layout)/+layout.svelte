<script lang="ts">
	// here is some typescript
	// import '@material/elevation/mdc-elevation';
	// import Paper, { Title, Content } from '@smui/paper';

	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	//import Drawer, { Content, Scrim, AppContent } from '@smui/drawer';

	// for the icons
	import { Icon } from '@smui/common';
	import { Svg } from '@smui/common/elements';
	import Button, { Label } from '@smui/button';
	import IconButton from '@smui/icon-button';

	import Paper, { Subtitle, Content } from '@smui/paper';

	import { mdiAccount } from '@mdi/js';

	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	import { user_s, set_user } from '$lib/global-store';

	onMount(async () => {
		const {
			data: { user }
		} = await supabase.auth.getUser();
		console.log('user', user);
		if (!user) {
			await goto('/signUp');
		}
		set_user(user);
	});

	async function getAuthUser() {
		const {
			data: { user }
		} = await supabase.auth.getUser();

		return user;
	}

	let promise = getAuthUser();
</script>

{#await promise}
	<h1 class="mx-auto">LOGGING IN ... loading</h1>
{:then user}
	{#if user}
		<header class="flex flex-row w-full mdc-elevation--z8 bg-surface">
			<a href="/" draggable="false"
				><img
					src="/images/beyond-logo.png"
					alt="beyond logo"
					width="60"
					class="m-4"
					draggable="false"
				/>
			</a>

			<div class="flex flex-col justify-center">
				<h1 class="mb-1 font-extrabold">beyond</h1>
				<p class="">After Life Management</p>
			</div>
			<!-- just whitespace -->
			<div class="grow" />
			<nav>
				<div class="float-right mr-2">
					<Button>
						<a href="/testamentgenerator"><Label>Testament</Label></a>
					</Button>
					<Button>
						<a href="/nachlassplan"><Label>Nachlassplan</Label></a>
					</Button>
					<Button>
						<a href="/meine-dokumente" draggable="false"><Label>Meine Dokumente</Label></a>
					</Button>
					<Button>
						<a href="/beratung" draggable="false"><Label>Individuelle Beratung</Label></a>
					</Button>

					<IconButton>
						<a href="/account" draggable="false">
							<Icon component={Svg} viewBox="0 0 24 24">
								<path fill="currentColor" d={mdiAccount} />
							</Icon>
						</a>
					</IconButton>

					<!-- <Button variant="raised">
					
						<Icon component={Svg} viewBox="0 0 24 24">
							<path fill="currentColor" d={mdiAccount} />
						</Icon>
					</a>
				</Button> -->
				</div>
			</nav>
		</header>

		<!-- <div class="flexy-dad">
	{#each [...Array(24)].map((_v, i) => i + 1) as n}
		<div class="mdc-elevation--z{n} flexy-boy">Elevation: {n}</div>
	{/each}
</div> -->
		<main>
			<slot><!-- optional fallback --></slot>
		</main>

		<footer class="mt-auto mdc-elevation--z8 py-3 bg-surface">
			<div class="grid grid-cols-3">
				<div class="justify-self-center">
					<div><b>Beyond</b></div>
					<div>Rotebühlstraße</div>
					<div>70078 Stuttgart</div>
					<div>Deutschland</div>
				</div>
				<div class="justify-self-center">
					<b>Kontakt</b>
					<div>+4917642632218</div>
					<div>info@service-beyond.de</div>
				</div>
				<div class="justify-self-center">
					<div>Copyright 2022 beyond</div>
					<div>Powered by beyond</div>
				</div>
			</div>
		</footer>
	{:else}
		<h1 class="mx-auto">redirecting ...</h1>
	{/if}
{:catch error}
	<p class="mx-auto">there was an arror</p>
{/await}

<style>
	/* @tailwind components;
	@tailwind utilities; */

	header {
		display: flex;
		background-color: white;
		align-items: center;
		/* justify-content: center; */
		height: 80px;
	}
	/* .header-paper {
		width: 100%;
	}
	.margin-standard {
		margin: 4px;
	}

	.top-app-bar-container {
		max-width: 480px;
		width: 100%;
		height: 320px;
		border: 1px solid var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
		margin: 0 18px 18px 0;
		background-color: var(--mdc-theme-background, #fff);

		overflow: auto;
		display: inline-block;
	}

	@media (max-width: 480px) {
		.top-app-bar-container {
			margin-right: 0;
		}
	}

	.flexy {
		display: flex;
		flex-wrap: wrap;
	}

	.flexor {
		display: inline-flex;
		flex-direction: column;
	}

	.flexor-content {
		flex-basis: 0;
		height: 0;
		flex-grow: 1;
		overflow: auto;
	} */
</style>
