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

{#if data}
	<article class={`team-card ${pageMode ? 'team-card-page' : ''}`}>
		{#if data.meta.img}
			<div class="img-container">
				<img src={`${base}/team/${data.meta.img}`} alt="" />
			</div>
		{:else}
			<div class="img-container">
				<div class="empty-img" />
			</div>
		{/if}
		<div class={`header-text`}>
			<h1>
				{data.meta.firstname}
				{data.meta.lastname}
			</h1>
			<!-- <span class="role">{$t(`about.team.${data.meta.status}`)}</span> -->

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

		/* border-bottom: solid 5px var(--clr-b); */
		border-radius: var(--border-radius);
		padding: 1.5rem 2rem 1.5rem 1rem;
		transition: all 0.1s ease-in;
	}

	.team-card:hover {
		background-color: var(--clr-b);
		color: var(--clr-a);
	}

	.team-card-page.team-card {
		margin-top: 4rem;
		color: var(--clr-a);
		background-color: var(--clr-b);
		padding: 2.5rem 1.5rem;

		& a {
			color: var(--clr-a) !important;
		}
	}

	.header-text h1 {
		font-size: var(--fs-400);
		font-weight: 700;
		position: relative;
		width: fit-content;
		cursor: pointer;
		margin-top: 0;
		margin-bottom: 0;
	}
	/* .header-text span {
		font-size: var(--fs-300);
		font-weight: 300;
	} */

	.img-container > img,
	.empty-img {
		width: 13rem;
		min-width: 13rem;
		min-height: 13rem;
		background-color: lightgray;
		filter: grayscale();
		/* align-self: flex-start; */
		object-fit: cover;
		border-radius: var(--border-radius);
	}

	.header-text > * + * {
		margin-top: 1rem;
	}

	.team-card p {
		line-height: 1.5rem;
		/* width: 40%; */
	}

	.short-description {
		font-size: var(--fs-300);
		font-weight: 400;
		line-height: 1.7rem !important;
		margin-top: 0.5rem;
	}

	@media screen and (min-width: 821px) and (max-width: 1024px) {
		.header-page-mode {
			flex-wrap: wrap;
		}
	}
</style>
