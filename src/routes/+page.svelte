<script lang="ts">
	const { data } = $props();

	$inspect(data.user);
</script>

<h1 class="text-3xl font-bold underline">Welcome to the Cyber Stack</h1>

<p class="italic">This is very exploratory right now, if you have ideas let me know!</p>

{#if data.user}
	<h3 class="text-lg font-semibold">Welcome {data.user.email}</h3>
	<a href="/auth/logout" class="font-light hover:underline">Logout</a>
{:else}
	<a href="/auth/login/github" class="font-light hover:underline">Login/Signup</a>
{/if}
