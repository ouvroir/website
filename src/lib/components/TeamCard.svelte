<script lang="ts">
	import type { Member } from '$lib/types';
	import { base } from '$app/paths';
	import { t } from '$lib/i18n/i18n';
	import TeamCardMeta from './TeamCardMeta.svelte';
	import { page } from '$app/stores';

	export let data: Member;
	let pageMode: boolean;

	page.subscribe((p) => {
		if (p.params.members) pageMode = true;
	});
</script>

{#if pageMode}
	<article class="team-card team-card-page">
		<div class="header-page-mode">
			{#if data.meta.img}
				<div class="img-container">
					<img src={`${base}/team/${data.meta.img}`} alt="" />
				</div>
			{:else}
				<div class="img-container">
					<div class="empty-img" />
				</div>
			{/if}
			<div class="header-page-mode-text">
				<h2>{$t(`about.team.${data.meta.status}`)}</h2>
				<p class="short-description">{data.meta.description}</p>
			</div>
		</div>
		<TeamCardMeta meta={data.meta} />
	</article>
{:else}
	<article class="team-card">
		{#if data.meta.img}
			<div class="img-container">
				<img src={`${base}/team/${data.meta.img}`} alt="" />
			</div>
		{:else}
			<div class="img-container">
				<div class="empty-img" />
			</div>
		{/if}
		<div class={`header-text `}>
			{#if !pageMode}
				<h1>
					{data.meta.firstname}
					{data.meta.lastname}
				</h1>
			{/if}
			<p class="short-description">{data.meta.description}</p>
			<TeamCardMeta meta={data.meta} />
		</div>
	</article>
{/if}

<style>
	.team-card {
		width: 100%;
		display: flex;
		flex-direction: row;
		column-gap: 1rem;
		row-gap: 1.5rem;
		/* align-items: center; */
	}

	.team-card-page {
		display: block;
	}

	.team-card:hover h1::after {
		position: absolute;
		content: '';
		top: 1.8rem;
		left: 0;
		width: 100%;
		height: 0.2rem;
		background-color: var(--clr-accent);
	}

	.header-page-mode {
		/* max-height: 15rem; */
		display: flex;
		flex-direction: row;
		column-gap: 1.5rem;
		margin-bottom: 1.5rem;
		padding-bottom: 1.5rem;
		border-bottom: solid 2px var(--clr-accent-light);
	}
	.header-page-mode-text {
		padding-top: 0.5rem;
		/* max-width: 22rem; */
		/* min-width: 5rem; */
	}

	.header-page-mode h2 {
		font-size: 1.2rem;
		margin-bottom: 1rem;
		color: var(--clr-accent);
	}

	h1 {
		position: relative;
		width: fit-content;
		cursor: pointer;
	}

	.img-container {
		/* height: fit-content; */
	}
	.img-container > img,
	.empty-img {
		width: 13rem;
		min-width: 13rem;
		min-height: 13rem;
		background-color: lightgray;
		filter: grayscale();
		/* align-self: flex-start; */
	}

	.header-text > * + * {
		margin-top: 1rem;
	}

	.team-card p {
		line-height: 1.5rem;
		/* width: 40%; */
	}

	.team-card h1 {
		margin-top: 0.5rem;
		font-size: 1.5rem;
	}

	.short-description {
		font-style: italic;
		font-size: 1rem;
	}

	@media screen and (min-width: 821px) and (max-width: 1024px) {
		.header-page-mode {
			flex-wrap: wrap;
		}
	}
</style>
