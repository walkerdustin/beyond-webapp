<script lang="ts">
	// here is some typescript
	// import '@material/elevation/mdc-elevation';
	// import Paper, { Title, Content } from '@smui/paper';

	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	//import Drawer, { Content, Scrim, AppContent } from '@smui/drawer';

	// for the icons
	import { Icon } from '@smui/common';
	import { Svg } from '@smui/common/elements';

	import Paper, { Subtitle, Content } from '@smui/paper';

	import { assets } from '$app/paths';
</script>

<svelte:head>
	<!-- Site Styles -->
	<link rel="stylesheet" href="{assets}/site.css" />
</svelte:head>

<header class="mdc-elevation--z8">
	<img src="/images/beyond-logo.png" alt="beyond logo" height="70" />
	<!-- <Paper class="header-paper">
		<img src="/images/beyond-logo.png" alt="beyond logo" height="70" />
		<Title>beyond</Title>

		some links
	</Paper> -->
	<!-- <TopAppBar>
		<Row>
			<Section>
				<img src="/images/beyond-logo.png" alt="beyond logo" height="55" />
				<Title>beyond</Title>
			</Section>
			<Section>some links</Section>
		</Row>
	</TopAppBar> -->
</header>

<Paper>
	<Title>Unelevated Paper</Title>
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

<style lang="scss">
	header {
		display: flex;
		background-color: $secondary;
		align-items: center;
		// justify-content: center;
	}
	.header-paper {
		width: 100%;
	}
</style>
