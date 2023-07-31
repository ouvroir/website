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

<li
	class={`project-item ${header ? 'accent' : ''}`}
	on:click={handleClick}
	on:keypress={handleClick}
>
	{#if header}
		<span class="card-header">Livrable CIÉCO</span>
	{/if}
	<a href={`${$t('route.projects')}/${data.meta.slug}`}>
		<h1 on:mouseover={onMouseOver} on:mouseout={onMouseOut} on:focus on:blur>{data.meta.title}</h1>
	</a>
	<ul class="tags">
		{#each data.meta.tags as t}
			<li>{t}</li>
		{/each}
	</ul>

	<p class="project-description">
		{data.meta.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi laboriosam
		illo ducimus perspiciatis nesciunt, magnam ipsum facilis hic modi, harum a.
	</p>
</li>

<style>
	.project-item {
		position: relative;
		pointer-events: all;
		transition: all 0.2s ease-in-out;
	}

	h1 {
		font-size: var(--fs-title-card);
		/* transition: color 0.2s ease-in-out; */
	}

	.project-item:hover > a > h1 {
		text-decoration: underline 0.2rem orangered;
		/* color: orangered; */
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
		color: orangered;
		font-weight: 300;
		margin-bottom: 0.5rem;
	}

	.tags {
		margin-top: 0.5rem;
		font-weight: 300;
		font-size: 0.9rem;
	}
</style>
