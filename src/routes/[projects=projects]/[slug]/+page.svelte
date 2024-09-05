<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { dateToLocalizedString, t } from '$i18n/i18n';
	import { projects, membersHash } from '$lib/stores';
	import { getH1fromHTML, extractContentFromHTML } from '$lib/utils/helpers';
	import { browser } from '$app/environment';
	import { getRandomPattern } from '$lib/utils/random';
	import { MemberLink } from '$components';

	console.log($membersHash);

	const devImgPath = '../src/lib/labouvroir/projets/images/';
	const prodImgPath = `${base}/images/projets/`;

	const project = $projects.find((p) => p.meta.slug === $page.params.slug)!;
</script>

<svelte:head>
	<title>{project.meta.title}</title>
</svelte:head>

{#if browser}
	<article>
		<header class={`${getRandomPattern()} patterns-contrast-1 patterns-size-s`}>
			<div class="title-container">
				<h1>{@html extractContentFromHTML(project.html, 'h1').extracted}</h1>
			</div>
			<p class="frist-paragraph">{@html extractContentFromHTML(project.html, 'p').extracted}</p>
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
			{@html getH1fromHTML(project.html).doc}
		</section>
	</article>
{/if}

<style>
	article {
		grid-column: full;
		display: grid;
		grid-template-columns: subgrid;
	}
	header {
		--margin-btm: 4rem;
		grid-column: full;
		display: grid;
		grid-template-columns: subgrid;
		align-items: center;
		margin-bottom: var(--margin-btm);
		padding: var(--margin-btm) 0;

		/* border-bottom-left-radius: var(--border-radius);
		border-bottom-right-radius: var(--border-radius);
		box-shadow: 2px 2px 1rem -3px var(--clr-b); */

		& .title-container {
			grid-column: content-start / full;
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		& h1 {
			color: var(--clr-b);
			grid-column: content;
			font-size: var(--fs-700);
			line-height: 3.3rem;
			font-weight: 700;
		}

		& .frist-paragraph {
			margin-top: 1rem;
			font-weight: 500;
			font-size: var(--fs-300);
			line-height: var(--body-line-height);
		}

		& h1,
		& .frist-paragraph {
			--padding-v: 1rem;
			grid-column: content-start / popout-end;
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
