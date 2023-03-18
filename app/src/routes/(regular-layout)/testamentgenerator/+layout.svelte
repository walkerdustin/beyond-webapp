<script lang="ts">
	import LinearProgress from '@smui/linear-progress';
	import IconButton from '@smui/icon-button';
	import { mdiCommentQuestionOutline } from '@mdi/js';
	import { Svg } from '@smui/common/elements';
	import { writable_current_question_state_id } from './testamentgenerator_store';

	let progress = 0.1;

	let generatorSections = [
		'Allgemeine Informationen',
		'Begünstigte',
		'Erbanteile',
		'Vermächtnisse',
		'Testamentvollstreckung',
		'Abschließende Klauseln'
	];
	let numSections = generatorSections.length;
	let activeSection = 0;

	$: {
		// calculate the current section based on the current question id
		let id = parseInt($writable_current_question_state_id);
		if (id < 200) {
			activeSection = 0;
		} else if (id < 300) {
			activeSection = 1;
		} else if (id < 400) {
			activeSection = 2;
		} else if (id < 500) {
			activeSection = 3;
		} else if (id < 900) {
			activeSection = 4;
		} else if (id < 1000) {
			activeSection = 5;
		}
		progress = id / 1000;
	}

	const first_question_id_of_section = [
		'00100',
		'00200',
		'00300',
		'00400',
		'00500',
		'00900',
		'01000'
	];
	// this assumes, that the this question does exist
	function goto_question_id(id: string) {
		writable_current_question_state_id.set(id);
	}
	function goto_section(section: number) {
		goto_question_id(first_question_id_of_section[section]);
	}
</script>

<div
	class="my-12 mx-auto mdc-elevation--z8 flex flex-grow flex-col rounded-md bg-surface"
	style="width: clamp(350px, 90%, 1000px);"
>
	<div class="m-4 text-xs md:text-sm breadcrumbs">
		<ul>
			{#each generatorSections as section, i}
				<li class="my-auto mr-auto {activeSection === i ? 'font-bold' : ''}">
					<button on:click={() => goto_section(i)}><span>{section}</span></button>
				</li>
			{/each}
		</ul>
	</div>
	<LinearProgress {progress} {closed} />
	<div class="flex flex-row">
		<span class="text-sm m-2">{progress * 100}%</span>
		<div class="flex-grow" />

		<IconButton
			component={Svg}
			onclick={() => {
				alert(1);
			}}
			on:click={() => {
				alert(2);
			}}
			viewBox="0 0 24 24"
			width="5px"
			height="5px"
			size="button"
			class="text-primary"
			style="padding:0px 5px 0px 0px ; width: 25px"
			><path fill="currentColor" d={mdiCommentQuestionOutline} />
		</IconButton>
	</div>

	<slot />
</div>

<style>
	/* @tailwind utilities;
	@tailwind components; */
</style>
