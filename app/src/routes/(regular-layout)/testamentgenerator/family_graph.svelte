<script lang="ts">
	export const prerendered = false;
	// import { mdiPlus, mdiClose, mdiGraveStone } from '@mdi/js';
	// import { Svg } from '@smui/common/elements';
	// import { Icon } from '@smui/common';
	import { onMount } from 'svelte';
	// import { draw_line_between_elements, Node, lines } from './family_graph_node.js';
	// import type { line } from './family_graph_node.js';

	// import { writableNodes } from './family_graph_store.js';
	import '$lib/balkan/familytree.js';

	// let nodes: Node[] = [];

	// // import '$lib/vendor/leader-line.min.js';
	// let kind: HTMLElement;
	// let erblasser: HTMLElement;
	// let svg_canvas: SVGSVGElement;

	// let n = new Node('Erblasser', true, 'Erblasser', '', []);
	// let n2 = new Node('Kind', true, 'Sohn', '1', []);

	onMount(async () => {
		// draw_line_between_elements(erblasser, kind);
		// nodes.push(n);
		// nodes = nodes;
		// console.log(nodes);
		// console.log(nodes.filter((n) => n.level === 0));
		console.log('lets goo, pleasee');

		var family = new FamilyTree(document.getElementById('family-tree-canvas'), {
			mouseScrool: FamilyTree.none,
			mode: 'dark',
			template: 'hugo',
			roots: [3],
			nodeMenu: {
				edit: { text: 'Edit' },
				details: { text: 'Details' }
			},
			nodeTreeMenu: true,
			nodeBinding: {
				field_0: 'name',
				field_1: 'born',
				img_0: 'photo'
			},
			editForm: {
				titleBinding: 'name',
				photoBinding: 'photo',
				addMoreBtn: 'Add element',
				addMore: 'Add more elements',
				addMoreFieldName: 'Element name',
				generateElementsFromFields: false,
				elements: [
					{ type: 'textbox', label: 'Full Name', binding: 'name' },
					{ type: 'textbox', label: 'Email Address', binding: 'email' },
					[
						{ type: 'textbox', label: 'Phone', binding: 'phone' },
						{ type: 'date', label: 'Date Of Birth', binding: 'born' }
					],
					[
						{
							type: 'select',
							options: [
								{ value: 'bg', text: 'Bulgaria' },
								{ value: 'ru', text: 'Russia' },
								{ value: 'gr', text: 'Greece' }
							],
							label: 'Country',
							binding: 'country'
						},
						{ type: 'textbox', label: 'City', binding: 'city' }
					],
					{ type: 'textbox', label: 'Photo Url', binding: 'photo', btn: 'Upload' }
				]
			}
		});

		family.on('field', function (sender, args) {
			if (args.name == 'born') {
				var date = new Date(args.value);
				args.value = date.toLocaleDateString();
			}
		});

		family.load([
			{
				id: 1,
				pids: [3],
				gender: 'male',
				photo: 'https://cdn.balkan.app/shared/m60/2.jpg',
				name: 'Zeph Daniels',
				born: '1954-09-29'
			},
			{
				id: 2,
				pids: [3],
				gender: 'male',
				photo: 'https://cdn.balkan.app/shared/m60/1.jpg',
				name: 'Rowan Annable',
				born: '1952-10-10'
			},
			{
				id: 3,
				pids: [1, 2],
				gender: 'female',
				photo: 'https://cdn.balkan.app/shared/w60/1.jpg',
				name: 'Laura Shepherd',
				born: '1943-01-13',
				email: 'laura.shepherd@gmail.com',
				phone: '+44 845 5752 547',
				city: 'Moscow',
				country: 'ru'
			},
			{ id: 4, pids: [5], photo: 'https://cdn.balkan.app/shared/m60/3.jpg', name: 'Rowan Annable' },
			{
				id: 5,
				pids: [4],
				gender: 'female',
				photo: 'https://cdn.balkan.app/shared/w60/3.jpg',
				name: 'Lois Sowle'
			},
			{
				id: 6,
				mid: 2,
				fid: 3,
				pids: [7],
				gender: 'female',
				photo: 'https://cdn.balkan.app/shared/w30/1.jpg',
				name: 'Tyler Heath',
				born: '1975-11-12'
			},
			{
				id: 7,
				pids: [6],
				mid: 5,
				fid: 4,
				gender: 'male',
				photo: 'https://cdn.balkan.app/shared/m30/3.jpg',
				name: 'Samson Stokes',
				born: '1986-10-01'
			},
			{
				id: 8,
				mid: 7,
				fid: 6,
				gender: 'female',
				photo: 'https://cdn.balkan.app/shared/w10/3.jpg',
				name: 'Celeste Castillo',
				born: '2021-02-01'
			}
		]);
	});

	let div_for_family_tree: HTMLDivElement;
</script>

<div id="family-tree-canvas" bind:this={div_for_family_tree} />

<style>
	@tailwind components;
	@tailwind utilities;

	.baum-container {
		@apply h-32 flex items-center justify-center gap-4;
	}
</style>
