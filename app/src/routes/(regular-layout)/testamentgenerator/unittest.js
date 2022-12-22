// test the get_unused_id function

import {get_unused_id} from './family_graph_nodes.js'
import {test, expect} from '@jest/globals'

test('get_unused_id', () => {
    const nodes = [
        {id: 1, name: 'John'},
        {id: 2, name: 'Mary'},
        {id: 3, name: 'Bob'},
        {id: 4, name: 'Sally'},
        {id: 5, name: 'Sue'},
    ]
    expect(get_unused_id(nodes)).toBe(6)
    })  
