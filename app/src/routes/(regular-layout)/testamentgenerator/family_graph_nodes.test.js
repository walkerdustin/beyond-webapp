const get_unused_id = require('./family_graph_node').get_unused_id


test('get_unused_id', () => {
    let n = new (0, 'Erblasser', true, 'Erblasser', '', []);
	let n2 = new (1, 'Kind', true, 'Sohn', '1', []);
    let n4 = new (4, 'Kind', true, 'Sohn', '1', []);
    let n7 = new (7, 'Kind', true, 'Sohn', '1', []);
    let n5 = new (5, 'Kind', true, 'Sohn', '1', []);
    const nodes = [n, n2, n4, n7, n5]

    expect(get_unused_id(nodes)).toBe(7)
    })  