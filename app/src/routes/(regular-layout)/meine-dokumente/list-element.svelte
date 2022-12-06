<script lang="ts">
	import { mdiCheckCircle } from '@mdi/js';
	import { Icon } from '@smui/common';
	import { Svg } from '@smui/common/elements';

	export let title: string;
	export let progress: number;
</script>

<div class="w-64 h-10 mdc-elevation--z4 flex flex-row rounded-md bg-surface">
	<div class="w-4 my-auto m-6">
		<Icon component={Svg} viewBox="0 0 24 24" width="20px" height="20px">
			<path fill="darkblue" d={mdiCheckCircle} />
		</Icon>
	</div>

	<p class="my-auto">{title}</p>
</div>

<style>
	/* @tailwind components;
	@tailwind utilities; */
</style>
