<script lang="ts">
	import LinearProgress from '@smui/linear-progress';
	import Textfield from '@smui/textfield';

	import { family_members } from './testamentgenerator_store';
	export let id: number;
	export let current_percentage: number;
	export let title: string;
	export let gesetzliche_erbfolge: number | undefined = undefined;
	export let pflichtanteil: number | undefined = undefined;
	export let disabled: boolean = false;

	$: {
		family_members.update((family_members) => {
			return family_members.map((member) => {
				if (member.id === id) {
					return {
						...member,
						current_percentage: current_percentage
					};
				} else {
					return member;
				}
			});
		});
	}
</script>

<!--  a block, with the title, a textfield to display the current percentage 
and a linear progress bar for visual -->
<div
	class="{disabled
		? 'h-20'
		: 'min-h-16'}  border-2 border-gray-50 rounded-md bg-surface grid grid-cols-3 mdc-elevation--z4  m-4 px-4 max-w-3xl"
>
	<p class="my-auto  {disabled ? 'font-bold' : ''}">{title}</p>
	<div class="my-auto">
		<!-- <input bind:value={current_percentage} type="text" placeholder="Type here" class="input input-bordered input-primary w-xs" /> -->
		{#if disabled}
			<span class="font-bold">{current_percentage} %</span>
		{:else}
			<Textfield
				height="16px"
				style="width: 6rem; height: 2rem"
				variant="outlined"
				bind:value={current_percentage}
				suffix="%"
				input$pattern="\d+"
			/>
		{/if}

		<!-- <span class="border-2 p-2 border-gray rounded-md">{current_percentage} %</span> -->
	</div>
	<div class="my-auto">
		{#if gesetzliche_erbfolge}
			<div
				class="flex flex-col border-l border-black"
				style="margin-left: {gesetzliche_erbfolge}%;"
			>
				<span class="text-xs font-bold">&nbsp; {gesetzliche_erbfolge} %</span>
			</div>
		{/if}
		{#if disabled}
			<LinearProgress
				progress={current_percentage / 100}
				buffer={current_percentage}
				indeterminate={false}
				{disabled}
			/>
		{:else}
			<input
				{disabled}
				bind:value={current_percentage}
				type="range"
				min="0"
				max="100"
				class="range range-primary range-xs"
			/>
		{/if}

		{#if pflichtanteil}
			<div class="flex flex-col border-l border-black" style="margin-left: {pflichtanteil}%;">
				<span class="text-xs font-bold">&nbsp; {pflichtanteil} %</span>
			</div>
		{/if}
	</div>
</div>

<style>
	:global(.mdc-text-field__affix--suffix) {
		padding-left: 4px;
	}
	:global(.mdc-text-field) {
		padding: 0px 8px;
	}
	/* @tailwind components;
    @tailwind utilities; */
</style>
