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
		// const response = fetch(
		// 	'https://sypixpzppxx6inj5rlbmjp422q0uvalf.lambda-url.eu-central-1.on.aws/',
		// 	{
		// 		method: 'POST',

		// 		headers: {
		// 			'Content-Type': 'text/plain',
		// 			'User-Agent': 'PostmanRuntime/7.31.3',
		// 			Accept: '*/*',
		// 			'Accept-Encoding': 'gzip, deflate, br',
		// 			Connection: 'keep-alive',
		// 			Authorization: 'asdfasdfasdf'
		// 		},
		// 		body: '# Testament of me    ## Chapter 1\n    other text'
		// 	}
		// );

		// var myHeaders = new Headers();
		// myHeaders.append('Authorization', 'asdfasdfasdf');
		// myHeaders.append('Accept', '*/*');
		// myHeaders.append('Content-Type', 'text/plain');

		// var raw = '# Testament of me\r\n## Chapter 1\r\nother text';

		// var requestOptions = {
		// 	method: 'POST',
		// 	body: raw,
		// 	headers: myHeaders
		// };

		// fetch(
		// 	'https://sypixpzppxx6inj5rlbmjp422q0uvalf.lambda-url.eu-central-1.on.aws/',
		// 	requestOptions
		// )
		// 	.then((response) => console.log(response))
		// 	.catch((error) => console.log('error', error));

		let data = '# Testament of me\r\n## Chapter 1\r\nother text';

		let config = {
			method: 'post',
			maxBodyLength: Infinity,
			url: 'https://sypixpzppxx6inj5rlbmjp422q0uvalf.lambda-url.eu-central-1.on.aws/',
			headers: {
				Authorization: 'asdfasdfasdf',
				Accept: '*/*',
				'Content-Type': 'text/plain'
			},
			data: data
		};

		axios
			.request(config)
			.then((response) => {
				console.log(JSON.stringify(response.data));
			})
			.catch((error) => {
				console.log(error);
			});
		console.log('ok');

		// console.log(response);
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
