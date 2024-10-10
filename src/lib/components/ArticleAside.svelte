<script lang="ts">
	import { t, dateToLocalizedString } from '$i18n/i18n';
	import { MemberLink, Tree } from '$components';
	import type { Blog, Event, Resource, Project, Meeting } from '$lib/types';

	export let content: Blog | Event | Resource | Project | Meeting;
</script>

<aside class="infos">
	{#if content.meta.kind === 'project'}
		<div class="info">
			<span>{$t('projects.infos.description')}</span>
			<p>{content.meta?.description}</p>
		</div>

		<div class="info" id="links">
			<span>{$t('projects.infos.otherLinks')}</span>
			{#if content.meta.projectLink}
				<p>
					<i class="bx bx-link"></i>
					<a rel="external" href={content.meta.projectLink}>{$t('projects.infos.page')}</a>
				</p>
			{/if}
			{#if content.meta.github}
				<p>
					<i class="bx bxl-github"></i>
					<a rel="external" href={content.meta.github}>{$t('projects.infos.github')}</a>
				</p>
			{/if}
			{#if content.meta.otherLinks.length > 0}
				<div>
					<p id="ext-ressources">
						<i class="bx bx-link-external"></i>
						Autres ressources externes
					</p>
					<ul>
						{#each content.meta.otherLinks as l}
							<li>
								<a rel="external" href={l}>{l}</a>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
		<div class="info">
			<span>{$t('projects.infos.team')}</span>
			<ul class="team-members">
				{#each content.meta.team as t}
					<MemberLink username={t} />
				{/each}
			</ul>
		</div>
		<div class="info">
			<span>{$t('projects.infos.started')}</span>
			<p>{$dateToLocalizedString(content.meta?.since)}</p>
		</div>
		<div class="info">
			<span>{$t('projects.infos.status')}</span>
			<p>ongoing</p>
		</div>
		<div class="info">
			<span>{$t('projects.infos.pm')}</span>
			<p>{content.meta?.lead}</p>
		</div>
		<div class="info">
			<span>tags</span>
			<ul class="tags">
				{#each content.meta.tags as t}
					<li>{t}</li>
				{/each}
			</ul>
		</div>
	{:else if content.meta.kind === 'blog'}
		<div>
			<span class="author">{content.meta.author}</span> |
			<span>{$dateToLocalizedString(content.meta.date)}</span>
		</div>
		<p class="project-description">{content.meta.description}</p>
		<div class="news-tree-container">
			<Tree />
		</div>
	{:else if content.meta.kind === 'event'}
		<div class="info">
			<p class="date">
				{$dateToLocalizedString(content.meta.dateStart)}
			</p>
			<p class="time-place">
				{content.meta.timeStart} - {content.meta.timeEnd} @ {content.meta.place}
			</p>
		</div>
		<div class="info">
			<span class="label">{$t('news.summary')}</span>
			<p class="description">{content.meta.description}</p>
		</div>
		<div class="info">
			<span class="label">{$t('news.speaker')}</span>
			{#if Array.isArray(content.meta.participants)}
				<ul class="participants-ul">
					{#each content.meta.participants as p, i}
						<li class="participant">{p}{i === content.meta.participants.length - 1 ? '' : ', '}</li>
					{/each}
				</ul>
			{:else}
				<p class="participant">{content.meta.participants.join(',')}</p>
			{/if}
		</div>
		<div class="info">
			<a class="register" href={content.meta.link}>{$t('news.register')}</a>
		</div>
	{:else if content.meta.kind === 'resource'}
		<p class="project-description">{content.meta.description}</p>
		<div>
			<div class="info">
				<span class="attr">{$t('resources.dateCreated')}</span>
				<p>{$dateToLocalizedString(content.meta.dateCreated)}</p>
			</div>
			<div class="info">
				<span class="attr">{$t('resources.dateUpdated')}</span>
				<p>{$dateToLocalizedString(content.meta.dateUpdated)}</p>
			</div>
			<div class="info">
				<span class="attr">{$t('resources.contributors')}</span>
				<ul>
					{#each content.meta.contributors as c}
						<li>{c}</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}
</aside>

<style>
	.infos {
		margin-top: 0.5rem;
		grid-column: feature-start / content-start;
		max-width: 90%;
		color: var(--clr-b);
		display: flex;
		flex-direction: column;
		gap: 3rem;
		flex-wrap: wrap;
		row-gap: 2rem;
	}

	.info {
		max-width: 90%;

		& * {
			line-height: 1.5rem;
		}

		& ul {
			display: flex;
			flex-direction: column;
			flex-wrap: wrap;
			gap: 0.2rem;
		}

		& span {
			letter-spacing: 0.05rem;
		}

		& .date,
		& .time-place {
			font-weight: 600;
			font-size: var(--fs-300);
			line-height: 1.8rem;
		}
	}

	#links {
		& * + * {
			margin-top: 0.3rem;
		}
		& a {
			font-weight: 400 !important;
			color: var(--clr-b);
		}
		& span {
			font-weight: 700;
		}
		& li {
			font-size: var(--fs-100);
			padding-left: 1.5rem;
			& a {
				text-wrap: balance;
			}
		}
	}
	span {
		display: block;
		color: var(--clr-b);
		font-weight: 700;
		text-transform: uppercase;
		/* margin-bottom: 0.6rem; */
		font-size: 0.9rem;
	}
</style>
