<script lang="ts">
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	import Button, { Label } from '@smui/button';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import DistributionBlock from './distribution_block.svelte';
	import { user_s } from '$lib/global-store';
	import { get } from 'svelte/store';
	import type { family_member_extended } from './testamentgenerator_store';
	import { family_members } from './testamentgenerator_store';
	import FloatInput from '$lib/components/float_input.svelte';
	export let handle_question_answer: (option: 0 | 1) => void;

	const ROUND_TO_PRECISION = 3;

	async function weiter() {
		// set the inheritance quotas for all family members in the database
		let temp_family_members = get(family_members);
		let promises_array = [];
		for (let i = 0; i < temp_family_members.length; i++) {
			const element = temp_family_members[i];
			promises_array.push(
				supabase
					.from('family_members')
					.update({ inheritance_quota: element.current_percentage })
					.eq('id', element.id)
			);
		}
		Promise.all(promises_array);
		handle_question_answer(0);
	}

	type family_member_extended = {
		id: number;
		first_name: string;
		last_name: string;
		verhältnis: string;
		current_percentage: number | undefined;
		gesetzliche_erbfolge: number | undefined;
		pflichtanteil: number | undefined;
	};
	let temp_number = 0;
	let title = 'zu verteilen: ';

	// let family_members: family_member_extended[] = [];
	// define the different Orders for the inheritance
	let order_ehegatte = ['Partner'];
	let order1 = ['Kind'];
	let order1_5 = ['Enkelkind'];
	let order2 = ['Geschwister', 'Elternteil'];
	let order2_5 = ['Nichte / Neffe'];
	let order3 = ['Großeltern', 'Onkel / Tante'];

	onMount(async () => {
		const user_id = user_s?.id;
		console.log(user_id);

		// get all family members from database
		const { data, error } = await supabase
			.from('family_members')
			.select('*')
			.eq('family_of_user', user_id);
		console.log(data);
		// fill family_members with data
		let temp_family_members: family_member_extended[] = [];
		data?.forEach((member) => {
			temp_family_members = [
				...temp_family_members,
				{
					id: member.id,
					first_name: member.first_name,
					last_name: member.last_name,
					verhältnis: member.relation,
					current_percentage: member.inheritance_quota != -1 ? member.inheritance_quota : 0,
					gesetzliche_erbfolge: undefined,
					pflichtanteil: undefined
				}
			];
		});
		console.log('temp_family_members');

		console.log(temp_family_members);
		family_members.set(temp_family_members);

		// calculate the percentage of the inheritance by german law

		// get all family members in the first order
		let order_ehegatte_member = temp_family_members.filter((member) =>
			order_ehegatte.includes(member.verhältnis)
		);
		let order1_members = temp_family_members.filter((member) => order1.includes(member.verhältnis));
		let order1_5_members = temp_family_members.filter((member) =>
			order1_5.includes(member.verhältnis)
		);
		let order2_members = temp_family_members.filter((member) => order2.includes(member.verhältnis));
		let order2_5_members = temp_family_members.filter((member) =>
			order2_5.includes(member.verhältnis)
		);
		let order3_members = temp_family_members.filter((member) => order3.includes(member.verhältnis));

		// log all the members in the different orders
		console.log('order_ehegatte_member', order_ehegatte_member);
		console.log('order1_members', order1_members);
		console.log('order1_5_members', order1_5_members);
		console.log('order2_members', order2_members);
		console.log('order2_5_members', order2_5_members);
		console.log('order3_members', order3_members);

		let we_cant_calculate_the_inheritance = false;
		let ehegatte_exists = order_ehegatte_member.length > 0 ? true : false;
		// if there are members in the first order, calculate the percentage
		let order1_length = order1_members.length;
		if (order1_length > 0) {
			let order1_percentage: number;
			if (ehegatte_exists) {
				order1_percentage = 100 / (order1_length + 1);
				order_ehegatte_member[0].gesetzliche_erbfolge = order1_percentage;
				order_ehegatte_member[0].pflichtanteil = order1_percentage / 2;
			} else {
				order1_percentage = 100 / order1_length;
			}
			order1_members.forEach((member) => {
				member.gesetzliche_erbfolge = order1_percentage;
				member.pflichtanteil = order1_percentage / 2;
			});
		} else if (order1_5_members.length > 0) {
			we_cant_calculate_the_inheritance = true;
		} else if (order2_members.length > 0) {
			let order2_percentage: number;
			if (ehegatte_exists) {
				order2_percentage = 100 / (order2_members.length + 1);
				order_ehegatte_member[0].gesetzliche_erbfolge = order2_percentage;
				order_ehegatte_member[0].pflichtanteil = order2_percentage / 2;
			} else {
				order2_percentage = 100 / order2_members.length;
			}
			order2_members.forEach((member) => {
				member.gesetzliche_erbfolge = order2_percentage;
				member.pflichtanteil = order2_percentage / 2;
			});
		} else if (order2_5_members.length > 0) {
			we_cant_calculate_the_inheritance = true;
		} else if (order3_members.length > 0) {
			let order3_percentage: number;
			if (ehegatte_exists) {
				order3_percentage = 100 / (order3_members.length + 1);
				order_ehegatte_member[0].gesetzliche_erbfolge = order3_percentage;
				order_ehegatte_member[0].pflichtanteil = order3_percentage / 2;
			} else {
				order3_percentage = 100 / order3_members.length;
			}
			order3_members.forEach((member) => {
				member.gesetzliche_erbfolge = order3_percentage;
				member.pflichtanteil = order3_percentage / 2;
			});
		} else {
			we_cant_calculate_the_inheritance = true;
		}
		//set the current percentage to the pflichtanteil value for all family members
		// make sure the current percentage is not overwritten, if it already exists
		temp_family_members.forEach((member) => {
			if (member.pflichtanteil) {
				if (
					member.current_percentage != undefined &&
					member.current_percentage < member.pflichtanteil
				) {
					member.current_percentage = member.pflichtanteil;
				}
			}
		});
		console.log('family_members after calculation', family_members);
	});

	let verfügbare_quote = 100;

	// sum of all current percentages of all family members
	let summe_aktuelle_quote = 0;
	let all_current_percentages = [];
	// calculate the sum of all current percentages of all family members
	$: {
		all_current_percentages = $family_members.map((member) =>
			member.current_percentage ? member.current_percentage : 0
		);
		summe_aktuelle_quote = all_current_percentages.reduce((a, b) => a + b, 0);
		console.table(all_current_percentages);
		console.log('summe_aktuelle_quote', summe_aktuelle_quote);
	}
	$: verfügbare_quote = 100 - summe_aktuelle_quote;

	console.log('summe_aktuelle_quote', summe_aktuelle_quote);
</script>

<div class="flex flex-col items-center justify-center px-3 w-full gap-2 md:gap-4 ">
	<h2 class="mx-auto">Bestimmen Sie die Erbverteilung</h2>

	<DistributionBlock
		id={-1}
		current_percentage={Math.round(verfügbare_quote * 10 ** (ROUND_TO_PRECISION - 1)) /
			10 ** (ROUND_TO_PRECISION - 1)}
		{title}
		header_block={true}
	/>
	<!-- zu verteilender anteil    //   verfügbar    noch nicht verteilt        -->
	<!-- <hr class="bg-black h-0.5 rounded max-w-3xl mx-5" /> -->
	{#each $family_members as member}
		<DistributionBlock
			id={member.id}
			current_percentage={member.current_percentage ? member.current_percentage : 0}
			{verfügbare_quote}
			title={member.first_name + ' ' + member.last_name}
			pflichtanteil={member.pflichtanteil}
			gesetzliche_erbfolge={member.gesetzliche_erbfolge}
			round_to_precision={ROUND_TO_PRECISION}
		/>
	{/each}
	<div class="mx-auto mt-4 mb-8">
		<Button variant="raised" on:click={() => weiter()}>Weiter</Button>
	</div>
</div>

<style>
	/* @tailwind components;
	@tailwind utilities; */
</style>
