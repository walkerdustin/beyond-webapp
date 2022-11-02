<script>
	import { Icon } from '@smui/common';
	import { Svg } from '@smui/common/elements';
	import Button, { Label } from '@smui/button';
	import IconButton from '@smui/icon-button';

	import { mdiAccount } from '@mdi/js';
</script>

<div class="mdc-elevation--z8 ">
	<header class="mdc-elevation--z8 flex flex-row w-full">
		<a href="/" draggable="false"
			><img
				src="/images/beyond-logo.png"
				alt="beyond logo"
				height="60"
				class="m-4"
				draggable="false"
			/>
		</a>

		<div>
			<h1 class="mb-1">Beyond</h1>
			<p class="mt-1">After Life Management</p>
		</div>
		<!-- just whitespace -->
		<div class="grow" />
		<nav>
			<div class="float-right mr-2">
				<Button>
					<a href="/logIn" draggable="false">
						<Icon component={Svg} viewBox="0 0 24 24">
							<path fill="currentColor" d={mdiAccount} />
						</Icon>
						<Label>Einloggen</Label>
					</a>
				</Button>
			</div>
		</nav>
	</header>
</div>
<h1 class="mx-auto m-8">Erfolgreich ausgeloggt.</h1>

<div class="mt-auto grow" />

<style>
	header {
		display: flex;
		background-color: white;
		align-items: center;
		/* justify-content: center; */
		height: 80px;
	}
</style>
