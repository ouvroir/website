<script lang="ts">
	import { t } from '$i18n/i18n';

	export let data;

	const projects = data.projects;
	console.log(projects);

	const tags = projects
		.reduce((acc, project) => {
			project.tags.forEach((t) => {
				if (!acc.includes(t)) acc.push(t);
			});
			return acc;
		}, [])
		.sort();

	const selected_topics = [];
	const selected_status = [];

	const topicOnClick = (e) => {};
</script>

<div class="filters">
	<div>
		<h3>topics</h3>
		<ul class="filter-tags">
			{#each tags as t}
				<li>
					<button on:click={topicOnClick}>{t}</button>
				</li>
			{/each}
		</ul>
	</div>

	<div>
		<h3>development</h3>
		<ul class="filter-tags">
			<li>ongoing</li>
			<li>archived</li>
		</ul>
	</div>
</div>

<ul class="projects">
	{#each projects as p}
		<li>
			<div class="project-li">
				<a href={`${$t('route.projects')}/${p.slug}`}>
					<h2>{p.title}</h2>
				</a>
				<!-- <p>{p.description}</p>  -->
				<ul class="tags">
					{#each p.tags as t}
						<li class="tag">{t}</li>
					{/each}
				</ul>
			</div>
		</li>
	{/each}
</ul>

<style>
	button {
		border: none;
		background: none;
	}

	h2 {
		font-size: 3.1rem;
		transition: color 0.2s ease;
	}

	h2:hover {
		color: darkorange;
		cursor: pointer;
	}

	h3 {
		font-size: var(--fs-500);
		font-weight: 300;
		margin-bottom: var(--padding-m);
		border-bottom: solid 0.2rem hotpink;
		padding-bottom: 0.4rem;
	}
	.filters {
		grid-column: 1/5;
	}

	.filters > * + * {
		margin-top: 2.5rem;
	}

	.filter-tags {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1rem;

		/* max-height: 2%; */

		font-family: var(--ff-accent);
		font-size: var(--fs-200);
	}

	.projects {
		grid-column: 6/17;
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.projects > * + * {
		border-top: solid 0.3px hotpink;
		padding-top: 2.5rem;
	}
	.project-li > * + * {
		margin-top: 1rem;
	}

	/* .tags {
		display: flex;
		flex-direction: row;
		gap: var(--gap);
		font-family: var(--ff-accent);
	} */
</style>
