<script>
	import Card, { PrimaryAction } from '@smui/card';

	let question = 'Was ist ihr Familienstand';
	let option1 = 'Verheiratet';
	let option2 = 'Nicht (mehr) verheiratet';
</script>

<div class="flex flex-grow justify-center flex-col">
	<h3>{question}</h3>
	<div class="flex flex-row">
		<Card>
			<PrimaryAction>
				<p class="text-xl">{option1}</p>
			</PrimaryAction>
		</Card>
		<Card>
			<PrimaryAction>
				<p class="text-xl">{option2}</p>
			</PrimaryAction>
		</Card>
	</div>
</div>
