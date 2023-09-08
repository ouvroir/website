<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/i18n/i18n.js';
	import { screenType } from '$lib/stores.js';
	export let data;

	$: post = data.post;

	const smallScreen = $screenType === 'mobile' || $screenType === 'tablet-vertical';

	function scrollToTarget(event: MouseEvent) {
		event.preventDefault();
		const targetId = (event.target as HTMLElement).getAttribute('href');
		const targetElement = document.querySelector(targetId);
		const offset = 150; // set your desired offset here
		const top = targetElement.getBoundingClientRect().top + window.scrollY - offset;
		window.scrollTo({ top, behavior: 'smooth' });
	}

	onMount(() => {
		if (post?.meta.type !== 'blog' || smallScreen) return;
		const doc = document.querySelector('.text-body');
		const headings = doc.querySelectorAll('h2, h3, h4');
		const nav = document.querySelector('.toc');

		if (!nav || !doc || !headings) return;

		headings.forEach((heading) => {
			if (!heading.textContent) return;

			heading.id = heading.textContent
				.toLowerCase()
				.replace(/ /g, '-')
				.replace(/[^\w-]+/g, '');

			const li = document.createElement('li');
			const a = document.createElement('a');

			a.href = `#${heading.id}`;
			a.classList.add('toc-link');
			a.textContent = heading.textContent;
			a.addEventListener('click', scrollToTarget);

			li.appendChild(a);
			nav?.appendChild(li);
		});

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry, index) => {
					const id = entry.target.getAttribute('id');
					const navLink = nav.querySelector(`.toc a[href="#${id}"]`);
					if (navLink && id && entry.isIntersecting) {
						nav.querySelectorAll('.toc-link').forEach((l) => l.classList.remove('toc-active'));
						navLink.classList.add('toc-active');
					}
				});
			},
			{
				rootMargin: '25% 0% -75% 0%',
				threshold: 0
			}
		);

		headings.forEach((heading) => {
			observer.observe(heading);
		});
	});
</script>

{#if post && post.meta.type === 'blog' && !smallScreen}
	<div class="toc-container">
		<nav class="toc"></nav>
	</div>
{/if}

{#if post && post.meta.type === 'event' && !smallScreen}
	<aside class="aside-left">
		<div class="meta-left">
			<p class="date">
				{post.meta.dateStart.split('T')[0]}
			</p>
			<p class="time-place">{post.meta.timeStart} - {post.meta.timeStart} @ {post.meta.place}</p>
		</div>
		<div class="meta-left">
			<span class="label">{$t('news.summary')}</span>
			<p class="description">{post?.meta.description}</p>
		</div>
		<div class="meta-left">
			<span class="label">{$t('news.speaker')}</span>
			{#if Array.isArray(post.meta.participants)}
				<ul class="participants-ul">
					{#each post?.meta.participants as p, i}
						<li class="participant">{p}{i === post.meta.participants.length - 1 ? '' : ', '}</li>
					{/each}
				</ul>
			{:else}
				<p class="participant">{post?.meta.participants.join(',')}</p>
			{/if}
		</div>
		<div class="meta-left">
			<a class="register" href={post?.meta.link}>{$t('news.register')}</a>
		</div>
	</aside>
{/if}

<article>
	<header>
		<h1>
			{#if post && post.meta.type === 'meeting'}
				{post?.meta.date.split('T')[0]}
			{:else}
				{post?.meta.title}
			{/if}
		</h1>
	</header>
	<div class="text-body">
		{@html post?.html}
	</div>
</article>

{#if post && post.meta.type === 'blog'}
	<aside class="aside-right">
		<div class="meta">
			<div>
				<span class="author">{post?.meta.author}</span> |
				<span>{post?.meta.date.split('T')[0]}</span>
			</div>
			<p class="project-description">{post?.meta.description}</p>
		</div>
	</aside>
{/if}

<style>
	article,
	header {
		display: contents;
	}
	.text-body {
		grid-column: 3/7;
		grid-row: 2/5;
		font-size: 1.1rem;
		/* padding-right: 1rem; */
	}

	.aside-right {
		display: contents;
	}

	h1 {
		grid-column: 3/-1;
		grid-row: 1;
		font-size: 2.5rem;
		padding-bottom: 4rem;
	}

	.toc-container {
		position: sticky;
		grid-column: 1/3;
		grid-row: 2/5;
		height: fit-content;
		top: 10rem;
		bottom: 10rem;
		z-index: 0;
	}

	.toc {
		width: 90%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: start;
		min-height: 10rem;
		padding: 1rem 1rem;
		color: rgba(0, 0, 0, 0.584);
		background-color: rgba(211, 211, 211, 0.2);
		list-style: none;
		font-size: 0.9rem;
		font-weight: 400;
	}

	.aside-right > .meta {
		grid-column: 7/9;
		grid-row: 2;
		/* padding-left: 2rem;
		padding-right: 2rem;*/
		margin-bottom: 2rem;
		padding: 0rem 1rem;
		margin-left: 1rem;
		/* background-color: rgba(211, 211, 211, 0.2); */
	}

	.aside-left {
		position: sticky;
		height: fit-content;
		top: 12rem;
		bottom: 8rem;
		grid-row: 2;
		grid-column: span 2;
		/* padding-top: 1.5rem; */
		width: 90%;
		border-top: solid 0.5px rgba(255, 68, 0, 0.461);
	}

	.aside-left > * + * {
		margin-top: 1.5rem;
	}

	.meta-left > .date {
		color: orangered;
		font-size: 1rem;
		font-weight: 300;
		margin-bottom: 0.5rem;
		margin-top: 1.5rem;
	}
	.meta-left .label {
		display: block;
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	.meta-left .description {
		line-height: 1.2rem;
		font-weight: 300;
	}

	.participants-ul {
		display: flex;
		flex-direction: row;
		column-gap: 0.5rem;
		row-gap: 0.2rem;
		flex-wrap: wrap;
	}
	.participant {
		font-weight: 300;
		min-width: max-content;
	}

	.aside-left a {
		color: orangered;
	}
	.aside-left a:hover {
		text-decoration: underline orangered;
	}

	.author {
		color: orangered;
	}

	.project-description {
		grid-column: 1/3;
		/* max-height: fit-content; */
		grid-row: 2;
		font-size: 0.9rem;
	}

	/** Mobile */
	@media screen and (max-width: 820px) {
		header {
			display: block;
			grid-column: 1/-1;
		}

		h1 {
			margin-top: 1rem;
			padding-bottom: 3rem;
		}

		.text-body {
			grid-column: 1/-1;
			grid-row: 3;
		}

		.aside-right {
			display: block;
			grid-column: 1/-1;
		}
		.aside-right > .meta {
			padding: 0;
			margin-left: 0;
		}
	}

	@media screen and (min-width: 481px) and (max-width: 820px) {
		.text-body,
		.project-description {
			width: 85%;
		}
	}
</style>
