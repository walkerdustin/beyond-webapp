<script lang="ts">
	export const prerendered = false;
	import { mdiPlus, mdiClose, mdiGraveStone } from '@mdi/js';
	import { Svg } from '@smui/common/elements';
	import { Icon } from '@smui/common';
	import { onMount } from 'svelte';
	import { draw_line_between_elements, Node, lines, get_unused_id, nodes, redraw_lines} from './family_graph_node.js';
	import type { line } from './family_graph_node.js';
	import FamilyNodeElement from './family_node_element.svelte';
	import { get } from "svelte/store";

	nodes.subscribe((nodes) => {console.log('reactive nodes: ' + nodes)});
	$: console.log('reactive lines: ' + lines);

	// import '$lib/vendor/leader-line.min.js';
	let svg_canvas: SVGSVGElement;

	let n = new Node(0, 'Erblasser', true, 'Erblasser', '', []);
	// let n2 = new Node(get_unused_id(get(nodes)), 'Kind', true, 'Sohn', '1', [0]);
	// let n3 = new Node(get_unused_id(get(nodes)), 'Geschwister', true, 'bruder', '1',[0]);
	// let n4 = new Node(get_unused_id(get(nodes)), 'Elternteil', true, 'dad', '1',[0, n3.id]);

	let ref: HTMLDivElement | null;
	onMount(async () => {
		// draw_line_between_elements(erblasser, kind);
		// add_node(n)
		console.log(nodes);
		console.log($nodes.filter((n) => n.level === 0));
	});
	let offsetWidth=0;
	// let offsetHeight=0;
	// let clientHeight=0;
	// let clientWidth=0;
	let scroll_y=0;
	let scroll_x=0;
	// $: console.log('offsetWidth: ' + offsetWidth);
	// $: console.log('offsetHeight: ' + offsetHeight);
	// $: console.log('clientHeight: ' + clientHeight);
	// $: console.log('clientWidth: ' + clientWidth);
	// $: console.log('y: ' + scroll_y);
	// $: console.log('x: ' + scroll_x);
	function on_position_change_update_lines(offsetWidth:number, scroll_y:number, scroll_x:number){
		redraw_lines();
	}
	$: on_position_change_update_lines(offsetWidth, scroll_y, scroll_x);

</script>

<svelte:window bind:scrollY={scroll_y} bind:scrollX={scroll_x}/>


<!-- bind:offsetHeight={offsetHeight} bind:clientHeight={clientHeight} bind:clientWidth={clientWidth} -->
<div id="family-tree-canvas" bind:offsetWidth={offsetWidth} >
	<svg
		width="100%"
		height="100%"
		bind:this={svg_canvas}
		style="position: fixed; left: 0; top: 0; z-index: 10;"
	>
		<!-- <line x1="50" y1="50" x2="200" y2="900.005664" stroke="black" /> -->
		{#each $lines as line}
			{console.log('rendering line ', line)}
			<line bind:this={line.l} x1={line.x0} y1={line.y0} x2={line.x1} y2={line.y1} stroke="black" />
		{/each}
	</svg>
	<h2>Familien Baum aufbauen</h2>
</div>
<div class="baum-container bg-primary-hue-400">
	{#each $nodes.filter((x) => x.level == -2) as node}
	<FamilyNodeElement id={node.id} first_name={node.first_name} last_name={node.last_name}/>
	{/each}
</div>
<div class="baum-container bg-primary-hue-600">
	{#each $nodes.filter((x) => x.level == -1) as node}
	<FamilyNodeElement id={node.id} first_name={node.first_name} last_name={node.last_name}/>
	{/each}
</div>
<div class="baum-container bg-primary-hue-800">
	{#each $nodes.filter((x) => x.level == 0) as node}
	<FamilyNodeElement id={node.id} first_name={node.first_name} last_name={node.last_name}/>
	{/each}
</div>
<div class="baum-container bg-primary-hue-600">
	{#each $nodes.filter((x) => x.level == 1) as node}
	<FamilyNodeElement id={node.id} first_name={node.first_name} last_name={node.last_name}/>
	{/each}
	<div
		style="z-index: 20;"
		class="z-20 font-bold text-gray-700 rounded-full bg-gray-400 w-24 h-24 flex items-center justify-center flex-col"
	>
		<p>Kind</p>
		<div>
			<button
				class="rounded-full border-2 border-primary border-solid"
				on:click={() => {
					new Node(get_unused_id(get(nodes)), 'Geschwister', true, 'bruder', '1',[0]);
					console.log("add node n3 ");
				}}
				><Icon component={Svg} viewBox="0 0 24 24" width="18px" height="18px">
					<path fill="currentColor" d={mdiPlus} />
				</Icon>
			</button>
			<button class="rounded-full border-2 border-primary border-solid"
				on:click={() => {
					new Node(get_unused_id(get(nodes)), 'Elternteil', true, 'dad', '1',[0]);
					console.log("add node n3");
				}}
				><Icon component={Svg} viewBox="0 0 24 24" width="18px" height="18px">
					<path fill="currentColor" d={mdiClose} />
				</Icon>
			</button>
			<button class="rounded-full border-2 border-primary border-solid"
			on:click={() => {
				new Node(get_unused_id(get(nodes)), 'Kind', true, 'Sohn', '1', [0]);
				console.log("add node n3  ");
			}}
				><Icon component={Svg} viewBox="0 0 24 24" width="18px" height="18px">
					<path fill="currentColor" d={mdiGraveStone} />
				</Icon>
			</button>
		</div>
	</div>
</div>
<div class="baum-container bg-primary-hue-400 ">
	{#each $nodes.filter((x) => x.level == 2) as node}
	<FamilyNodeElement id={node.id} first_name={node.first_name} last_name={node.last_name}/>
{/each}
</div>

<!-- 





	
 -->
<style>
	@tailwind components;
	@tailwind utilities;

	.baum-container {
		@apply h-32 flex items-center justify-center gap-4;
	}
</style>
