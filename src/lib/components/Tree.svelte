<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let empty = false;
	let treeUL: HTMLUListElement;

	const scrollToTarget = (event: MouseEvent) => {
		event.preventDefault();

		const targetId = (event.target as HTMLElement).getAttribute('href')!;
		const targetElement = document.querySelector(targetId)!;
		const offset = 140;
		const top = targetElement.getBoundingClientRect().top + window.scrollY - offset;

		window.scrollTo({ top, behavior: 'smooth' });

		const element = document.querySelector(`article ${targetId}`)?.parentNode as HTMLElement;
		const sectionContent =
			element.tagName === 'BUTTON'
				? (element.nextElementSibling as HTMLElement)
				: (element as HTMLElement);

		if (sectionContent.classList.contains('closed')) {
			sectionContent.classList.remove('closed');
			sectionContent.classList.add('opened');
		}

		const sections = document.querySelectorAll('.section-content');
		sections.forEach((section) => {
			if (section !== sectionContent) {
				section.classList.remove('opened');
				section.classList.add('closed');
			}
		});
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
				rootMargin: '0% 0% -80% 0%',
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

			if (treeUL)
				Array.from(treeUL.querySelectorAll('li')).length === 0 ? (empty = true) : (empty = false);
		});
	});
</script>

<nav id="tree-container" class={`${empty ? 'hide' : ''}`}>
	<ul bind:this={treeUL} id="tree"></ul>
</nav>

<style>
	#tree-container {
		height: fit-content;
	}

	#tree {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: start;
		min-height: 10rem;
		list-style: none;
	}

	.toc-h2 {
		font-size: var(--fs-200);
	}

	.hide {
		visibility: hidden;
	}
</style>
