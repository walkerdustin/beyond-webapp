<script>
	import { Icon } from '@smui/common';
	import { Svg } from '@smui/common/elements';
	import Button, { Label } from '@smui/button';
	import IconButton from '@smui/icon-button';

	import { mdiAccount } from '@mdi/js';
</script>

<h1 class="mx-auto m-8">Erfolgreich ausgeloggt.</h1>

<div class="mx-auto">
	<Button>
		<a href="/login" draggable="false" class="h-">
			<Icon component={Svg} viewBox="0 0 24 24">
				<path fill="currentColor" d={mdiAccount} />
			</Icon>
			<Label>Wieder Einloggen</Label>
		</a>
	</Button>
</div>
