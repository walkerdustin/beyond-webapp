import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

export type family_member_extended = {
    id: number;
    first_name: string;
    last_name: string;
    verhältnis: string;
    current_percentage: number | undefined;
    gesetzliche_erbfolge: number | undefined;
    pflichtanteil: number | undefined;
};
export const family_members: Writable<family_member_extended[]> = writable([]);

export const verhältnis_list = ['Elternteil', 'Kind', 'Partner', 'Großeltern', 'Enkelkind', 'Geschwister', 'Nichte / Neffe', 'Onkel / Tante', 'Cousin / Cousine', 'Freund / Freundin', 'andere'];

export const writable_current_question_state_id = writable('00100');
