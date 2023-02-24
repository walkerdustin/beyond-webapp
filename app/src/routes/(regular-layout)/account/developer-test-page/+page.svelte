<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	async function create_pdf() {
		console.log('calling edge funtion');
		const { data, error } = await supabase.functions.invoke('create-pdf', {
			body: { name: 'mein name' }
		});
		console.log(data);
	}
	import Button from '@smui/button';

	import axios from 'axios';

	async function test_pdf() {
		const response = fetch(
			'https://sypixpzppxx6inj5rlbmjp422q0uvalf.lambda-url.eu-central-1.on.aws/',
			{
				method: 'POST',

				headers: {
					'Content-Type': 'text/plain',
					Authorization: 'asdfasdfasdf',
					Accept: '*/*'
				},
				body: '# Testament of me    ## Chapter 1\n    other text'
			}
		);
		// const response = await axios.post(
		// 	'https://sypixpzppxx6inj5rlbmjp422q0uvalf.lambda-url.eu-central-1.on.aws/',
		// 	'# Testament of me    ## Chapter 1\n    other text',
		// 	{
		// 		headers: {
		// 			'Content-Type': 'text/plain',
		// 			Accept: '*/*'
		// 		}
		// 	}
		// );
		console.log('ok');

		console.log(response);
	}
	// import MenuSurface from '@smui/menu-surface';
	import Textfield from '@smui/textfield';

	let surface: MenuSurface;
	let name = '';
	let email = '';
</script>

<h1 class="m-3">Secret Page for testing edge functions</h1>

<div class="flex items-center m-3">
	<span class="mr-2">create-pdf</span>
	<Button on:click={create_pdf} variant="outlined">invoke create-pdf</Button>
</div>
<div class="flex items-center m-3">
	<span class="mr-2">test_pdf</span>
	<Button on:click={test_pdf} variant="outlined">invoke test-pdf</Button>
</div>

<!-- <div style="min-width: 100px;">
	<Button on:click={() => surface.setOpen(true)}>Open Menu Surface</Button>
	<MenuSurface bind:this={surface} anchorCorner="BOTTOM_LEFT" managed={true}>
		<div style="margin: 1em; display: flex; flex-direction: column; align-items: flex-end;">
			<Textfield bind:value={name} label="Name" />
			<Textfield bind:value={email} label="Email" type="email" />
			<Button style="margin-top: 1em;" on:click={() => surface.setOpen(false)}>Submit</Button>
		</div>
	</MenuSurface>
</div> -->

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<div class="dropdown">
			<label tabindex="0" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				>
			</label>
			<ul
				tabindex="0"
				class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li><a>Item 1</a></li>
				<li tabindex="0">
					<a class="justify-between">
						Parent
						<svg
							class="fill-current"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg
						>
					</a>
					<ul class="p-2">
						<li><a>Submenu 1</a></li>
						<li><a>Submenu 2</a></li>
					</ul>
				</li>
				<li><a>Item 3</a></li>
			</ul>
		</div>
		<a class="btn btn-ghost normal-case text-xl">daisyUI</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			<li><a>Item 1</a></li>
			<li tabindex="0">
				<a>
					Parent
					<svg
						class="fill-current"
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg
					>
				</a>
				<ul class="p-2">
					<li><a>Submenu 1</a></li>
					<li><a>Submenu 2</a></li>
				</ul>
			</li>
			<li><a>Item 3</a></li>
		</ul>
	</div>
	<div class="navbar-end">
		<a class="btn">Get started</a>
	</div>
</div>
