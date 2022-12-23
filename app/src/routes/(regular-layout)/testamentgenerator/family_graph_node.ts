import { get, writable, type Writable } from "svelte/store";
// the following line needs to be below
// export let nodes = writable([Node]);
export type line = {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    l: undefined | SVGLineElement;
};






// export function add_node(node:Node){
//     nodes.update(nodes => [...nodes, node] );
// }

export function get_unused_id(nodes:Node[]):number {
    // go through all nodes and find the highest id
    let highest_id =  Math.max(...nodes.map((node:Node) => node.id));
    console.log('nodes' + nodes)
    console.log('highest id: ' + highest_id);
    return highest_id + 1;
}

export class Node {
    id: number;
    typ: | 'Elternteil'
    | 'Kind'
    | 'Erblasser'
    | 'Partner'
    | 'Großeltern'
    | 'Enkelkind'
    | 'Geschwister'
    | 'Nichte / Neffe'
    | 'Onkel / Tante';
    active: boolean;
    first_name: string;
    last_name: string;
    level: -2 | -1 | 0 | 1 | 2;
    order: 1 | 2 | 3;
    connecting_nodes: number[];
    connecting_lines: line[];
    html_element: HTMLDivElement | null;

    constructor(
        id: number,
        typ:
            | 'Elternteil'
            | 'Kind'
            | 'Erblasser'
            | 'Partner'
            | 'Großeltern'
            | 'Enkelkind'
            | 'Geschwister'
            | 'Nichte / Neffe'
            | 'Onkel / Tante',
        active = false,
        first_name = '',
        last_name = '',
        connecting_nodes: number[],        

    ) {
        this.id = id;
        this.typ = typ;
        this.active = active;
        this.first_name = first_name;
        this.last_name = last_name;
        this.connecting_nodes = connecting_nodes;
        this.connecting_lines = [];
        this.html_element = null;

        // set level and order of the node
        switch (typ) {
            case 'Elternteil':
                this.level = -1;
                this.order = 2;
                break;
            case 'Kind':
                this.level = 1;
                this.order = 1;
                break;
            case 'Erblasser':
                this.level = 0;
                this.order = 1;
                break;
            case 'Partner':
                this.level = 0;
                this.order = 1;
                break;
            case 'Großeltern':
                this.level = -2;
                this.order = 3;
                break;
            case 'Enkelkind':
                this.level = 2;
                this.order = 1;
                break;
            case 'Geschwister':
                this.level = 0;
                this.order = 2;
                break;
            case 'Nichte / Neffe':
                this.level = 2;
                this.order = 2;
                break;
            case 'Onkel / Tante':
                this.level = -1;
                this.order = 3;
                break;

            default:
                this.level = 0;
                this.order = 3;
                break;
        }
        nodes.update(nodes => [...nodes, this] );

        // create the lines to the connecting nodes
        this.connecting_nodes.forEach((node_id) => {
            console.log('connecting node: ' + node_id + ' to ' + this.id);
            draw_line_between_elements(this.id, node_id);
        });
    }
    set_Name(first_name: string, last_name: string) {
        this.first_name = first_name;
        this.last_name = last_name;
    }
    calculate_necessary_neighbour_nodes() {
        if (this.typ == 'Erblasser') {
        }
    }
}

export let nodes:Writable<Node[]> = writable([]);
let local_nodes_copy:Node[] = []
nodes.subscribe((nodes) => {
    local_nodes_copy = nodes;
    });

export let lines:Writable<line[]> = writable([]);


export function redraw_lines() {
    // lines.forEach((line) => {
    //     line.l?.remove();
    // });
    lines.set([]);
    local_nodes_copy.forEach((node:Node) => {
        node.connecting_nodes.forEach((node_id) => {
            draw_line_between_elements(node.id, node_id);
        });
    });
}

export function draw_line_between_elements(element_0_id: number, element_1_id: number) {
    const element_0 = document.querySelector(`[data-id="${element_0_id}"]`)
    const element_1 = document.querySelector(`[data-id="${element_1_id}"]`)
    const n0 = local_nodes_copy.find((node:Node) => node.id == element_0_id);
    const n1 = local_nodes_copy.find((node:Node) => node.id == element_1_id);
    if (element_0 == null || element_1 == null || n0 == undefined || n1 == undefined) {
        console.log('element not found');
        return -1;
    }
    console.log("drawing line between " + element_0_id + " and " + element_1_id);
    
    const level_0 = n0.level;
    const level_1 = n1.level;

    let pos0_y:number;
    let pos0_x:number;
    let pos1_y:number;
    let pos1_x:number;

    if (level_0 == level_1) {
        console.log('same level');
        // I think it does not matter, if the element is on the left or right side, 
        // because the edge is hidden below the node anyway
        
        // calculate the left center position of element0
        pos0_y = element_0.getBoundingClientRect().top + element_0.getBoundingClientRect().height / 2;
        pos0_x = element_0.getBoundingClientRect().right;
        pos1_y = element_1.getBoundingClientRect().top + element_1.getBoundingClientRect().height / 2;
        pos1_x = element_1.getBoundingClientRect().left;
    }
    if (level_0 < level_1) {
        console.log('level 0 < level 1');
        pos0_y = element_0.getBoundingClientRect().bottom;
        pos0_x = element_0.getBoundingClientRect().left + element_0.getBoundingClientRect().width / 2;
        pos1_y = element_1.getBoundingClientRect().top;
        pos1_x = element_1.getBoundingClientRect().left + element_1.getBoundingClientRect().width / 2;
    }
    if (level_0 > level_1) {
        console.log('level 0 > level 1');
        pos0_y = element_0.getBoundingClientRect().top;
        pos0_x = element_0.getBoundingClientRect().left + element_0.getBoundingClientRect().width / 2;
        pos1_y = element_1.getBoundingClientRect().bottom;
        pos1_x = element_1.getBoundingClientRect().left + element_1.getBoundingClientRect().width / 2;
    }
    console.log('adding line to array');

    lines.update(lines => [...lines, {
        x0: pos0_x? pos0_x : 0,
        y0: pos0_y? pos0_y : 0,
        x1: pos1_x? pos1_x : 0,
        y1: pos1_y? pos1_y : 0,
        l: undefined,
    }]);

    lines = lines;
    return 0;
}

/*
# bestimmen der erbfolge.

Es werden erst alle direkten verwandten der ersten Ordnung berücksichtigt.
also:  Kinder und Partner
Falls einer der der Menschen der ersten Ordnung verstorben ist, 
werden die Kinder des Verstorbenen ebenfalls berücksichtigt.

*/
