<script lang="ts">
	export let data;

	console.log(data);
</script>

<ul>
	{#each data.meetings as m}
		<li>
			<a href={`/cr/${m.date}`}>{m.title}</a>
		</li>
	{/each}
</ul>
