<script lang="ts">
	import { t } from '$i18n/i18n';

	export let data;

	let projects = data.projects;
	console.log('🚀 ~ file: +page.svelte:7 ~ projects:', projects);

	let selected_topics: string[] = [];
	let selected_status: string[] = [];

	const filterTags = (key: string, tags: string[]): void => {
		projects = data.projects.filter((p) => {
			if (tags.length > 0) {
				return tags.every((t) => p[key].includes(t));
			} else {
				return true;
			}
		});
	};

	const topicOnClick = (e) => {
		if (!e.target.classList.contains('selected')) {
			selected_topics.push(e.target.id);
			e.target.classList.add('selected');
		} else {
			selected_topics = selected_topics.filter((t) => t !== e.target.id);
			e.target.classList.remove('selected');
		}
		filterTags('tags', selected_topics);
	};

	const tags = data.projects
		.reduce((acc, project) => {
			project.tags.forEach((t) => {
				if (!acc.includes(t)) acc.push(t);
			});
			return acc;
		}, [])
		.sort();
</script>

<div class="aside">
	<div>
		<h3>topics</h3>
		<ul class="filter-tags">
			{#each tags as t, i}
				<li>
					<button on:click={topicOnClick} id={t}>{t}</button>
				</li>
			{/each}
		</ul>
	</div>

	<div>
		<h3>development</h3>
		<ul class="filter-tags">
			<button id="planned">planned</button>
			<button id="ongoing">ongoing</button>
			<button id="archived">archived</button>
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
	h2 {
		font-size: 2.5rem;
		transition: color 0.1s ease;
	}

	h2:hover {
		color: darkorange;
		cursor: pointer;
	}

	h3 {
		font-size: var(--fs-secnav-title);
		font-weight: 300;
		margin-bottom: var(--padding-m);
		border-bottom: solid 0.2rem hotpink;
		padding-bottom: 0.4rem;
		color: var(--clr-magenta);
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
		/* margin-top: 1.5rem; */
		grid-column: 6/17;
		display: flex;
		flex-direction: column;
		gap: 3rem;
		/* max-height: 75vh;
		overflow-y: scroll; */
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
