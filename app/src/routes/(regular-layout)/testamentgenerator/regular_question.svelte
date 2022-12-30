<script lang="ts">
	import Card, { PrimaryAction } from '@smui/card';
	// import type { PageData } from './$types';
	// export let data: PageData;

	export let frage: string;
	export let option0: string;
	export let option1: string;
	export let info: string;

	export let handle_question_answer: (option: 0 | 1) => void;
</script>

<h3 class="text-3xl mx-auto font-bold">{frage}</h3>
<div class="flex flex-row m-8 justify-center gap-5 p-0">
	<div class="mdc-elevation--z8 rounded-md bg-secondary">
		<PrimaryAction on:click={() => handle_question_answer(0)}>
			<p class="text-xl w-64 m-6">{option0}</p>
		</PrimaryAction>
	</div>

	<div class="mdc-elevation--z8 rounded-md bg-secondary">
		<PrimaryAction on:click={() => handle_question_answer(1)}>
			<p class="text-xl w-64 m-6">{option1}</p>
		</PrimaryAction>
	</div>
</div>

<div class="flex bg-stone-200 mdc-elevation--z4 rounded-md mx-auto p-3 mb-4" style="width:39.25rem">
	<details>
		<summary> mehr erfahren</summary>
		<p>{info}</p>
	</details>
</div>

<style>
	/* @tailwind components;
	@tailwind utilities; */
</style>
