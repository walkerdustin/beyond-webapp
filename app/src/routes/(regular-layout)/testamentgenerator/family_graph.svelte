<script lang="ts">
	export const prerendered = false;
	import { mdiPlus, mdiClose, mdiGraveStone } from '@mdi/js';
	import { Svg } from '@smui/common/elements';
	import { Icon } from '@smui/common';
	import { onMount } from 'svelte';
	import { draw_line_between_elements, Node, lines } from './family_graph_node.js';
	import type { line } from './family_graph_node.js';

	import { writableNodes } from './family_graph_store.js';

	let nodes: Node[] = [];

	// import '$lib/vendor/leader-line.min.js';
	let kind: HTMLElement;
	let erblasser: HTMLElement;
	let svg_canvas: SVGSVGElement;

	let n = new Node(0, 'Erblasser', true, 'Erblasser', '', []);
	let n2 = new Node(1, 'Kind', true, 'Sohn', '1', []);
	let ref: HTMLDivElement | null;
	onMount(async () => {
		// draw_line_between_elements(erblasser, kind);
		nodes.push(n);
		nodes = nodes;
		console.log(nodes);
		console.log(nodes.filter((n) => n.level === 0));
	});
</script>

<div id="family-tree-canvas">
	<svg
		width="100%"
		height="100%"
		bind:this={svg_canvas}
		style="position: fixed; left: 0; top: 0; z-index: 10;"
	>
		<!-- <line x1="50" y1="50" x2="200" y2="900.005664" stroke="black" /> -->
		{#each lines as line}
			{console.log('rendering line', line)}
			<line bind:this={line.l} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} stroke="black" />
		{/each}
	</svg>
	<h2>Familien Baum aufbauen</h2>
</div>
<div class="baum-container bg-primary-hue-400" />
<div class="baum-container bg-primary-hue-600" />
<div class="baum-container bg-primary-hue-800">
	{#each nodes.filter((x) => x.level == 0) as node}
		<div
			bind:this={ref}
			class="z-20 relative font-bold text-gray-900 rounded-full bg-white w-24 h-24 flex items-center justify-center"
		>
			<div>
				<button
					class="rounded-full border-2 border-primary border-solid"
					on:click={() => {
						nodes.push(n2);
						console.log('loll');
						console.log(nodes);
						console.log(nodes.filter((n) => n.level === 0));
						nodes = nodes;
					}}
					><Icon component={Svg} viewBox="0 0 24 24" width="18px" height="18px">
						<path fill="currentColor" d={mdiPlus} />
					</Icon>
				</button>
			</div>
			moin!!! {node.first_name}
			{node.last_name}
		</div>
		<!-- 
		<div
			bind:this={node.html_element}
			class="z-20 relative font-bold text-gray-900 rounded-full bg-white w-24 h-24 flex items-center justify-center flex-col"
		>
			<p>
				{node.first_name}
				{node.last_name}
			</p>

			<div>
				<button
					class="rounded-full border-2 border-primary border-solid"
					on:click={() => {
						nodes.push(n2);
						console.log('loll');
						console.log(nodes);
						console.log(nodes.filter((n) => n.level === 0));
						nodes = nodes;
					}}
					><Icon component={Svg} viewBox="0 0 24 24" width="18px" height="18px">
						<path fill="currentColor" d={mdiPlus} />
					</Icon>
				</button>
			</div>
		</div> -->
	{/each}
	<!-- <div
		bind:this={erblasser}
		class="z-20 relative font-bold text-gray-900 rounded-full bg-white w-24 h-24 flex items-center justify-center"
	>
		Erblasser
	</div> -->
</div>
<div class="baum-container bg-primary-hue-600">
	<div
		style="z-index: 20;"
		class="z-20 font-bold text-gray-700 rounded-full bg-gray-400 w-24 h-24 flex items-center justify-center flex-col"
	>
		<p>Kind</p>
		<div>
			<button
				class="rounded-full border-2 border-primary border-solid"
				on:click={() => {
					nodes.push(n);
					console.log('loll');
					nodes = nodes;
				}}
				><Icon component={Svg} viewBox="0 0 24 24" width="18px" height="18px">
					<path fill="currentColor" d={mdiPlus} />
				</Icon>
			</button>
			<button class="rounded-full border-2 border-primary border-solid"
				><Icon component={Svg} viewBox="0 0 24 24" width="18px" height="18px">
					<path fill="currentColor" d={mdiClose} />
				</Icon>
			</button>
			<button class="rounded-full border-2 border-primary border-solid"
				><Icon component={Svg} viewBox="0 0 24 24" width="18px" height="18px">
					<path fill="currentColor" d={mdiGraveStone} />
				</Icon>
			</button>
		</div>
	</div>
</div>
<div class="baum-container bg-primary-hue-400 " />

<!-- 





	
 -->
<style>
	@tailwind components;
	@tailwind utilities;

	.baum-container {
		@apply h-32 flex items-center justify-center gap-4;
	}
</style>
