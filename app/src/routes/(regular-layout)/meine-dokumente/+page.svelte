<script>
	import ListElement from './list-element.svelte';
	let documents = [
		'Testament',
		'Patientenverfügung',
		'Bestattungsvorsorge',
		'Vorsorgevollmacht',
		'Organspendeausweis'
	];
</script>

<div class="flex">
	<h1 class="mx-auto m-3">Meine Dokumente</h1>
</div>

<div class="flex flex-row gap-8 ml-10">
	<div class="flex flex-col gap-4">
		{#each documents as item}
			<ListElement title={item} progress={1} />
		{/each}
	</div>
	<div class="border-cyan-900 border-2 border-solid">
		<p>test</p>
	</div>
</div>

<style>
	@tailwind components;
	@tailwind utilities;
</style>
