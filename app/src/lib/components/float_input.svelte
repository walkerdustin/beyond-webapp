<script lang="ts">
	// @ts-nocheck
	import Textfield from '@smui/textfield';
	export let value = 0;
	let string_value = '0';
	export let height = '16px';
	export let suffix = '%';
	export let style = '';

	// ############ SORRY,
	// the way I handle , and . is not very good

	// the regex pattern "\d+"
	function update_value() {
		// we need to make a copy of the string, because replace does not return a copy,
		// but mutates the string
		// because js is a a stupid language, we need to make a copy like this
		// var string_copy = (' ' + original_string).slice(1);
		// see https://stackoverflow.com/questions/31712808/how-to-force-javascript-to-deep-copy-a-string
		value = parseFloat((' ' + string_value).slice(1).replace(',', '.'));
	}

	$: string_value = value.toString().replace('.', ',');

	function eval_keypress(event: KeyboardEvent) {
		console.log(event);
		let key = event.key;
		// if the key is enter, update the value
		if (key === 'Enter') {
			update_value();
		}
		// if the key is not a number or a decimal point, prevent the default action
		if (key !== '.' && key !== ',' && isNaN(parseInt(key))) {
			event.preventDefault();
		}
	}
	let pattern = '[0-9]+([.,][0-9]+)?';
</script>

<Textfield
	{height}
	{style}
	variant="outlined"
	bind:value={string_value}
	{suffix}
	pattern="[0-9]+([\.,][0-9]+)?"
	input$onclick={(e) => alert(1)}
	on:keypress={(e) => eval_keypress(e)}
	on:focusout={(e) => {
		string_value = e.target.value ? e.target.value.replace('.', ',') : '0';
		update_value();
	}}
/>
