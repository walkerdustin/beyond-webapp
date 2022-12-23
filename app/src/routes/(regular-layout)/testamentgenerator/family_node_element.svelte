<script lang="ts">
    import { redraw_lines} from './family_graph_node'
    import { mdiPlus, mdiClose, mdiGraveStone } from '@mdi/js';
	import { Svg } from '@smui/common/elements';
	import { Icon } from '@smui/common';
    export let id: number;
    export let first_name: String;
    export let last_name: String;
    import { onMount } from 'svelte';

    onMount(async () => {
        redraw_lines();
	});
</script>

<div    
        data-id={id}
		style="z-index: 20;"
		class="z-20 text-gray-700 rounded-full bg-white w-24 h-24 flex items-center justify-center flex-col"
><p>{first_name} {last_name}</p>
    <div>
        <button
            class="rounded-full border-2 border-primary border-solid"
            ><Icon component={Svg} viewBox="0 0 24 24" width="18px" height="18px">
                <path fill="currentColor" d={mdiPlus} />
            </Icon>
        </button>
        <button class="rounded-full border-2 border-primary border-solid"
            ><Icon component={Svg} viewBox="0 0 24 24" width="18px" height="18px">
                <path fill="currentColor" d={mdiClose} />
            </Icon>
        </button>
        <button class="rounded-full border-2 border-primary border-solid"
            ><Icon component={Svg} viewBox="0 0 24 24" width="18px" height="18px">
                <path fill="currentColor" d={mdiGraveStone} />
            </Icon>
        </button>
    </div>
</div>