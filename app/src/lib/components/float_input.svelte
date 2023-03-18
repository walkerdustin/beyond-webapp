<script lang="ts">
	// @ts-nocheck
	import Textfield from '@smui/textfield';
	export let value = 0;
	let string_value = '0';
	export let height = '16px';
	export let suffix = '%';
	export let style = '';
	export let round_to_precicion = 3;
	export let classname = '';

	// ############ SORRY,
	// the way I handle , and . is not very good

	// the regex pattern "\d+"
	function update_value() {
		// we need to make a copy of the string, because replace does not return a copy,
		// but mutates the string
		// because js is a a stupid language, we need to make a copy like this
		// var string_copy = (' ' + original_string).slice(1);
		// see https://stackoverflow.com/questions/31712808/how-to-force-javascript-to-deep-copy-a-string
		let value_temp = parseFloat((' ' + string_value).slice(1).replace(',', '.'));
		value = Math.round(value_temp * 10 ** round_to_precicion) / 10 ** round_to_precicion; // why is rounding in js so stupid?
		string_value = value.toString().replace('.', ',');
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

<input
	type="text"
	class="input input-bordered border border-primary border-solid w-20 px-4 input-sm sm:input-md flex-nowrap float-left {classname}"
	{height}
	{style}
	variant="outlined"
	bind:value={string_value}
	{suffix}
	pattern="[0-9]+([\.,][0-9]+)?"
	on:keypress={(e) => eval_keypress(e)}
	on:focusout={(e) => {
		string_value = e.target.value ? e.target.value.replace('.', ',') : '0';
		update_value();
	}}
/>

<span>{suffix}</span>

<!-- <Textfield
	{height}
	{style}
	class="bg-primary text-sm"
	variant="outlined"
	bind:value={string_value}
	{suffix}
	pattern="[0-9]+([\.,][0-9]+)?"
	on:keypress={(e) => eval_keypress(e)}
	on:focusout={(e) => {
		string_value = e.target.value ? e.target.value.replace('.', ',') : '0';
		update_value();
	}}
/> -->
<style>
	span {
		position: relative;
		left: -15px;
		width: 1px;
		margin-top: auto;
		margin-bottom: auto;
	}

	@tailwind components;
	@tailwind utilities;
</style>
