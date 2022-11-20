<script>
    let generatorSections = ["Allgemeine Informationen", "Begünstigte", "Erbanteile", "Vermächtnisse", "Testamentverteilung", "Abschließende Klauseln"];
    let numSections = generatorSections.length;
</script>

<div class="bg-gray-300 flex flex-grow h-96">
    <div class="border-black border-solid m-32 mdc-elevation--z8 flex flex-grow  flex-col rounded-md bg-white">
        <div class="m-4">
            {#each generatorSections as section,i}
                 <span class="ml-auto">section</span> 
                 {#if i<numSections-1}
                    <span class="ml-auto">></span> 
                 {/if}
            {/each}
        </div>
        <slot/>
    </div>
</div>

<style>
    @tailwind utilities;
    @tailwind components;
</style>




