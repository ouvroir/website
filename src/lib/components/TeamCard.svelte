<script lang="ts">
	import type { Member } from '$lib/types';
	import { memberExpaned } from '$lib/stores';
	import { slide } from 'svelte/transition';
	import { base } from '$app/paths';
	import { t } from '$lib/i18n/i18n';

	export let data: Member;

	const handleClick = (e: MouseEvent) => {
		if ((e.target as HTMLElement)?.tagName === 'A') return;

		if ($memberExpaned !== data.meta.slug) {
			memberExpaned.set(data.meta.slug);
		} else memberExpaned.set('');
	};
</script>

<li class="member-card">
	<a href={`${$t('route.about.member')}/${data.meta.slug}`}>
		<article class="member-content">
			<header id={`${data.meta.slug}`}>
				{#if data.meta.img}
					<img src={`${base}/team/${data.meta.img}`} alt="" />
				{:else}
					<div class="empty-img" />
				{/if}
				<div class="header-text">
					<h1>
						{data.meta.firstname}
						{data.meta.lastname}
					</h1>
					<p class="short-description">{data.meta.description}</p>
					<ul class="meta-list">
						<div class="meta">
							<span>mail</span>
							<a href={`mailto:${data.meta.mail}`}>{data.meta.mail}</a>
						</div>
						<!-- {#if data.meta.permalink}
							<div class="meta">
								<span>permalink</span>
								<a href={`${data.meta.permalink}`}>{data.meta.permalink}</a>
							</div>
						{/if} -->
						{#if data.meta.projects && data.meta.projects.length > 0}
							<div class="meta">
								<span>projets</span>
								<ul>
									{#each data.meta.projects as p}
										<li>{p}</li>
									{/each}
								</ul>
							</div>
						{/if}
						<!-- {#if data.meta.tags && data.meta.tags.length > 0}
							<div class="meta">
								<span>tags</span>
								<ul>
									{#each data.meta.tags as tag}
										<li>{tag}</li>
									{/each}
								</ul>
							</div>
						{/if} -->
					</ul>
				</div>
			</header>
		</article>
	</a>
</li>

<style>
	.member-card {
		width: 100%;
	}

	.member-card > a {
		all: unset;
		cursor: pointer;
	}
	.text-body {
		display: block;
		padding: 2rem 0;
		width: 80%;
	}

	.member-card > a:hover h1::after {
		position: absolute;
		content: '';
		top: 1.8rem;
		left: 0;
		width: 100%;
		height: 0.2rem;
		background-color: var(--clr-accent);
	}
	h1 {
		position: relative;
		width: fit-content;
		cursor: pointer;
	}

	header {
		display: flex;
		flex-direction: row;
		gap: 2rem;
	}

	header > img,
	.empty-img {
		min-width: 13rem;
		min-height: 13rem;
		max-height: 13rem;
		background-color: lightgray;
		filter: grayscale();
	}

	.header-text > * + * {
		margin-top: 1rem;
	}

	header p {
		width: 100%;
		line-height: 1.5rem;
	}

	header h1 {
		margin-top: 0.5rem;
		font-size: 1.5rem;
	}

	.short-description {
		font-style: italic;
		font-size: 1rem;
	}

	.meta-list > * + * {
		margin-top: 0.7rem;
	}

	.meta {
		display: flex;
		flex-direction: row;
		font-size: 0.9rem;
		align-items: baseline;
		gap: 1rem;
		filter: opacity(0.8);
	}
	.meta > span {
		display: block;
		font-family: var(--ff-mono);
		color: var(--clr-accent);
		font-weight: 300;
		font-size: 0.85rem;
	}

	.meta > ul {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.6rem;
	}

	.meta > ul > li {
		width: fit-content;
	}

	.meta > ul > li:not(:last-child)::after {
		content: ', ';
	}
</style>
