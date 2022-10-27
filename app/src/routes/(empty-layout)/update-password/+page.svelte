<script>
	import { supabase } from '$lib/supabaseClient';

	supabase.auth.onAuthStateChange(async (event, session) => {
		if (event == 'PASSWORD_RECOVERY') {
			const newPassword = prompt('What would you like your new password to be?');
			if (newPassword) {
				const { data, error } = await supabase.auth.updateUser({ password: newPassword });
				if (data) alert('Password updated successfully!');
				if (error) alert('There was an error updating your password.');
			}
		}
	});
</script>
