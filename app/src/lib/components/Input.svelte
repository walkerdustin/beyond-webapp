<script>
	export let placeholder = '';
	export let value = '';
	export let disabled = false;
	export let showPlaceholder = true;
	export let type = 'text';
	export let largeLabel = false;
	export let textArea = false;

	let placeholderStyle = '';
	if (!showPlaceholder) {
		placeholderStyle = '0px auto';
	} else if (showPlaceholder && largeLabel) {
		placeholderStyle = '18px auto';
	} else {
		placeholderStyle = '15px auto';
	}
</script>

<div style="grid-template-rows: {placeholderStyle};" class={`${$$props.class}`}>
	{#if showPlaceholder}
		<span class={`title ${largeLabel ? 'largeLabel' : ''}`}>{placeholder}</span>
	{/if}
	<label>
		{#if textArea}
			<textarea {disabled} bind:value on:change on:input />
		{:else if type == 'password'}
			<input {disabled} bind:value type="password" on:change on:input />
		{:else if type == 'number'}
			<input {disabled} bind:value type="number" on:change on:input />
		{:else}
			<input {disabled} bind:value type="text" on:change on:input />
		{/if}
	</label>
</div>

<style>
	@tailwind components;
	@tailwind utilities;
	div {
		@apply grid;
		@apply border;
		@apply p-2;
		@apply rounded;
	}
	.title {
		font-size: 10px;
		opacity: 0.5;
		padding-left: 5px;
		justify-self: left;
		@apply -mb-10;
	}
	.largeLabel {
		font-size: 14px;
		opacity: 0.7;
		transform: translateY(-2px);
		color: var(--text-color-strong);
	}
	label {
		display: inline-block;
		position: relative;
		box-sizing: border-box;
		@apply text-base;
	}

	input,
	textarea {
		display: block;
		box-sizing: border-box;
		width: 100%;
		background-color: transparent;
		border-radius: 0;
		border: none;
		font-family: inherit;
		font-size: 1em;
		padding: 0 0 0 6px;
		border-bottom: 2px solid var(--text-color-light);
		transition: border-color 0.35s ease-out;
	}
	textarea {
		height: 100%;
	}

	textarea:focus,
	input:focus {
		border-bottom: 2px solid var(--primary-color);
		outline: none;
	}
</style>
