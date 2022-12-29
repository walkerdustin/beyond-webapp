<script lang="ts">
    import LinearProgress from "@smui/linear-progress";
    import Slider from '@smui/slider';
    import FormField from '@smui/form-field';
    import Textfield from '@smui/textfield';


    export let current_percentage: number;
    export let title: string;
    export let gesetzliche_erbfolge: number|null;
    export let pflichtanteil: number|null;

    
</script>
<!--  a block, with the title, a textfield to display the current percentage 
and a linear progress bar for visual -->
<div class="min-h-16 border-2 border-gray-50 rounded-md bg-surface grid grid-cols-3 mdc-elevation--z4 m-4 px-4 max-w-3xl">
    <p class="my-auto">{title}</p>
    <div class="my-auto">
        <!-- <input bind:value={current_percentage} type="text" placeholder="Type here" class="input input-bordered input-primary w-xs" /> -->
        <Textfield
        height="16px"
        style="width: 5rem; height: 2rem"
        variant="outlined"
        bind:value={current_percentage}
        suffix="%"
        input$pattern="\d+"
    />
        <!-- <span class="border-2 p-2 border-gray rounded-md">{current_percentage} %</span> -->
    </div>
    <div class="my-auto">
        {#if gesetzliche_erbfolge}
            <div class="flex flex-col border-l border-black" style="margin-left: {gesetzliche_erbfolge}%;">
                <span class="text-xs font-bold">&nbsp; {gesetzliche_erbfolge} %</span>
            </div>
        {/if}

        <input bind:value={current_percentage} type="range" min="0" max="100" class="range range-primary range-xs" />
        {#if pflichtanteil}
        <div class="flex flex-col border-l border-black" style="margin-left: {pflichtanteil}%;">
            <span class="text-xs font-bold">&nbsp; {pflichtanteil} %</span>
        </div>
    {/if}
    
    </div>
</div>


<style>
    @tailwind components;
    @tailwind utilities;
</style>