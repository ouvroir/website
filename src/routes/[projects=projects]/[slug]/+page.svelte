<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { dateToLocalizedString, t } from '$i18n/i18n';
	import { projects, membersHash } from '$lib/stores';
	import { getH1fromHTML, extractContentFromHTML } from '$lib/utils/helpers';
	import { browser } from '$app/environment';
	import { getRandomPattern } from '$lib/utils/random';
	import { MemberLink } from '$components';
	import { onMount } from 'svelte';

	const devImgPath = '../src/lib/labouvroir/projets/images/';
	const prodImgPath = `${base}/images/projets/`;

	const project = $projects.find((p) => p.meta.slug === $page.params.slug)!;

	let extracts, doc, h1, p;
	onMount(() => {
		const data = extractContentFromHTML(project.html, ['h1', 'p']);
		extracts = data.extracts;
		doc = data.doc;
		h1 = extracts[0];
		p = extracts[1];
	});
</script>

<svelte:head>
	<title>{project.meta.title}</title>
</svelte:head>

{#if browser}
	<article>
		<header>
			<div class="title-container">
				<h1>{@html h1}</h1>
			</div>
			<p class="frist-paragraph">{@html p}</p>
		</header>
		<section class="meta">
			<div class="infos">
				<div class="info">
					<span>{$t('projects.infos.description')}</span>
					<p>{project.meta?.description}</p>
				</div>
				<div class="info">
					<span>{$t('projects.infos.team')}</span>
					<ul class="team-members">
						{#each project.meta.team as t}
							<MemberLink username={t} />
						{/each}
					</ul>
				</div>
				<div class="info">
					<span>{$t('projects.infos.started')}</span>
					<p>{$dateToLocalizedString(project.meta?.since)}</p>
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
					<span>tags</span>
					<ul class="tags">
						{#each project.meta.tags as t}
							<li>{t}</li>
						{/each}
					</ul>
				</div>
			</div>
		</section>
		<section class="text-body">
			{@html doc}
		</section>
	</article>
	<div class={`content-hero ${getRandomPattern()} patterns-contrast-1 patterns-size-s`}></div>
{/if}

<style>
	.content-hero {
		position: absolute;
		grid-column: full;
		top: 0;
		left: 0;
		width: 100%;
		height: 66vh;
		z-index: 0;
	}

	article {
		grid-column: full;
		display: grid;
		grid-template-columns: subgrid;
	}
	header {
		--margin-btm: 2rem;
		grid-column: popout;
		display: grid;
		grid-template-columns: subgrid;
		/* gap: 2rem; */
		margin-bottom: var(--margin-btm);
		margin-top: 4rem;
		padding: var(--margin-btm) 0;
		z-index: 2;

		/* border-bottom-left-radius: var(--border-radius);
		border-bottom-right-radius: var(--border-radius);
		box-shadow: 2px 2px 1rem -3px var(--clr-b); */

		& .title-container {
			grid-column: 1/-1;
		}

		& h1,
		& .frist-paragraph {
			border: solid 0.5rem var(--cb);
		}

		& h1 {
			color: var(--clr-b);
			font-size: var(--fs-700);
			line-height: 3.5rem;
			font-weight: 700;
			text-wrap: balance;
			width: 80%;
		}

		& .frist-paragraph {
			margin-top: 1rem;
			font-weight: 500;
			font-size: var(--fs-300);
			line-height: var(--body-line-height);
			grid-column: content-start / popout-end;
		}

		& h1,
		& .frist-paragraph {
			--padding-v: 1rem;
			background-color: var(--ca);
			position: relative;
			left: calc(var(--padding-v) * -1);
			padding: 0.7rem var(--padding-v);
			color: var(--cb);
		}
	}

	.meta {
		grid-column: feature-start / content-start;
		max-width: 90%;
		color: var(--clr-b);
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
		flex-direction: column;
		gap: 3rem;
		flex-wrap: wrap;
		row-gap: 2rem;
	}

	.info {
		max-width: 90%;

		& p {
			line-height: 1.5rem;
		}

		& ul {
			display: flex;
			flex-direction: column;
			flex-wrap: wrap;
			gap: 0.5rem;
		}

		& span {
			letter-spacing: 0.05rem;
		}
	}
	span {
		display: block;
		color: var(--clr-b);
		font-weight: 700;
		text-transform: uppercase;
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
