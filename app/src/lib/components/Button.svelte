<script>
	export let size = 'normal';
	export let fullwidth = false;
	export let gradient = false;
</script>

<button
	class={`${$$props.class}`}
	class:tiny={size == 'tiny'}
	class:small={size == 'small'}
	class:normal={size == 'normal'}
	class:large={size == 'large'}
	class:fullwidth
	class:gradient
	on:click
>
	<slot />
</button>

<style>
	/* @tailwind components;
	@tailwind utilities; */

	button {
		color: var(--text-color-strong);
		border-color: var(--text-color-light);
		background-color: var(--surface-background-color);
		@apply m-0;
		@apply border;
		@apply rounded;
		@apply inline-flex;
		@apply justify-center;
		@apply relative;
		@apply cursor-pointer;
		@apply items-center;
		@apply transition-all duration-200;
	}
	button:hover {
		color: var(--background-color);
		border-color: var(--text-color-strong);
		background-color: var(--text-color-strong);
	}

	button:active {
		transition-timing-function: cubic-bezier(0, 0, 0, 1);
		transform: scale(0.9);
	}

	.tiny {
		padding: 0.29rem 0.625rem;
		font-size: 0.6rem;
		line-height: 1rem;
	}
	.small {
		padding: 0.375rem 0.625rem;
		font-size: 0.75rem;
		line-height: 1rem;
	}
	.normal {
		padding: 0.425rem 0.667rem;
		font-size: 1rem;
		line-height: 1rem;
	}
	.large {
		padding: 0.85rem 1rem;
		font-size: 1.75rem;
		line-height: 1rem;
	}

	.fullwidth {
		width: 100%;
	}

	.gradient {
		outline: none;
		border: none;
		background: linear-gradient(
			to left,
			var(--primary-color),
			var(--accent-color),
			var(--secondary-color)
		);
	}
	.gradient:hover {
		color: var(--text-color-strong);
	}
	.gradient::after {
		content: '';
		position: absolute;
		z-index: -1;
		bottom: -10px;
		left: 5%;
		height: 110%;
		width: 90%;
		opacity: 0.15;
		border-radius: 50px;
		background: inherit;
		filter: blur(16px);
		transition: all 0.2s;
	}
	.gradient:hover::after {
		filter: blur(16px);
		width: 100%;
		opacity: 0.85;
		bottom: -5px;
		left: 0;
	}
	.gradient:hover:active::after {
		filter: blur(10px);
	}
</style>
