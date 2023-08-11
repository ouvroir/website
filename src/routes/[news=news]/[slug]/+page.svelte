<script lang="ts">
	import { onMount } from 'svelte';

	export let data;

	const { post } = data;

	function scrollToTarget(event: MouseEvent) {
		event.preventDefault();
		const targetId = (event.target as HTMLElement).getAttribute('href');
		const targetElement = document.querySelector(targetId);
		const offset = 150; // set your desired offset here
		const top = targetElement.getBoundingClientRect().top + window.scrollY - offset;
		window.scrollTo({ top, behavior: 'smooth' });
	}

	onMount(() => {
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

<div class="toc-container">
	<nav class="toc"></nav>
</div>

<h1>{post?.meta.title}</h1>

<article class="text-body">
	{@html post?.html}
</article>

<aside class="aside">
	<div class="meta">
		<div>
			<span class="author">{post?.meta.author}</span> | <span>{post?.meta.date.split('T')[0]}</span>
		</div>
		<p class="project-description">{post?.meta.description}</p>
	</div>
</aside>

<style>
	article {
		grid-column: 3/7;
		grid-row: 2/5;
		font-size: 1.1rem;
		/* padding-right: 1rem; */
	}

	aside {
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
		position: sticky;
		position: -webkit-sticky;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: start;
		min-height: 10rem;
		padding: 1rem 1rem;
		color: rgba(0, 0, 0, 0.584);
		background-color: rgba(211, 211, 211, 0.2);
		position: sticky;
		list-style: none;
		font-size: 0.9rem;
		font-weight: 400;
	}

	aside > .meta {
		grid-column: 7/9;
		grid-row: 2;
		/* padding-left: 2rem;
		padding-right: 2rem;*/
		margin-bottom: 2rem;
		padding: 0rem 1rem;
		margin-left: 1rem;
		/* background-color: rgba(211, 211, 211, 0.2); */
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
</style>
