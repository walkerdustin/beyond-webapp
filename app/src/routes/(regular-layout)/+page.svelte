<script>
	import { supabase } from '$lib/supabaseClient';
	async function call_edge_function() {
		console.log('calling edge funtion');
		const { data, error } = await supabase.functions.invoke('create-pdf', {
			body: { name: 'mein name' }
		});
		console.log(data);
	}
</script>

<h1>Index</h1>

<button on:click={call_edge_function}>call function</button>
