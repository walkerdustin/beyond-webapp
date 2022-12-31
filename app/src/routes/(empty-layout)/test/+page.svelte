<script lang="ts">
    import Select, { Option } from '@smui/select';
    import Slider from '@smui/slider';
    import FormField from '@smui/form-field';


    let fruits = ['Apple', 'Orange', 'Banana', 'Mango'];
   
    let current_percentage = 45;
  </script>
<div class="m-24">
  <FormField align="end" style="display: flex;">
    <Slider class="my-smui-slider border-2 border-black flex flex-row" style="flex-grow: 1;" bind:value={current_percentage} />
  </FormField>

<p>default slider</p>

<input type="range" step="1" min="0" max="100"  aria-valuetext="85">
<p>daisyui</p>
<input bind:value={current_percentage} type="range" min="0" max="100" class="range range-primary" />
</div>

<p> the value is {current_percentage}</p>

  
<style>
/* @tailwind components;
@tailwind utilities; */
:global(.my-smui-slider input){
  margin-top: auto;
  margin-bottom: auto;
  flex-grow: 1;
  writing-mode: horizontal-tb !important;
  text-rendering: auto;
  color: fieldtext;
  letter-spacing: normal;
  word-spacing: normal;
  line-height: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  appearance: auto;
  -webkit-rtl-ordering: logical;
  cursor: text;
  background-color: field;
  margin: 0em;
  padding: 1px 2px;
  border-width: 2px;
  border-style: inset;
  border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
  border-image: initial;
}
</style>
   
