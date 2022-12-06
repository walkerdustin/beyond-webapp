<script lang="ts">
	import Card, { PrimaryAction } from '@smui/card';
	import type { PageData } from './$types';
	export let data: PageData;

	let question = 'Was ist ihr Familienstand?';
	let option1 = 'Verheiratet';
	let option2 = 'Nicht (mehr) verheiratet';
	let mehr_erfahren =
		'"Hier ist Ihr offizieller Familienstand maßgeblich. Das bedeutet, dass selbst wenn Sie in fester Partnerschaft leben, nur eine Ehe oder eingetragene Lebenspartnerschaft für Ihr Testament entscheidend sind." (ninebarc)';
</script>

<div class="flex flex-grow flex-col h-96">
	<h3 class="text-3xl mx-auto font-bold">{question}</h3>
	<div class="flex flex-row m-8 justify-center gap-5 p-0">
		<div class="mdc-elevation--z8 rounded-md bg-secondary">
			<PrimaryAction on:click={() => console.log('clicked')}>
				<p class="text-xl w-64 m-6">{option1}</p>
			</PrimaryAction>
		</div>

		<div class="mdc-elevation--z8 rounded-md bg-secondary">
			<PrimaryAction on:click={() => console.log('clicked')}>
				<p class="text-xl w-64 m-6">{option2}</p>
			</PrimaryAction>
		</div>
	</div>

	<div class="flex bg-stone-200 mdc-elevation--z4 rounded-md mx-auto p-3" style="width:39.25rem">
		<details>
			<summary> mehr erfahren</summary>
			<p>{mehr_erfahren}</p>
		</details>
	</div>
</div>

<style>
	/* @tailwind components;
	@tailwind utilities; */
</style>
