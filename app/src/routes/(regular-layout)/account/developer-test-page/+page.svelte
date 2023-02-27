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
