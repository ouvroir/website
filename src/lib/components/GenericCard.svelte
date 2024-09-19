<script lang="ts">
	import type { Blog, Event, Resource, Project, Meeting } from '$lib/types';
	import { dateToLocalizedString, t } from '$i18n/i18n';
	import { Tag } from '$components';

	export let content: Blog | Event | Resource | Project;
	export let contrast = false;
	export let hideType = false;

	let date: string, dateLabel: string;
	let tags: string[];

	switch (content.meta.kind) {
		case 'blog':
			date = $dateToLocalizedString(content.meta.date);
			dateLabel = $t('card.publishedOn');
			tags = content.meta.tags;
			break;
		case 'event':
			date = $dateToLocalizedString(content.meta.dateStart);
			dateLabel = $t('card.happeningOn');
			tags = content.meta.participants;
			break;
		case 'resource':
			date = $dateToLocalizedString(content.meta.dateCreated);
			dateLabel = $t('card.updatedOn');
			tags = content.meta.tags;
			break;
		case 'meeting':
			date = $dateToLocalizedString(content.meta.date);
			dateLabel = $t('card.heldOn');
			tags = content.meta.tags;
			break;
		case 'project':
			date = $dateToLocalizedString(content.meta.dateStart);
			dateLabel = $t('card.startedOn');
			tags = content.meta.tags;
			break;
		default:
			date = '';
	}

	let authors = '';
	if (content.meta.kind === 'resource') {
		authors = content.meta.contributors.join(', ');
	} else {
		authors = content.meta.author;
	}
	authors = authors ? authors : 'Ouvroir';

	$: hover = false;
	const onHover = (e: MouseEvent) => {
		e.type === 'mouseover' ? (hover = true) : (hover = false);
	};

	$: console.log(hover);
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<li
	class={`card-generic ${contrast ? 'contrast' : ''}`}
	on:mouseover={onHover}
	on:mouseleave={onHover}
>
	{#if !hideType}
		<Tag tag={content.meta.kind} contrast="b" bind:alt={hover} size="s" />
	{/if}
	<a href={`/projets/${content.meta.slug}`}>
		<h2>{content.meta.title}</h2>

		<div class="meta">
			<div class="meta-date">
				<p>{dateLabel} {date}</p>
			</div>
			<span>|</span>
			<div>
				<p class="author">{authors}</p>
			</div>
		</div>

		<p class="description">{content.meta.description}</p>
	</a>
	{#if tags.length > 0}
		{#if content.meta.kind === 'event'}
			<h3>{$t('card.speaker')}</h3>
		{:else}
			<h3>{$t('card.topic')}</h3>
		{/if}
		<ul class="card-tags">
			{#each tags as tag}
				<li>
					<Tag {tag} bind:alt={hover} contrast="a" size="s" />
				</li>
			{/each}
		</ul>
	{/if}
</li>

<style>
	.card-generic {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		break-inside: avoid;
		border-radius: var(--border-radius);
		padding: 1.5rem 1rem;
		/* margin-bottom: 2rem; */
		transition: all 0.1s ease-in;

		& a > * {
			color: var(--clr-b);
			transition: color 0.1s ease-in;
		}

		& a > * + * {
			margin-top: 0.7rem;
		}

		& h3 {
			font-weight: 600;
			margin-top: 0.5rem;
		}

		& + .card-generic {
			margin-top: 2rem;
		}
	}

	.card-generic:hover {
		/* box-shadow: 2px 2px 1.5rem var(--clr-b); */
		background-color: var(--clr-b);
	}

	.card-generic:hover *:not(.tag) {
		color: var(--clr-a);
	}
	.card-generic:hover *:not(.tag) {
		color: var(--clr-a);
	}

	a {
		text-decoration: none;
		cursor: pointer;
	}

	h2 {
		--fs: var(--fs-400);
		font-size: var(--fs);
		font-weight: 700;
		line-height: calc(var(--fs) * var(--lh-ratio-s));
		margin-bottom: 1rem;
	}

	.description {
		--fs: var(--fs-300);
		font-size: var(--fs);
		line-height: calc(var(--fs) * var(--lh-ratio-s));
		font-weight: 400;
	}

	.meta {
		display: flex;
		flex-direction: row;
		gap: 0.3rem;
	}
	.meta-date {
		display: flex;
		flex-direction: row;
		font-size: var(--fs-200);
		font-weight: 700;
	}
</style>
