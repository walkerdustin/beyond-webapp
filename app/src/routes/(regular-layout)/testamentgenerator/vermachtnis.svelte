<script lang="ts">
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	import Button, { Label } from '@smui/button';
	import Checkbox from '@smui/checkbox';
	import FormField from '@smui/form-field';

	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	import { family_members } from './testamentgenerator_store';

	import { Svg } from '@smui/common/elements';
	import { Icon } from '@smui/common';
	import { mdiArrowDownBold } from '@mdi/js';
	import { user_s } from '$lib/global-store';

	export let handle_question_answer: (option: 0 | 1) => void;

	let open = false;
	let clicked = 'Nothing yet.';
	const auswählen = 'auswählen';

	let temp_vermachtnis = 'Schmuck';
	let temp_vermachtnisnehmer: number;
	let temp_geschätzer_wert: number | null = 2500;
	let temp_als_teil_des_erbes = false;
	let checked = false;

	let list_of_vermachtnisse: vermachtnis[] = [];
	type vermachtnis = {
		id?: number;
		vermachtnis: string;
		vermachtnisnehmer: number;
		geschätzer_wert: number | null;
		als_teil_des_erbes: boolean;
	};

	async function vermachtnis_hinzufugen() {
		// TODO: should the vermächntis item be unique?
		open = false;
		let new_vermachtnis: vermachtnis = {
			id: 0,
			vermachtnis: temp_vermachtnis,
			vermachtnisnehmer: temp_vermachtnisnehmer,
			geschätzer_wert: temp_geschätzer_wert,
			als_teil_des_erbes: temp_als_teil_des_erbes
		};
		// reset the data
		temp_vermachtnis = '';
		temp_vermachtnisnehmer = 0;
		temp_geschätzer_wert = null;
		temp_als_teil_des_erbes = false;
		list_of_vermachtnisse = [...list_of_vermachtnisse, new_vermachtnis];
		const { data, error } = await supabase
			.from('vermachtnisse')
			.insert([
				{
					vermachtnis_of_user: user_s?.id,
					to_family_member: new_vermachtnis.vermachtnisnehmer,
					vermachtnis_item: new_vermachtnis.vermachtnis,
					estimated_value: new_vermachtnis.geschätzer_wert
				}
			])
			.select('id');

		if (data) {
			new_vermachtnis.id = data[0].id;
			list_of_vermachtnisse = list_of_vermachtnisse;
		}
	}
	onMount(async () => {
		console.log('####### Calling on Mount #######');
		const { data, error } = await supabase
			.from('vermachtnisse')
			.select('*')
			.eq('vermachtnis_of_user', user_s?.id);
		console.log('data', data);
		if (data) {
			list_of_vermachtnisse = data.map((item) => {
				return {
					id: item.id,
					vermachtnis: item.vermachtnis_item,
					vermachtnisnehmer: item.to_family_member,
					geschätzer_wert: item.estimated_value,
					als_teil_des_erbes: item.als_teil_des_erbes
				};
			});
		}
		// get all family members from supabase
		const { data: family_members_data, error: family_members_error } = await supabase
			.from('family_members')
			.select('*')
			.eq('family_of_user', user_s?.id);
		console.log('family_members_data', family_members_data);
		console.log('family_members_error', family_members_error);
		if (family_members_data) {
			family_members.set(family_members_data);
		}
	});

	console.log(list_of_vermachtnisse);
	console.log($family_members);

	// TODO: Icon for including and excluding circle
</script>

<h2 class="mx-auto mb-4">Übersicht über Ihre Vermächntisse</h2>
<div class="grid grid-cols-[2fr_2fr_1fr] gap-2 mb-4 mx-2">
	<div class="font-bold">Vermächtnis</div>
	<div class="font-bold">an:</div>
	<div class="font-bold">Wert</div>
	<!-- <div class="font-bold">als Teil des Erbes</div> -->
	<!-- if the list is empty show a hint for the hinzufügen button -->

	{#each list_of_vermachtnisse as item}
		<div class="" style="word-break: break-all;">{item.vermachtnis}</div>
		<!-- display firstname and lastname of the family member with the id  -->
		<div class="" style="word-break: break-all;">
			{$family_members.find((x) => x.id === item.vermachtnisnehmer)?.first_name}
			{$family_members.find((x) => x.id === item.vermachtnisnehmer)?.last_name}
		</div>
		<div class="" style="word-break: break-all;">{item.geschätzer_wert}€</div>
		<!-- <div class="">&times;</div> -->
	{/each}
</div>
{#if list_of_vermachtnisse.length == 0}
	<div class="px-8 mx-auto">
		Sie haben noch keine Vermächtnisse hinzugefügt. Klicken Sie auf den Button um ein Vermächtnis
		hinzuzufügen.
	</div>
	<div class="mx-auto">
		<Icon component={Svg} viewBox="0 0 24 24" width="30px" height="30px">
			<path fill="currentColor" d={mdiArrowDownBold} />
		</Icon>
	</div>
{/if}
<div class="mx-auto mt-6 mb-4">
	<Button variant="raised" on:click={() => (open = true)}>Vermächtnis hinzufügen</Button>
</div>

<Dialog bind:open>
	<Title><h3 class="font-bold mx-auto">Vermächtnis hinzufügen</h3></Title>
	<!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
	<Content class="flex flex-col">
		<Textfield required bind:value={temp_vermachtnis} label="Vermächtnis" />
		<!-- <Textfield bind:value={temp_vermachtnisnehmer} label="Vermächtnisnehmer" /> -->
		<div class="flex flex-row mt-3">
			<span class="my-auto">an: </span>
			<select
				required
				bind:value={temp_vermachtnisnehmer}
				class="ml-1 flex-grow select select-sm my-auto"
			>
				<!-- <option disabled selected>{auswählen}</option> -->
				{#each $family_members as member}
					<option value={member.id}>{member.first_name} {member.last_name}</option>
				{/each}
			</select>
		</div>

		<Textfield type="number" bind:value={temp_geschätzer_wert} label="geschätzer Wert" />
		<FormField>
			<Checkbox bind:checked={temp_als_teil_des_erbes} />
			<span slot="label">Vermächtnis wird mit Erbe verrechnet</span>
		</FormField>
	</Content>
	<Actions>
		{#if temp_vermachtnisnehmer != undefined && temp_vermachtnisnehmer != 0 && temp_vermachtnis != '' && temp_vermachtnis != ''}
			<Button on:click={() => vermachtnis_hinzufugen()}>
				<Label>hinzufügen</Label>
			</Button>
		{:else}
			<Button disabled>
				<Label>hinzufügen</Label>
			</Button>
		{/if}
	</Actions>
</Dialog>

<div class="mx-auto mt-auto mb-4">
	<Button variant="raised" on:click={() => handle_question_answer(1)}>Fertig</Button>
</div>

<style>
	@tailwind components;
	@tailwind utilities;
</style>
