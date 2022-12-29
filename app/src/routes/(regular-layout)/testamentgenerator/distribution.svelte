<script lang="ts">
    import Textfield from "@smui/textfield";
import Select, { Option } from '@smui/select';
import HelperText from '@smui/textfield/helper-text';
import Button, { Label } from '@smui/button';
import { createAnimationTriggerAction } from 'svelte-trigger-action';
import { Hr } from "@smui/common/elements";
import { supabase } from '$lib/supabaseClient';
import { onMount } from "svelte";

import DistributionBlock from "./distribution_block.svelte";

export let handle_question_answer: (option: 0 | 1) => void;
    let current_percentage = 50;
    let title = "Verfügbare Quote";
    let gesetzliche_erbfolge: number|null = 50;
    let pflichtanteil: number|null = 25.5;
</script>

<h2 class="mx-auto mb-6">Bestimmen Sie die Erbverteilung</h2>

<DistributionBlock {current_percentage} {title} {pflichtanteil} {gesetzliche_erbfolge}/>
<div class="mx-auto mt-auto mb-4">
<Button variant="raised" on:click={() => handle_question_answer(1)}>Fertig</Button>
</div>



<style>
@tailwind components;
@tailwind utilities;
</style>