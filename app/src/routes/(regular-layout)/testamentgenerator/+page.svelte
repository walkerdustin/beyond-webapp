<script>
	import Card, { PrimaryAction } from '@smui/card';

	let question = 'Was ist ihr Familienstand?';
	let option1 = 'Verheiratet';
	let option2 = 'Nicht (mehr) verheiratet';
</script>

<div class="flex flex-grow justify-center flex-col">
	<h3 class="text-3xl mx-auto font-bold">{question}</h3>
	<div class="flex flex-row m-8 justify-center gap-5 p-0">
		<div class="mdc-elevation--z8 rounded-md bg-secondary">
			<PrimaryAction on:click={() => console.log("clicked")}>
				<p class="text-xl w-64 m-6">{option1}</p>
			</PrimaryAction>
		</div>

		<div class="mdc-elevation--z8 rounded-md bg-secondary">
			<PrimaryAction on:click={() => console.log("clicked")}>
				<p class="text-xl w-64 m-6">{option2}</p>
			</PrimaryAction>
		</div>
			
		<!-- <Card>
			<PrimaryAction>
				<p class="text-xl w-16 max-w-md p-6">{option2}</p>
			</PrimaryAction>
		</Card> -->
	</div>
</div>


<style>
	@tailwind components;
	@tailwind utilities;
</style>