<script lang="ts">
	// here is some typescript
	// import '@material/elevation/mdc-elevation';
	// import Paper, { Title, Content } from '@smui/paper';

	// for the icons
	import { Icon } from '@smui/common';
	import { Svg } from '@smui/common/elements';
	import Button, { Label } from '@smui/button';
	import IconButton from '@smui/icon-button';
	import Ripple from '@smui/ripple';

	import { mdiAccount, mdiMenu } from '@mdi/js';

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
			await goto('/login');
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

			<div class="flex-col justify-center hidden md:flex">
				<h1 class="mb-1 font-extrabold">beyond</h1>
				<p class="">After Life Management</p>
			</div>
			<!-- just whitespace -->
			<div class="grow" />
			<nav>
				<div class="float-right mr-2 flex flex-row">
					<div class="float-right mr-2  flex-row hidden md:flex">
						<div
							class="flex p-2 rounded items-center text-primary font-medium"
							use:Ripple={{ surface: true, color: 'primary' }}
						>
							<a href="/testamentgenerator">Testament</a>
						</div>

						<div
							class="flex p-2 rounded items-center text-primary font-medium"
							use:Ripple={{ surface: true, color: 'primary' }}
						>
							<a href="/nachlassplan">Nachlassplan</a>
						</div>
						<div
							class="flex p-2 rounded items-center text-primary font-medium"
							use:Ripple={{ surface: true, color: 'primary' }}
						>
							<a href="/beratung" draggable="false">Individuelle Beratung</a>
						</div>
					</div>
					<div class="dropdown">
						<button tabindex="0" class="btn btn-ghost md:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/></svg
							>
						</button>
						<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
						<ul
							tabindex="0"
							class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 -translate-x-28"
						>
							<li><a href="/testamentgenerator">Testament</a></li>
							<li><a href="/nachlassplan">Nachlassplan</a></li>
							<li><a href="/beratung">Individuelle Beratung</a></li>
						</ul>
					</div>

					<IconButton>
						<a href="/account" draggable="false">
							<Icon component={Svg} viewBox="0 0 24 24">
								<path fill="currentColor" d={mdiAccount} />
							</Icon>
						</a>
					</IconButton>

					<!-- <div>
						<IconButton on:click={() => menu.setOpen(true)}>
							<Icon component={Svg} viewBox="0 0 24 24">
								<path fill="currentColor" d={mdiMenu} />
							</Icon>
						</IconButton>

						<MenuSurface bind:this={menu} anchorCorner="BOTTOM_LEFT">
							<List>
								<div
									class="flex p-2 rounded items-center text-primary font-medium"
									use:Ripple={{ surface: true, color: 'primary' }}
								>
									<a href="/testamentgenerator">Testament</a>
								</div>

								<div
									class="flex p-2 rounded items-center text-primary font-medium"
									use:Ripple={{ surface: true, color: 'primary' }}
								>
									<a href="/nachlassplan">Nachlassplan</a>
								</div>
							</List>
						</MenuSurface> 
					</div>-->
				</div>
			</nav>
		</header>

		<main>
			<slot><!-- optional fallback --></slot>
		</main>

		<footer class="mt-auto mdc-elevation--z8 py-3 bg-surface">
			<div class="grid md:grid-cols-3 text-center gap-2">
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
