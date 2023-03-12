<script lang="ts">
	import Card, { PrimaryAction } from '@smui/card';
	import Ripple from '@smui/ripple';

	// import type { PageData } from './$types';
	// export let data: PageData;

	export let frage: string;
	export let option0: string;
	export let option1: string;
	export let info: string;

	export let handle_question_answer: (option: 0 | 1) => void;
</script>

<h2 class="mx-auto px-2 text-center">{frage}</h2>
<div class="flex flex-col md:flex-row m-8 justify-center gap-5 p-0">
	<div
		class="mdc-elevation--z8 rounded-md bg-blue-100 h-32 flex flex-row "
		use:Ripple={{ surface: true, color: 'primary' }}
	>
		<button class="overflow-y-auto" on:click={() => handle_question_answer(0)}>
			<p class="w-64 m-4  text-center self-center ">{option0}</p>
		</button>
	</div>

	<div
		class="mdc-elevation--z8 rounded-md bg-blue-100 h-32 flex flex-row "
		use:Ripple={{ surface: true, color: 'primary' }}
	>
		<button class="overflow-y-auto" on:click={() => handle_question_answer(1)}>
			<p class="w-64 m-4 text-center">{option1}</p>
		</button>
	</div>
</div>
<div class="w-full px-4">
	<div class="bg-stone-200 mdc-elevation--z4 rounded-md p-3 mb-4 w-full">
		<details>
			<summary> mehr erfahren</summary>
			<p>{info}</p>
		</details>
	</div>
</div>

<style>
	/* @tailwind components;
	@tailwind utilities; */
</style>
