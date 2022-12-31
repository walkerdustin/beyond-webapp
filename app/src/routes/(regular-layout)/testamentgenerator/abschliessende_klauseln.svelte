<script lang="ts">
    import Textfield from "@smui/textfield";
    import Button, { Label } from '@smui/button';
    import Checkbox from '@smui/checkbox';
    import FormField from '@smui/form-field';
    import { supabase } from '$lib/supabaseClient';
    import { onMount } from "svelte";

    export let handle_question_answer: (option: 0 | 1) => void;
    let checked = false;
    let checked2 = false;
    let valueA = "";
</script>

<h2 class="mx-auto mb-8">Stellen Sie Ihr testament fertig</h2>

<p class="mb-1 ml-4"><strong>Wo möchten Sie das unterschriebene Original aufbewahren?</strong></p>
<div class="mx-auto mb-6">
  <Textfield bind:value={valueA} label="Aufbewahrungsort"/>
</div>

<div class="ml-2 mb-4">
    <FormField>
      <Checkbox bind:checked />
      <span slot="label">Hiermit bestätige ich, alle Fragen wahrheitsgemäß beantwortet zu haben</span>
    </FormField>
    <FormField>
        <Checkbox bind:checked={checked2} />
        <span slot="label">Ich habe zur Kenntnis genommen, dass das Dokument lediglich als Vorlage dient und im Anschluss abgeschrieben werden muss, da ein Rechtsgültiges Testament handschriftlich und unterschrieben vorliegen muss.</span>
      </FormField>
  </div>


<div class="mx-auto mt-auto mb-4">
    <Button variant="raised" on:click={() => handle_question_answer(1)}>Abschließen</Button>
</div>



<style>
/* @tailwind components;
@tailwind utilities; */
</style>