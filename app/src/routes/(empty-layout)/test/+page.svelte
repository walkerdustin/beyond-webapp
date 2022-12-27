<script lang="ts">
    import Select, { Option } from '@smui/select';
   
    let fruits = ['Apple', 'Orange', 'Banana', 'Mango'];
   
    let value:String = 'Orange';
  </script>

<div class="columns margins" style="justify-content: flex-start;">
    <div>
        <Select bind:value={value}>

            <Option value={'Orange'}>{'Orange'}</Option>
            <Option value={'Apple'}>{'Apple'}</Option>

        </Select>
     
        <pre class="status">Selected: {value}</pre>
      </div>
  </div>
  
<style>

</style>
   
