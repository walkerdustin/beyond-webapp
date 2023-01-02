import questions from '$lib/Testamentgenerator_qusetions.md?raw';


// Read the questions from a markdown file and store them in an array of dictionaries

// Sample Input:
// %%States
// __00100(verheiratet?); 
//     %%frage 'Wie ist Ihr Familienstand?'
//     %%option0 'Verheiratet'
//     %%option1 'Nicht (mehr) verheiratet'
//     %%info 'Hier ist Ihr offizieller Familienstand maßgeblich. Das bedeutet, dass selbst wenn Sie in fester Partnerschaft leben, nur eine Ehe oder eingetragene Lebenspartnerschaft für Ihr Testament entscheidend sind. (ninebarc)'

// __00110(gemeinsames T.?);
//     %%frage 'Wie wollen Sie Ihr Testament erstellen?'
//     %%option0 'Mit meinem Ehepartner'
//     %%option1 'Alleine'
//     %%info 'Wenn Sie verheiratet sind oder in einer eingetragenen Lebenspartnerschaft leben können Sie mit Ihrem Partner ein gemeinschaftliches Testament aufsetzen. Damit bezweckt man vor allem die möglichst umfassende Absicherung des längerlebenden Ehegatten. Dieser wird zunächst Erbe. Die Ehepartner können zudem bestimmen, wer nach dem Tod des längerlebenden Ehepartners ihr Erbe werden soll. Bei einem Einzeltestament hingegen können Sie allein Ihre Erben innerhalb des gesetzlichen Rahmens frei wählen.'
//

export type question = {
    typ: string,
    state_id: string,
    state_name: string,
    frage: string,
    option0: string,
    option1: string,
    info: string
};

export type questions_dict = { [stateid: string]: question };

type transition = {
    state0: string,
    transition_text: string,
    state1: string,
};

export type transition_node = {
    transition_text0: string,
    transition_text1: string,
    next_state0: string,
    next_state1: string
};

export type transitions_network = { [state: string]: transition_node };

export function get_questions() {
    // Read Lines into an array
    const markdown_text_lines = questions.split("\n");

    // find the First definition of a State
    let current_line = 0;
    while (true) {
        if (markdown_text_lines[current_line].includes('%%Questions')) {

            break;
        }
        current_line++;
    }

    // Define the Regexes 
    const regex_state_name = /__(\d*?)\((.*)\)/;
    const regex_typ = /%%typ '(.*?)'/;
    const regex_frage = /%%frage '(.*?)'/;
    const regex_option0 = /%%option0 '(.*?)'/;
    const regex_option1 = /%%option1 '(.*?)'/;
    const regex_info = /%%info '(.*?)'/;
    let state_id = "";
    let state_name = "";
    let typ = "";
    let question = "";
    let option0 = "";
    let option1 = "";
    let info = "";
    let regex_array;

    // Go through the questions and store them in a dictionary
    let array_of_questions: question[] = [];
    let temp_question_dict: question;

    // Q: what does the ? operator do?
    // A: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
    // A: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
    // 
    // Q: what does the ?? operator do?
    // A: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator

    while (true) {
        if (markdown_text_lines[current_line].includes('__')) {

            regex_array = markdown_text_lines[current_line].match(regex_state_name)
            state_id = regex_array ? regex_array[1] : "";
            state_name = regex_array ? regex_array[2] : "";
            current_line++;

            regex_array = markdown_text_lines[current_line].match(regex_typ)
            typ = regex_array ? regex_array[1] : "";
            current_line++;

            regex_array = markdown_text_lines[current_line].match(regex_frage)
            question = regex_array ? regex_array[1] : "";
            current_line++;

            regex_array = markdown_text_lines[current_line].match(regex_option0)
            option0 = regex_array ? regex_array[1] : "";
            current_line++;

            regex_array = markdown_text_lines[current_line].match(regex_option1)
            option1 = regex_array ? regex_array[1] : "";
            current_line++;

            regex_array = markdown_text_lines[current_line].match(regex_info)
            info = regex_array ? regex_array[1] : "";


            temp_question_dict = {
                "typ": typ,
                "state_id": state_id,
                "state_name": state_name,
                "frage": question,
                "option0": option0,
                "option1": option1,
                "info": info
            }
            array_of_questions.push(temp_question_dict);
        }

        current_line++;
        if (markdown_text_lines[current_line].includes('%%Transitions')) {
            break;
        }
    }
    // Q: what is the difference between the following two lines?
    // let questions_dict: questions_dict = {};
    // let questions_dict: questions_dict;


    let questions_dict: questions_dict = {};
    array_of_questions.forEach((question) => {
        questions_dict[question.state_id] = question;
    });

    // this generates text for a manual sql insert statement
    let temp_s = "";
    array_of_questions.forEach((question) => {
        temp_s += `("${question.state_id}", "${question.state_name}"),\n`
    });
    console.log(temp_s);


    // sample transition
    // __00100-- ja -->__00110
    // __00100-- nein -->__00200
    let state0 = "";
    let state1 = "";
    let transition_text = "";
    let temp_transition_dict: transition;
    let array_of_transitions: transition[] = [];

    const regex_transition = /__(\d*)-+([a-zA-Z]*?)-+>__(\d*)/;
    while (true) {
        current_line++;
        if (markdown_text_lines[current_line].includes('%%End')) {
            break;
        }

        regex_array = markdown_text_lines[current_line].match(regex_transition);
        if (!regex_array) {
            throw new Error("Error in Transition at line " + current_line + " in Testamentgenerator_questions.md");
        }
        state0 = regex_array[1];
        transition_text = regex_array[2];
        state1 = regex_array[3];

        temp_transition_dict = {
            "state0": state0,
            "transition_text": transition_text,
            "state1": state1
        }

        array_of_transitions.push(temp_transition_dict);
    }


    return {
        "questions": questions_dict,
        "transitions": create_transition_network_from_array(array_of_transitions)
    };
}

function create_transition_network_from_array(array_of_transitions: transition[]): transitions_network {
    let transitions: transitions_network = {};
    let temp_transition_node: transition_node;
    for (const transition of array_of_transitions) {
        if (transitions[transition.state0]) {
            transitions[transition.state0].transition_text1 = transition.transition_text;
            transitions[transition.state0].next_state1 = transition.state1;
        }
        else {
            temp_transition_node = {
                "transition_text0": transition.transition_text,
                "next_state0": transition.state1,
                "transition_text1": "",
                "next_state1": ""
            }
            transitions[transition.state0] = temp_transition_node;
        }
    }
    // go through the transitions
    // if transition.next_state1 is empty, set it equal to transition.next_state0
    for (const [key, value] of Object.entries(transitions)) {
        if (value.next_state1 == "") {
            value.next_state1 = value.next_state0;
        }
    }

    return transitions;
}