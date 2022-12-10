import type { PageServerLoad } from './$types';
import questions from '$lib/Testamentgenerator_qusetions.md?raw';
import * as fs from 'fs';
const questions_file_path = '';
console.log("#################!!!!!### hello #####################################");
console.log(questions);
console.log(questions.length);



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



// Read Lines into an array
const questions_arr = questions.split("\n");
console.log(questions_arr.length);
// find the First definition of a State
let current_line=0;
while (true) {
    if(questions_arr[current_line].includes('    %%Questions') ){
        console.log("found %%Questions");
        break;
    }
    current_line++;
}

// Define the Regexes
const regex_state_name = /__(\d*?)\((.*)\)/;
const regex_frage = /%%frage '(.*?)'/;
const regex_option0 = /%%option0 '(.*?)'/;
const regex_option1 = /%%option1 '(.*?)'/;
const regex_info = /%%mehr_info '(.*?)'/;
let state_id = "";
let state_name="";
let question="";
let option0="";
let option1="";
let info="";
let regex_array;

// Go through the questions and store them in a dictionary

export type question_dict = {
    state_id: string,
    state_name: string,
    question: string,
    option0: string,
    option1: string,
    info: string
}

let array_of_questions: question_dict[] = [];
let temp_question_dict: question_dict;

// Q: what does the ? operator do?
// A: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
// A: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
//
// Q: what does the ?? operator do?
// A: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator

while (true) {
    if(questions_arr[current_line].includes('__') ){
        console.log("found a state");
        regex_array = questions_arr[current_line].match(regex_state_name)
        state_id = regex_array? regex_array[1] : "";
        state_name = regex_array? regex_array[2] : "";
        console.log(state_name);

        current_line++;
        regex_array = questions_arr[current_line].match(regex_frage)
        question = regex_array? regex_array[1] : "";
        console.log(question);
        current_line++;

        regex_array = questions_arr[current_line].match(regex_option0)
        option0 = regex_array? regex_array[1] : "";
        console.log(option0);
        current_line++;

        regex_array = questions_arr[current_line].match(regex_option1)
        option1 = regex_array? regex_array[1] : "";
        console.log(option1);
        current_line++;

        regex_array = questions_arr[current_line].match(regex_info)
        info = regex_array? regex_array[1] : "";
        console.log(info);

        temp_question_dict = {
            "state_id": state_id,
            "state_name": state_name,
            "question": question,
            "option0": option0,
            "option1": option1,
            "info": info
        }
        array_of_questions.push(temp_question_dict);
    }
    console.log("");
    current_line++;
    if(questions_arr[current_line].includes('%%Transitions') ){
        console.log("found %%Transitions");
        break;
    }
}
current_line++;

// for (const line in questions_arr) {
//     if (Object.prototype.hasOwnProperty.call(object, line)) {
//         const element = object[line];
//     }
// }
console.log(array_of_questions);

export const load = (({ _params }) => {
    return {
      array_of_questions
    };
  });