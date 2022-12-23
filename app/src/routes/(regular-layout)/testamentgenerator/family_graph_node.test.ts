import {it, expect} from 'vitest'
import {get_unused_id, Node} from './family_graph_node.js'

let n = new Node(0, 'Erblasser', true, 'Erblasser', '', []);
let n2 = new Node(1, 'Kind', true, 'Sohn', '1', []);
let n4 = new Node(4, 'Kind', true, 'Sohn', '1', []);
let n7 = new Node(7, 'Kind', true, 'Sohn', '1', []);
let n5 = new Node(5, 'Kind', true, 'Sohn', '1', []);
const nodes = [n, n2, n4, n7, n5]

it('goes throug the nodes and computes an unused id', () => {
    const result = get_unused_id(nodes);

    expect(result).toStrictEqual(8);
})
