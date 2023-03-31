<script lang="ts">
	import Button, { Label } from '@smui/button';

	export let handle_question_answer: (option: 0 | 1) => void;
</script>

<h2 class="mx-4 mb-2">Diese Option ist bei Beyond aktuell noch nicht verfügbar.</h2>

<div class="mx-4  mb-4">
	<p class="max-w-2xl">
		Da es sich hier um eine sehr komplexe Form der Erbfolge handelt, steht diese Option aktuell in
		unserem automatisierten Testamentgenerator leider noch nicht zur Verfügung. Wir empfehlen Ihnen
		einen Notar, oder einen Anwalt für Erbrecht aufzusuchen. Wir helfen Ihnen dabei, geeignete
		Ansprechpartner in Ihrer Nähe zu finden.
	</p>
</div>

<div class="mb-4 max-w-md">
	<Button>
		<a href="/">Machen Sie jetzt einen Termin bei einem Erbrechtsexperten in Ihrer Nähe</a>
	</Button>
</div>

<style>
	/* @tailwind components;
	@tailwind utilities; */
</style>
