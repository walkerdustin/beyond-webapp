
export type line = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    l: undefined | SVGLineElement;
};

export let lines: line[] = [];


export class Node {
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
    connecting_nodes: Node[];
    connecting_lines: line[];
    html_element: HTMLDivElement | null;

    constructor(
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
        connecting_nodes: Node[],        

    ) {
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

        // create 

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


export function draw_line_between_elements(element_top: HTMLElement, element_bottom: HTMLElement) {
    // calculate the bottom center position of the top element
    const pos1_y = element_top.getBoundingClientRect().bottom;
    const pos1_x =
        element_top.getBoundingClientRect().left + element_top.getBoundingClientRect().width / 2;
    const pos2_y = element_bottom.getBoundingClientRect().top;
    const pos2_x =
        element_bottom.getBoundingClientRect().left +
        element_bottom.getBoundingClientRect().width / 2;
    console.log('adding line to array');

    lines.push({
        x1: pos1_x,
        y1: pos1_y,
        x2: pos2_x,
        y2: pos2_y,
        l: undefined,
    });
    lines = lines;
    // // create a new svg line element
    // const line = document.createElement('line');
    // line.setAttribute('x1', pos1_x.toString());
    // line.setAttribute('y1', pos1_y.toString());
    // line.setAttribute('x2', pos2_x.toString());
    // line.setAttribute('y2', pos2_y.toString());
    // line.setAttribute('stroke', 'black');
    // svg_canvas.appendChild(line);
    return 0;
}

/*
# bestimmen der erbfolge.

Es werden erst alle direkten verwandten der ersten Ordnung berücksichtigt.
also:  Kinder und Partner
Falls einer der der Menschen der ersten Ordnung verstorben ist, 
werden die Kinder des Verstorbenen ebenfalls berücksichtigt.

*/
