<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const scrollToTarget = (event: MouseEvent) => {
		event.preventDefault();
		const targetId = (event.target as HTMLElement).getAttribute('href')!;
		const targetElement = document.querySelector(targetId)!;
		const offset = 150;
		const top = targetElement.getBoundingClientRect().top + window.scrollY - offset;
		window.scrollTo({ top, behavior: 'smooth' });
	};

	const toggleActive = (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		target.classList.add('toc-active');

		document.querySelectorAll('.toc-link').forEach((link) => {
			if (link !== target) link.classList.remove('toc-active');
		});
	};

	const generateTOC = (targetDoc: HTMLElement | null) => {
		if (!targetDoc) return;

		const prevHeadings = document.querySelectorAll('#tree li');
		prevHeadings.forEach((heading) => heading.remove());

		const headings = targetDoc.querySelectorAll('h2, h3');
		const tree = document.querySelector('#tree');

		if (!tree || !headings) return;

		headings.forEach((heading) => {
			if (!heading.textContent) return;

			heading.id = heading.textContent
				.toLowerCase()
				.replace(/ /g, '-')
				.replace(/[^\w-]+/g, '');

			const a = document.createElement('a');
			a.href = `#${heading.id}`;
			a.classList.add('toc-link');
			a.textContent = heading.textContent;
			a.addEventListener('click', scrollToTarget);

			const li = document.createElement('li');
			li.classList.add(heading.tagName === 'H2' ? 'toc-h2' : 'toc-h3');
			li.appendChild(a);
			li.addEventListener('click', toggleActive);
			tree?.appendChild(li);
		});

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry, index) => {
					const id = entry.target.getAttribute('id');
					const navLink = tree.querySelector(`#tree a[href="#${id}"]`);
					if (navLink && id && entry.isIntersecting) {
						tree.querySelectorAll('.toc-link').forEach((l) => l.classList.remove('toc-active'));
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
	};

	onMount(() => {
		page.subscribe(() => {
			const targetDoc = document.querySelector('.text-body') as HTMLElement;
			if (!targetDoc) return;
			generateTOC(targetDoc);
		});
	});
</script>

<div id="tree-container">
	<ul id="tree"></ul>
</div>

<style>
	#tree-container {
		position: sticky;
		grid-column: 1/3;
		grid-row: 2;
		height: fit-content;
		top: 10rem;
		bottom: 10rem;
		z-index: 0;
	}

	#tree {
		width: 90%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: start;
		min-height: 10rem;
		padding: 1rem 1rem;
		color: rgba(0, 0, 0, 0.584);
		background-color: var(--clr-accent-light);
		list-style: none;
		font-size: 0.9rem;
		font-weight: 400;
	}
</style>
