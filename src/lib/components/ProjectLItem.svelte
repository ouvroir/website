<script lang="ts">
	import { t } from '$i18n/i18n';
	import type { Project } from '$lib/types';

	export let data: Project;
	export let header: boolean = false;

	let timer: NodeJS.Timeout;
	let showDescription = false;

	const onMouseOver = async () => {
		timer = setTimeout(() => {
			showDescription = true;
		}, 700);
	};

	const onMouseOut = () => {
		clearTimeout(timer);
		showDescription = false;
	};

	const handleClick = (e: MouseEvent) => {
		const link = (e.currentTarget as Element).querySelector('a');
		if (link) {
			link.click();
		}
	};
</script>

<li class="project-item">
	<a
		class={`project-item ${header ? 'accent' : ''}`}
		href={`${$t('route.projects')}/${data.meta.slug}`}
	>
		{#if header}
			<span class="card-header">Livrable CIÉCO</span>
		{/if}
		<a href={`${$t('route.projects')}/${data.meta.slug}`}>
			<h1 on:mouseover={onMouseOver} on:mouseout={onMouseOut} on:focus on:blur>
				{data.meta.title}
			</h1>
		</a>
		<ul class="tags">
			{#each data.meta.tags as t}
				<li>{t}</li>
			{/each}
		</ul>

		<p class="project-description">
			{data.meta.description}
		</p>
	</a>
</li>

<style>
	h1 {
		font-size: var(--fs-title-card);
		/* transition: color 0.2s ease-in-out; */
	}

	.project-item:hover > a > h1 {
		text-decoration: underline 0.2rem var(--clr-accent);
	}

	.project-description {
		margin-top: 1rem;
		max-width: 70%;
		padding-left: 0;
		border-left: none;
		margin-left: 0;
	}

	.card-header {
		display: block;
		font-size: 0.9rem;
		color: var(--clr-accent);
		font-weight: 300;
		margin-bottom: 0.5rem;
	}

	.tags {
		margin-top: 0.5rem;
		font-weight: 300;
		font-size: 0.9rem;
		flex-wrap: wrap;
		row-gap: 0.5rem;
	}
</style>
