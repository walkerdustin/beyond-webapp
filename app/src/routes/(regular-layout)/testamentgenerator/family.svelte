<script lang="ts">
	import Textfield from "@smui/textfield";
  import Button, { Label } from '@smui/button';
  import { createAnimationTriggerAction } from 'svelte-trigger-action';
	import { supabase } from '$lib/supabaseClient';
  import { onMount } from "svelte";
	import { user_s } from '$lib/global-store';

  import { mdiPencil, mdiDelete } from '@mdi/js';
  import { Svg } from '@smui/common/elements';
  import { Icon } from '@smui/common';
  import { verhältnis_list } from "./testamentgenerator_store";
  export let handle_question_answer: (option: 0 | 1) => void;

  const { triggerAnimation, animationAction } = createAnimationTriggerAction();
  let animation_name = 'shake';

  let selected_value:string;
  let first_name = '';
  let last_name = '';
  let family_members:family_member[] = [];

  type family_member = {
      id: number,
      first_name: string,
      last_name: string,
      verhältnis: string
  }

  let fn_is_empty = true;
  let ln_is_empty = true;
  let v_is_empty = true;
  const auswählen = 'auswählen';
  async function add_family_member(){
    // make sure all fields are filled
    if (first_name == '' || last_name == '' || selected_value == '' || selected_value == auswählen){
      console.log('not all fields are filled')
      console.log(first_name, last_name, selected_value)
      fn_is_empty = !first_name;
      ln_is_empty = !last_name;
      v_is_empty = !selected_value || selected_value == auswählen;
      console.log(fn_is_empty, ln_is_empty, v_is_empty)
      triggerAnimation()
      return
    }
    let new_family_member = {id: 0, first_name: first_name, last_name: last_name, verhältnis: selected_value}
    // the id of 0 gets later replaced with the id from the database
    family_members = [...family_members, new_family_member]

    console.log(family_members)
    family_members = [...family_members]
    //create the insert data object
    let insert_obj = {
      first_name: first_name,
      last_name: last_name,
      selected_value: selected_value
    }
        // reset the data
        first_name = '';
    last_name = '';
    selected_value = auswählen;    
    const { data, error } = await supabase.from("family_members").insert({family_of_user: user_s?.id, first_name: insert_obj.first_name, last_name: insert_obj.last_name, relation: insert_obj.selected_value}).select("id");
    if (data){
      new_family_member.id = data[0].id
      family_members = [...family_members]
    }
  }

  onMount(async () => {
    const user_id = user_s?.id
    // get all family members from database
    const { data, error } = await supabase.from("family_members").select("*").eq('family_of_user', user_id);
    console.log(data);
    // fill family_members with data
    data?.forEach((member) => {
      family_members = [...family_members, {id: member.id, first_name: member.first_name, last_name: member.last_name, verhältnis: member.relation}];
    })
  })
  async function delete_family_member(id:number){
    console.log(id);
    family_members = family_members.filter((member) => member.id != id);
    await supabase.from("family_members").delete().eq('id', id);
  }
</script>

<h2 class="mx-auto mb-4">Tragen Sie Ihre Famillie ein</h2>

<div class="grid grid-cols-4 gap-2 mb-4 ml-4">
  {#each family_members as member}
    <p>{member.first_name}</p> <p>{member.last_name}</p> <p>{member.verhältnis}</p> 
    <p>
      <!--  icon buton for modify and delete -->
      <!-- we leave out the modify, as I dont know how to implement that yet -->
      <!-- <Button>
        <Icon component={Svg} viewBox="0 0 24 24" width="20px" height="20px">
          <path fill="currentColor" d={mdiPencil} />
        </Icon>
      </Button> -->

      <Button on:click={()=>delete_family_member(member.id)}>
        <Icon component={Svg} viewBox="0 0 24 24" width="20px" height="20px">
          <path fill="currentColor" d={mdiDelete} />
        </Icon>
      </Button>
      <span>{member.id}</span>
    </p>
    
  {/each}
    <div use:animationAction={fn_is_empty?animation_name:''}>
    <Textfield  class="wiggle animated" required bind:value={first_name} label="Vorname">
    </Textfield></div>
    <div use:animationAction={ln_is_empty?animation_name:''}>
    <Textfield  required bind:value={last_name} label="Nachname">
    </Textfield></div>

  <select  use:animationAction={v_is_empty?animation_name:''} required bind:value={selected_value} class="select select-sm my-auto">
    <option disabled selected>{auswählen}</option>
      {#each verhältnis_list as verältnis}
        <option value={verältnis}>{verältnis}</option>
      {/each}
  </select>

  <div class="my-auto mt-">
    <Button on:click={() => add_family_member()}>hinzufügen</Button>
  </div>
</div>


<div class="mx-auto mt-auto mb-4">
  <Button variant="raised" on:click={() => handle_question_answer(1)}>Weiter</Button>
</div>

<style>
    :global(.shake) {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}
@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
    /* @tailwind components;
    @tailwind utilities; */
/* .wiggle { 
  -webkit-animation-name: wiggle;
  animation-name: wiggle; 
  -webkit-animation-timing-function: ease-in;
  animation-timing-function: ease-in; 
}

.animated.wiggle { 
  -webkit-animation-duration: 0.75s; 
  animation-duration: 0.75s;
}
@keyframes wiggle { 
  0% { transform: skewX(9deg); } 
  10% { transform: skewX(-8deg); } 
  20% { transform: skewX(7deg); } 
  30% { transform: skewX(-6deg); } 
  40% { transform: skewX(5deg); } 
  50% { transform: skewX(-4deg); } 
  60% { transform: skewX(3deg); } 
  70% { transform: skewX(-2deg); } 
  80% { transform: skewX(1deg); } 
  90% { transform: skewX(0deg); } 
  100% { transform: skewX(0deg); } 
}
@keyframes scale-wiggle {
		0% {
			transform: scale(1);
		}
		20% {
			transform: scale(1.2);
		}
		40% {
			transform: scale(0.9);
		}
		60% {
			transform: scale(1.15);
		}
		80% {
			transform: scale(0.95);
		}
		90% {
			transform: scale(1.02);
		}
		95% {
			transform: scale(0.98);
		}
		100% {
			transform: scale(1);
		}
	} */

</style>
