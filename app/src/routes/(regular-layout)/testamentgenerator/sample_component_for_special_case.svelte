<script lang="ts">
    	import Textfield from "@smui/textfield";
  import Select, { Option } from '@smui/select';
  import HelperText from '@smui/textfield/helper-text';
  import Button, { Label } from '@smui/button';
  import { createAnimationTriggerAction } from 'svelte-trigger-action';
	import { Hr } from "@smui/common/elements";
	import { supabase } from '$lib/supabaseClient';
  import { onMount } from "svelte";

  export let handle_question_answer: (option: 0 | 1) => void;

</script>



<div class="mx-auto mt-auto mb-4">
    <Button variant="raised" on:click={() => handle_question_answer(1)}>Fertig</Button>
  </div>

  

<style>
    /* @tailwind components;
    @tailwind utilities; */
</style>