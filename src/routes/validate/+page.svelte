<script lang="ts">
	import logs from './logs.json';

	console.log(logs);
</script>

<h1>validation</h1>

<div id="log-container">
	{#each logs as l}
		<h2>{l.path}</h2>
		<h3>Problematic links in meta</h3>
		<ul>
			{#each l.brokenLinks.metaLinks as link}
				<li><a href={link}>{link}</a></li>
			{/each}
		</ul>
		<h3>Problematic links in content</h3>
		<ul>
			{#each l.brokenLinks.contentLinks as link}
				<li><a href={link}>{link}</a></li>
			{/each}
		</ul>
	{/each}
</div>

<style>
	h1,
	h2,
	h3 {
		font-family: var(--ff-mono);
	}
	h1 {
		font-size: 2rem;
	}
	#log-container {
		grid-column: 3/-3;
		min-height: 70vh;
	}

	#log-container > * + * {
		margin-top: 1rem;
	}

	h2 {
		color: orangered;
		font-weight: 500;
	}
	h3 {
		font-weight: 500;
	}

	#log-container > * + h2 {
		margin-top: 2rem;
	}

	li {
		margin-left: 1.5rem;
	}
	li + li {
		margin-top: 1rem;
	}
</style>
