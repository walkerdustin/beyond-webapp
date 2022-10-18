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

	import Paper, { Subtitle, Content } from '@smui/paper';

	import { assets } from '$app/paths';
</script>

<svelte:head>
	<!-- Site Styles -->
	<link rel="stylesheet" href="{assets}/site.css" />
</svelte:head>
<div class="mdc-elevation--z8 ">
	<header class="mdc-elevation--z8 flex flex-row w-full">
		<img src="/images/beyond-logo.png" alt="beyond logo" height="60" class="m-4" />

		<div>
			<h1 class="mb-1">Beyond</h1>
			<p class="mt-1">After Life Management</p>
		</div>
		<!-- just whitespace -->
		<div class="grow" />
		<nav>
			<div class="float-right">
				<Button>
					<a href="/about"><Label>Default</Label></a>
				</Button>
				<div />
			</div>
		</nav>
	</header>
</div>
<p class="mdc-elevation--z8">elevated?</p>

<Paper>
	<Title>elevated Paper</Title>
	<Content>This is elevated</Content>
</Paper>

<!-- <div class="flexy-dad">
	{#each [...Array(24)].map((_v, i) => i + 1) as n}
		<div class="mdc-elevation--z{n} flexy-boy">Elevation: {n}</div>
	{/each}
</div> -->

<main>
	<slot />
</main>

<footer />

<style>
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
	.header-paper {
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
	}
</style>
