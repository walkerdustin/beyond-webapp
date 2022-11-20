<script>
	import LinearProgress from '@smui/linear-progress';

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

<div class="bg-gray-300 flex flex-grow h-96">
	<div class="m-32 mdc-elevation--z8 flex flex-grow flex-col rounded-md bg-white">
		<div class="m-4 flex flex-row">
			{#each generatorSections as section, i}
				<div class="mr-auto {activeSection === i ? 'font-bold' : ''}">{section}</div>
				{#if i < numSections - 1}
					<div class="mr-auto font-extrabold ">></div>
				{/if}
			{/each}
		</div>
		<LinearProgress {progress} {closed} />
		<slot />
	</div>
</div>

<style>
	@tailwind utilities;
	@tailwind components;
</style>
