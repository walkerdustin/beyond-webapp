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

	import { assets } from '$app/paths';

	import { mdiAccount } from '@mdi/js';
</script>

<svelte:head>
	<!-- Site Styles -->
	<link rel="stylesheet" href="{assets}/site.css" />
</svelte:head>

<svelte:body />
<div class="mdc-elevation--z8 ">
	<header class="mdc-elevation--z8 flex flex-row w-full">
		<a href="/" draggable="false"
			><img
				src="/images/beyond-logo.png"
				alt="beyond logo"
				height="60"
				class="m-4"
				draggable="false"
			/>
		</a>

		<div>
			<h1 class="mb-1">Beyond</h1>
			<p class="mt-1">After Life Management</p>
		</div>
		<!-- just whitespace -->
		<div class="grow" />
		<nav>
			<div class="float-right mr-2">
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
					<a href="/home" draggable="false">
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
</div>

<!-- <div class="flexy-dad">
	{#each [...Array(24)].map((_v, i) => i + 1) as n}
		<div class="mdc-elevation--z{n} flexy-boy">Elevation: {n}</div>
	{/each}
</div> -->

<main>
	<slot />
</main>

<footer class="mt-auto mdc-elevation--z8 py-3">
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
			<div>infoqservice-beyond.de</div>
		</div>
		<div class="justify-self-center">
			<div>Copyright 2022 beyond</div>
			<div>Powered by beyond</div>
		</div>
	</div>
</footer>

<style lang="postcss">
	/* @tailwind base;*/
	@tailwind components;
	@tailwind utilities;

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
