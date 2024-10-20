<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	const { data } = $props();

	let isLoggingOut = $state(false);
</script>

<h1 class="text-3xl font-bold underline">Welcome to the Cyber Stack</h1>

<p class="italic">This is very exploratory right now, if you have ideas let me know!</p>

{#if data.profile}
	<h3 class="text-lg font-semibold">Welcome {data.profile.email}</h3>

	<form
		method="post"
		action="?/logout"
		use:enhance={() => {
			isLoggingOut = true;
			return async () => {
				await invalidateAll();
				isLoggingOut = false;
			};
		}}
	>
		<button type="submit" disabled={isLoggingOut} class="font-light hover:underline">Logout</button>
	</form>
{:else}
	<a href="/auth/login/github" class="font-light hover:underline">Login/Signup</a>
{/if}
