<script lang="ts">
	import FloatInput from '$lib/components/float_input.svelte';
	import LinearProgress from '@smui/linear-progress';
	import Textfield from '@smui/textfield';

	import { family_members } from './testamentgenerator_store';
	export let id: number;
	export let current_percentage: number;
	export let title: string;
	export let gesetzliche_erbfolge: number | undefined = undefined;
	export let pflichtanteil: number | undefined = undefined;
	export let header_block: boolean = false;
	export let round_to_precision = 3;
	export let verfügbare_quote = 100;

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
	$: console.log(title, ': ', current_percentage);

	// this section is for limiting how far I can slide the slider, so that the sum of all percentages is at most 100
	// aka, the verfügbare_quote is never negative
	// the tricky bit is that all distribution blocks are all active at the same time, so I need to figure out

	function handle_slider_change() {
		if (verfügbare_quote <= 0) {
			current_percentage = current_percentage + verfügbare_quote;
		}
	}
</script>

<!--  a block, with the title, a textfield to display the current percentage 
and a linear progress bar for visual -->

<div
	class="{header_block
		? 'h-20'
		: 'min-h-16'}  border-2 border-gray-50 rounded-md bg-white grid grid-cols-[1fr_auto_1fr] mdc-elevation--z4 px-2 md:px-4 max-w-3xl w-full"
>
	<p class="my-auto  {header_block ? 'font-bold' : ''}">{title}</p>
	<div class="my-auto py-auto flex mx-1 md:mx-2">
		<!-- <input bind:value={current_percentage} type="text" placeholder="Type here" class="input input-bordered input-primary w-xs" /> -->
		{#if header_block}
			<span class="font-bold">{current_percentage} %</span>
		{:else}
			<!-- <Textfield height="16px" style="width: 6rem; height: 2rem" /> -->
			<FloatInput
				bind:value={current_percentage}
				suffix="%"
				classname="my-auto"
				round_to_precicion={round_to_precision}
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
		{#if header_block}
			<LinearProgress
				progress={current_percentage / 100}
				indeterminate={false}
				disabled={header_block}
			/>
		{:else}
			<input
				disabled={header_block}
				bind:value={current_percentage}
				type="range"
				min="0"
				max="100"
				class="range range-primary range-xs text-sm"
				style="font-size: 12px;"
				on:change={(e) => {
					handle_slider_change();
				}}
			/>
		{/if}

		{#if pflichtanteil}
			<div
				class="flex flex-col border-l {current_percentage < pflichtanteil
					? 'border-red-600'
					: 'border-black'}"
				style="margin-left: {pflichtanteil}%;"
			>
				<span class="text-xs font-bold {current_percentage < pflichtanteil ? 'text-red-600' : ''}"
					>&nbsp; {pflichtanteil} %</span
				>
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
