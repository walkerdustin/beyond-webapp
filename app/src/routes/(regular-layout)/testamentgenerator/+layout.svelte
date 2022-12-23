<script lang="ts">
	import LinearProgress from '@smui/linear-progress';
	import IconButton from '@smui/icon-button';
	import { mdiCommentQuestionOutline } from '@mdi/js';
	import { Svg} from '@smui/common/elements';
	import { Icon } from '@smui/common';


	let progress = 0.1;

	let generatorSections = [
		'Allgemeine Informationen',
		'Begünstigte',
		'Erbanteile',
		'Vermächtnisse',
		'Testamentverteilung',
		'Abschließende Klauseln'
	];
	let numSections = generatorSections.length;
	let activeSection = 0;
</script>

<div class="flex flex-grow">
	<div class="m-10 mdc-elevation--z8 flex flex-grow flex-col rounded-md bg-surface">
		<div class="m-4 flex flex-row">
			{#each generatorSections as section, i}
				<div class="mr-auto {activeSection === i ? 'font-bold' : ''}">{section}</div>
				{#if i < numSections - 1}
					<div class="mr-auto font-extrabold ">></div>
				{/if}
			{/each}
		</div>
		<LinearProgress {progress} {closed} />
		<div class="flex flex-row">
			<span class="text-sm m-2">{progress * 100}%</span>
			<div class="flex-grow" />
			<button class="mx-2">
				<Icon component={Svg} viewBox="0 0 24 24" width="18px" height="18px">
					<path fill="currentColor" d={mdiCommentQuestionOutline} />
				</Icon>
			</button>
			<!-- <IconButton component={Svg} viewBox="0 0 24 24" width="24" height="24"
				><path fill="currentColor" d={mdiCommentQuestionOutline} />
			</IconButton> -->
		</div>

		<slot />
	</div>
</div>

<style>
	@tailwind utilities;
	@tailwind components;
</style>
