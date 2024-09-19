<script lang="ts">
	import { page } from '$app/stores';
	import { screenType, aboutPageTitle } from '$lib/stores.js';
	import { Tree } from '$lib/components';

	$: smallScreen = $screenType === 'mobile' || $screenType === 'tablet-vertical';
	// $: section = $page.route.id?.match(/\/\[(\w+)=\1\]/)?.[1];

	function scrollToElementWithOffset(element: HTMLElement, offset: number) {
		const elementPosition = element.getBoundingClientRect().top + window.scrollY;
		const offsetPosition = elementPosition + offset;

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth'
		});
	}

	function wrapContentBetweenH2s(node: HTMLDivElement) {
		const h2Elements = node.querySelectorAll('h2');
		const article = node.querySelector('article');

		h2Elements.forEach((h2, index) => {
			const nextH2 = h2Elements[index + 1];
			const div = document.createElement('div');
			const section = document.createElement('section');
			div.classList.add('section-content', 'closed');

			let sibling = h2.nextElementSibling;
			while (sibling && sibling !== nextH2) {
				const nextSibling = sibling.nextElementSibling;
				div.appendChild(sibling);
				sibling = nextSibling;
			}

			const headerBtn = document.createElement('button');
			const btnIcon = document.createElement('i');
			headerBtn.classList.add('section-header');
			btnIcon.classList.add('bx', 'bx-plus');
			headerBtn.addEventListener('click', () => {
				div.classList.toggle('closed');
				div.classList.toggle('opened');

				document.querySelectorAll('.section-content').forEach((section) => {
					if (section !== div) {
						section.classList.remove('opened');
						section.classList.add('closed');
					}
				});

				btnIcon.classList.toggle('bx-plus');
				btnIcon.classList.toggle('bx-minus');

				if (div.classList.contains('opened')) {
					scrollToElementWithOffset(section, -48);
				}
			});

			headerBtn.appendChild(h2);
			headerBtn.appendChild(btnIcon);

			section.appendChild(headerBtn);
			section.appendChild(div);

			article.insertBefore(section, nextH2);
		});
	}
</script>

<section class="info-page">
	<header>
		<h1>{$aboutPageTitle}</h1>
	</header>

	{#if !smallScreen}
		<div class="about-tree-container">
			<Tree />
		</div>
	{/if}

	<div id="article-container" class="article-content" use:wrapContentBetweenH2s>
		<slot />
	</div>
</section>

<div class="grid-empty-row" />

<style>
	.info-page {
		grid-column: full;
		display: grid;
		grid-template-columns: subgrid;
		margin: var(--content-top-padding) 0;
	}

	header {
		grid-column: content-start / popout-end;
	}

	.article-content {
		grid-column: content-start / popout-end;
		font-size: 1.1rem;
	}

	h1 {
		font-size: var(--fs-700);
		padding-bottom: var(--padding-title);
		color: var(--clr-b);
		font-weight: 700;
	}

	.bigger {
		grid-column: 3/-2;
	}
	.dropdown-nav {
		grid-column: 1/-1;
		height: 2rem;
		margin-bottom: 2rem;
	}

	.about-tree-container {
		position: sticky;
		grid-column: feature-start / content-start;
		grid-row: 2;
		top: 4rem;
		height: fit-content;
	}

	/** Small screens */
	@media screen and (max-width: 820px) {
		.info-page-header {
			grid-column: 1/-1 !important;
		}
		.info-page-header > h1 {
			padding-bottom: 2rem;
		}
		.article-content {
			grid-column: 1/-1;
			grid-row: 3;
		}
	}
	@media screen and (min-width: 481px) and (max-width: 820px) {
		.dropdown-nav {
			width: 40%;
		}
	}
</style>
