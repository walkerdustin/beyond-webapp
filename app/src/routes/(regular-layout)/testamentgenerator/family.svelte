<script lang="ts">
	import Textfield from '@smui/textfield';
	import Button, { Label } from '@smui/button';
	import IconButton from '@smui/icon-button';
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import { Svg } from '@smui/common/elements';
	import { Icon } from '@smui/common';
	import { mdiPencil, mdiDelete } from '@mdi/js';

	const tailwind_default_sm_breackpoint = 640;
	import { createAnimationTriggerAction } from 'svelte-trigger-action';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { user_s } from '$lib/global-store';

	import { verhältnis_list } from './testamentgenerator_store';
	export let handle_question_answer: (option: 0 | 1) => void;

	const { triggerAnimation, animationAction } = createAnimationTriggerAction();
	let animation_name = 'shake';

	let selected_value: string;
	let first_name = '';
	let last_name = '';
	let family_members: family_member[] = [];

	type family_member = {
		id: number;
		first_name: string;
		last_name: string;
		verhältnis: string;
	};

	let fn_is_empty = true;
	let ln_is_empty = true;
	let v_is_empty = true;
	const auswählen = 'auswählen';
	async function add_family_member() {
		// make sure all fields are filled
		if (
			first_name == '' ||
			last_name == '' ||
			selected_value == '' ||
			selected_value == auswählen
		) {
			console.log('not all fields are filled');
			console.log(first_name, last_name, selected_value);
			fn_is_empty = !first_name;
			ln_is_empty = !last_name;
			v_is_empty = !selected_value || selected_value == auswählen;
			console.log(fn_is_empty, ln_is_empty, v_is_empty);
			triggerAnimation();
			return;
		}
		let new_family_member = {
			id: 0,
			first_name: first_name,
			last_name: last_name,
			verhältnis: selected_value
		};
		// the id of 0 gets later replaced with the id from the database
		family_members = [...family_members, new_family_member];

		console.log(family_members);
		family_members = [...family_members];
		//create the insert data object
		let insert_obj = {
			first_name: first_name,
			last_name: last_name,
			selected_value: selected_value
		};
		// reset the data
		first_name = '';
		last_name = '';
		selected_value = auswählen;
		const { data, error } = await supabase
			.from('family_members')
			.insert({
				family_of_user: user_s?.id,
				first_name: insert_obj.first_name,
				last_name: insert_obj.last_name,
				relation: insert_obj.selected_value
			})
			.select('id');
		if (data) {
			new_family_member.id = data[0].id;
			family_members = [...family_members];
		}
	}

	onMount(async () => {
		const user_id = user_s?.id;
		// get all family members from database
		const { data, error } = await supabase
			.from('family_members')
			.select('*')
			.eq('family_of_user', user_id);
		console.log(data);
		// fill family_members with data
		data?.forEach((member) => {
			family_members = [
				...family_members,
				{
					id: member.id,
					first_name: member.first_name,
					last_name: member.last_name,
					verhältnis: member.relation
				}
			];
		});
	});

	let dialog_delete_is_open = false;
	let dialog_delete_choice: boolean | undefined = undefined;
	let name_of_person_to_delete: string | undefined = '';
	async function delete_family_member(id: number) {
		console.log(id);
		name_of_person_to_delete = undefined; // reset the name of the person to delete, just in case
		name_of_person_to_delete = family_members?.find((member) => member.id == id)?.first_name;
		if (!name_of_person_to_delete) {
			console.log('could not find name of person to delete');
			return;
		}

		// make sure that the user really wants to delete the family member, by showing a smui dialog
		dialog_delete_choice = undefined;
		dialog_delete_is_open = true;
		while (dialog_delete_is_open == true) {
			await new Promise((resolve) => setTimeout(resolve, 10));
		}
		console.log('dialog_choice', dialog_delete_choice);
		if (dialog_delete_choice == false || dialog_delete_choice == undefined) {
			return;
		}

		// deltet the vermächtnis of the family member
		console.log('deleting corresponding vermächtnisse _ version 2');
		// const { data, error } = await supabase.from("vermachtnisse").delete().filter("to_family_member", "eq", id)
		const { data, error } = await supabase
			.from('vermachtnisse')
			.delete()
			.eq('to_family_member', id);
		console.log('data and error of vermächtnisse delete call');
		console.log(data, error);
		family_members = family_members.filter((member) => member.id != id);
		const { data: data_1, error: error_1 } = await supabase
			.from('family_members')
			.delete()
			.eq('id', id);
		console.log('data and error of delete call');
		console.log(data_1, error_1);
	}

	let dialog_modify_is_open = false;
	let dialog_modify_choice: boolean | undefined = undefined;
	let person_to_modify: family_member | undefined = undefined;
	let firstname_to_modify: string = '';
	let lastname_to_modify: string = '';
	let modify_selected_value: string = auswählen;
	async function show_modify_dialog(id: number) {
		console.log(id);
		person_to_modify = undefined; // reset the person to modify, just in case
		firstname_to_modify = '';
		lastname_to_modify = '';
		person_to_modify = family_members?.find((member) => member.id == id);
		if (!person_to_modify) {
			console.log('could not find name of person to modify');
			return;
		}
		firstname_to_modify = person_to_modify.first_name;
		lastname_to_modify = person_to_modify.last_name;
		modify_selected_value = person_to_modify.verhältnis;
		// show a dialog to modify the family member
		dialog_modify_choice = undefined;
		dialog_modify_is_open = true;
		while (dialog_modify_is_open == true) {
			await new Promise((resolve) => setTimeout(resolve, 10));
		}

		// if the user did not click on "ok", do not modify the family member
		console.log('dialog_choice', dialog_modify_choice);
		if (dialog_modify_choice == false || dialog_modify_choice == undefined) {
			return;
		}
		// if firstname or lastname is empty, do not modify the family member
		// and give an allert to the user
		if (firstname_to_modify == '' || lastname_to_modify == '') {
			alert('Bitte geben Sie einen Vornamen und einen Nachnamen ein');
			return;
		}
		person_to_modify.first_name = firstname_to_modify;
		person_to_modify.last_name = lastname_to_modify;
		person_to_modify.verhältnis = modify_selected_value;
		family_members = [...family_members];

		// update the family member in the database
		const { data, error } = await supabase
			.from('family_members')
			.update({
				first_name: firstname_to_modify,
				last_name: lastname_to_modify,
				relation: modify_selected_value
			})
			.eq('id', id);

		console.log('data and error of update');

		console.log(data);
		console.log(error);
	}
	// log if the windoow width changes
	window.addEventListener('resize', () => {
		width = window.innerWidth;
	});
	let width = 600;
</script>

<h2 class="mx-auto mb-4">Tragen Sie Ihre Famillie ein</h2>

<div
	class="grid  grid-cols-[1fr_1fr_auto]  sm:grid-cols-[1fr_1fr_8rem_auto] gap-x-1 px-2 mb-4 w-full "
>
	{#each family_members as member}
		<p class="my-auto col-start-1 col-end-2  sm:col-auto">
			{width >= tailwind_default_sm_breackpoint
				? member.first_name
				: [member.first_name, ', ', member.last_name].join('')}
		</p>
		<p class="my-auto col-start-1 col-end-2  sm:col-auto hidden sm:block">{member.last_name}</p>
		<p class="my-auto col-start-2 col-end-3  sm:col-auto">{member.verhältnis}</p>
		<p class="col-start-3 col-end-4  sm:col-auto self-center">
			<!--  icon buton for modify and delete -->
			<!-- we leave out the modify, as I dont know how to implement that yet -->
			<!-- <Button>
        <Icon component={Svg} viewBox="0 0 24 24" width="20px" height="20px">
          <path fill="currentColor" d={mdiPencil} />
        </Icon>
      </Button> -->
			<IconButton
				on:click={() => show_modify_dialog(member.id)}
				size="button"
				class="text-primary"
				style="padding:0px; width: 25px"
			>
				<Icon component={Svg} viewBox="0 0 21 21" width="20px" height="20px">
					<path fill="currentColor" d={mdiPencil} />
				</Icon>
			</IconButton>
			<IconButton
				on:click={() => delete_family_member(member.id)}
				size="button"
				class="text-primary"
				style="padding:0px; width: 25px"
			>
				<Icon component={Svg} viewBox="0 0 21 21" width="20px" height="20px">
					<path fill="currentColor" d={mdiDelete} />
				</Icon>
			</IconButton>
		</p>
	{/each}
	<div
		use:animationAction={fn_is_empty ? animation_name : ''}
		class="col-start-1 col-end-2  sm:col-auto"
	>
		<Textfield class="wiggle animated" required bind:value={first_name} label="Vorname" />
	</div>
	<div
		use:animationAction={ln_is_empty ? animation_name : ''}
		class="col-start-2 col-end-3 sm:col-auto"
	>
		<Textfield required bind:value={last_name} label="Nachname" />
	</div>

	<select
		use:animationAction={v_is_empty ? animation_name : ''}
		required
		bind:value={selected_value}
		class="select select-sm my-auto col-start-1 col-end-2  sm:col-auto"
	>
		<option disabled selected>{auswählen}</option>
		{#each verhältnis_list as verältnis}
			<option value={verältnis}>{verältnis}</option>
		{/each}
	</select>

	<div class="my-auto">
		<span class="block sm:hidden md:block">
			<Button on:click={() => add_family_member()}>hinzufügen</Button>
		</span>
		<span class="hidden sm:block md:hidden">
			<Button on:click={() => add_family_member()}><span class="text-xl font-bold">+</span></Button>
		</span>
	</div>
</div>

<div class="mx-auto mt-auto mb-4">
	<Button variant="raised" on:click={() => handle_question_answer(1)}>Weiter</Button>
</div>

<Dialog
	bind:open={dialog_delete_is_open}
	aria-labelledby="simple-title"
	aria-describedby="simple-content"
>
	<!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
	<Title id="simple-title">Wollen Sie wirklich {name_of_person_to_delete} entfernen?</Title>
	<Content id="simple-content"
		>Alle erstellten Vermächtnisse für diesen Erben werden auch gelöscht.</Content
	>
	<Actions>
		<Button on:click={() => (dialog_delete_choice = false)}>
			<Label>Nein</Label>
		</Button>
		<Button on:click={() => (dialog_delete_choice = true)}>
			<Label>Ja</Label>
		</Button>
	</Actions>
</Dialog>

<Dialog
	bind:open={dialog_modify_is_open}
	aria-labelledby="simple-title"
	aria-describedby="simple-content"
>
	<!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
	<Title id="simple-title">Bearbeiten:</Title>
	<Content id="simple-content">
		<div class="flex flex-col gap-1">
			<div use:animationAction={fn_is_empty ? animation_name : ''}>
				<Textfield
					class="wiggle animated"
					required
					bind:value={firstname_to_modify}
					label="Vorname"
				/>
			</div>
			<div use:animationAction={ln_is_empty ? animation_name : ''}>
				<Textfield required bind:value={lastname_to_modify} label="Nachname" />
			</div>
			<select
				use:animationAction={v_is_empty ? animation_name : ''}
				required
				bind:value={modify_selected_value}
				class="select select-sm my-auto mt-2"
			>
				{#each verhältnis_list as verältnis}
					<option value={verältnis}>{verältnis}</option>
				{/each}
			</select>
		</div>
	</Content>
	<Actions>
		<Button on:click={() => (dialog_modify_choice = true)}><Label>ändern</Label></Button>
		<Button on:click={() => (dialog_modify_choice = false)}>
			<Label>Abbrechen</Label>
		</Button>
	</Actions>
</Dialog>

<style>
	/* @tailwind components;
	@tailwind utilities; */
	:global(.shake) {
		animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
		transform: translate3d(0, 0, 0);
		backface-visibility: hidden;
		perspective: 1000px;
	}
	@keyframes shake {
		10%,
		90% {
			transform: translate3d(-1px, 0, 0);
		}
		20%,
		80% {
			transform: translate3d(2px, 0, 0);
		}
		30%,
		50%,
		70% {
			transform: translate3d(-4px, 0, 0);
		}
		40%,
		60% {
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
