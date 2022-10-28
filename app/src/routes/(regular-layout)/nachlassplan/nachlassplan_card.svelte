<script lang="ts">
	import CircularProgress from '@smui/circular-progress';
	export let title: string;
	export let description: string;
	export let progress: number;
</script>

<div class="mdc-elevation--z8 m-3 w-64 bg-white rounded-lg p-3">
	<div class="flex flex-row">
		<CircularProgress style="height: 30px; width: 30px;" class="my-colored-circle" {progress} />
		<p class="my-auto ml-2"><b>{Math.round(progress * 100)} %</b></p>
	</div>
	<h2 class="mb-2">{title}</h2>
	<p>{description}</p>
</div>

<style>
</style>
