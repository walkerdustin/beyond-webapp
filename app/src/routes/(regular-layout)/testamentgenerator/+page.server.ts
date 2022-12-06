import type { PageLoad } from './$types';
import questions from '$lib/Testamentgenerator_qusetions.md?raw';
import * as fs from 'fs';
const questions_file_path = '';
console.log("#################!!!!!### hello #####################################");
console.log(questions);
console.log(questions.length);

const questions_arr = questions.split("\n");
console.log(questions_arr.length);


// let current_line=0;
// while (true) {
//     if(questions_arr[current_line].includes('    %%States') ){
//         console.log("found %%States");
//         break;
//     }
//     current_line++;
// }
// const regex_state_name = /\((.*)\)/;
// const regex_frage = /%%frage '(.*?)'/;;
// const regex_option0 = /%%option0 '(.*?)'/;;
// const regex_option1 = /%%option1 '(.*?)'/;;
// const regex_info = /%%mehr_info '(.*?)'/;;
// let state_name="";
// let question="";;
// let option0="";
// let option1="";
// let info="";
// let regex_array;
// while (true) {
//     if(questions_arr[current_line].includes('__') ){
//         console.log("found a state");
//         regex_array = questions_arr[current_line].match(regex_state_name)
//         state_name = regex_array? regex_array[1] : "";
//         console.log(state_name);

//         current_line++;
//         regex_array = questions_arr[current_line].match(regex_frage)
//         question = regex_array? regex_array[1] : "";
//         console.log(question);

//         current_line++;
//         regex_array = questions_arr[current_line].match(regex_option0)
//         option0 = regex_array? regex_array[1] : "";
//         console.log(option0);

//         current_line++;
//         regex_array = questions_arr[current_line].match(regex_option1)
//         option1 = regex_array? regex_array[1] : "";
//         console.log(option1);

//         current_line++;
//         regex_array = questions_arr[current_line].match(regex_info)
//         info = regex_array? regex_array[1] : "";
//         console.log(info);
//     }
//     console.log("");
//     current_line++;
//     if(questions_arr[current_line].includes('%%Transitions') ){
//         console.log("found %%Transitions");
//         break;
//     }
// }
// current_line++;

// for (const line in questions_arr) {
//     if (Object.prototype.hasOwnProperty.call(object, line)) {
//         const element = object[line];
//     }
// }

export const load: PageLoad = ({ params }) => {
    // console.log(questions);
    // fs.readFileSync('foo.txt','utf8');
    return {
        post: {
        title: `Title for ${params.slug} goes here`,
        content: `Content for ${params.slug} goes here`
        }
    };
}