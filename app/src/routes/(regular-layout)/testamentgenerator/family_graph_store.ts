import { writable } from 'svelte/store';
import { Node } from './family_graph_node';


export let writableNodes = writable([Node]);
