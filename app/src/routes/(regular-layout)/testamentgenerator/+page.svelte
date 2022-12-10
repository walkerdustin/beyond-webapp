<script lang="ts">
	import RegularQuestion from './regular_question.svelte';
	import SampleComponentForSpecialCase from './sample_component_for_special_case.svelte';

	// Get the questions and transitions for the questionnaire
	import { get_questions } from '$lib/questionnaire';
	import type {
		question,
		questions_dict,
		transition_node,
		transitions_network
	} from '$lib/questionnaire';

	let data = get_questions();
	let questions: questions_dict = data.questions;
	let transitions: transitions_network = data.transitions;
	console.log(questions);
	console.log(transitions);

	// Get the first question
	let current_question: question = questions['00100'];
	console.log(current_question);

	let frage = 'Wie ist Ihr Familienstand?';
	let option0 = 'Verheiratet';
	let option1 = 'Nicht (mehr) verheiratet';
	let info =
		'"Hier ist Ihr offizieller Familienstand maßgeblich. Das bedeutet, dass selbst wenn Sie in fester Partnerschaft leben, nur eine Ehe oder eingetragene Lebenspartnerschaft für Ihr Testament entscheidend sind." (ninebarc)';

	function handle_question_answer(option: 0 | 1) {
		let next_question_id: string;
		console.log('clicked option ' + option);
		if (option == 0) {
			next_question_id = transitions[current_question.state_id].next_state0;
		} else {
			next_question_id = transitions[current_question.state_id].next_state1;
		}
		current_question = questions[next_question_id];
	}
</script>

<div class="flex flex-grow flex-col h-96">
	<RegularQuestion {...current_question} {handle_question_answer} />
</div>

<!-- <SampleComponentForSpecialCase /> -->
<style>
	/* @tailwind components;
	@tailwind utilities; */
</style>
