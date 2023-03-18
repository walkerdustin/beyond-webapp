<script>
	import Button, { Label } from '@smui/button';
	import Ripple from '@smui/ripple';
</script>

<div class="flex items-center justify-center center flex-grow">
	<!-- <Button color="secondary" variant="raised">
		<a href="/testamentgenerator"> Testamentgenerator <br /> starten</a>
	</Button> -->

	<div
		class="flex p-2 rounded items-center btn-primary text-white font-medium text-center mt-20"
		use:Ripple={{ surface: true, color: 'primary' }}
	>
		<a href="/testamentgenerator">Testamentgenerator <br /> starten</a>
	</div>
</div>

