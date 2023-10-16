<script lang="ts">
	import { base } from '$app/paths';
	import { localize, t } from '$lib/i18n/i18n.js';

	export let data;

	$: project = $localize(data.projects)[0];
</script>

<svelte:head>
	<title>{project.meta.title}</title>
</svelte:head>

<article>
	<header>
		<h1>{project.meta.title}</h1>

		<div class="meta">
			<ul class="tags">
				{#each project.meta.tags as t}
					<li>{t}</li>
				{/each}
			</ul>
			<img src={`${base}/sample1.jpg`} alt="" />
			<p class="project-description">{project.meta?.description}</p>
			<div class="infos">
				<div class="info">
					<span>{$t('projects.infos.started')}</span>
					<p>{project.meta?.since}</p>
				</div>
				<div class="info">
					<span>{$t('projects.infos.status')}</span>
					<p>ongoing</p>
				</div>
				<div class="info">
					<span>{$t('projects.infos.pm')}</span>
					<p>{project.meta?.lead}</p>
				</div>
				<div class="info">
					<span>{$t('projects.infos.team')}</span>
					<ul class="team-members">
						{#each project.meta.team as t}
							<li>{t}</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</header>
	<div class="text-body">
		{@html project.html}
	</div>
</article>

<style>
	article,
	header {
		display: contents;
	}
	h1 {
		grid-column: 1/-1;
		font-size: var(--fs-title);
		margin-bottom: 3rem;
		max-inline-size: 25ch;
		line-height: 3.3rem;
	}

	img {
		/* max-height: 18rem; */
		filter: grayscale();
		max-width: 100%;
	}

	.meta {
		grid-column: span 4;
		max-width: 90%;
	}

	.meta > * + * {
		margin-top: 1.3rem;
	}

	.text-body {
		grid-column: 5/-1;
		padding-right: 1rem;
	}

	.team-members {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.tags {
		margin: 0;
	}

	.infos {
		display: flex;
		flex-direction: row;
		gap: 2rem;
		flex-wrap: wrap;
		row-gap: 1rem;
	}
	span {
		display: block;
		font-family: var(--ff-mono);
		color: red;
		font-weight: 300;
		margin-bottom: 0.6rem;
		font-size: 0.9rem;
	}

	/** Small screens */
	@media screen and (max-width: 820px) {
		article,
		header {
			display: block;
		}

		article {
			grid-column: 1/-1;
		}

		header {
			margin-bottom: 2rem;
		}

		h1 {
			margin-bottom: 1.5rem;
		}
	}
</style>
