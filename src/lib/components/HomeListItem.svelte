<script lang="ts">
	export let href: string;
</script>

<li class="home-list-item">
	<a {href}>
		<article>
			<header>
				<!-- contains span.document-tag -->
				<slot name="document-tag" />

				<!-- contains h1.card-item-title -->
				<slot name="title" />
			</header>

			<div class="article-content">
				<!-- contains h1.card-date -->
				<slot name="date" />

				<!-- contains span.card-time -->
				<slot name="time" />

				<!-- contains p.card-item-description -->
				<slot name="description" />
			</div>
		</article>
	</a>
</li>

<style>
	:global(.home-list-item) {
		--card-main-padding: 0.7rem;
		--card-content-padding: 0.5rem;
	}

	li {
		min-width: 10rem;
		position: relative;
	}

	li:hover {
		cursor: pointer;
	}

	li:hover::after {
		position: absolute;
		content: '';
		width: calc(100% + 1rem);
		height: calc(100% + 1rem);
		top: -0.2rem;
		left: -0.5rem;
		cursor: pointer;
		background-color: var(--clr-accent-light);
		z-index: -1;
	}

	article {
		position: relative;
	}

	article > * + * {
		margin-top: var(--card-main-padding);
	}

	:global(.article-content > * + *) {
		margin-top: var(--card-content-padding);
	}

	header {
		padding-bottom: var(--card-main-padding);
		border-bottom: solid 0.5px lightgrey;
	}
	:global(.home-list-item header > * + *) {
		margin-top: var(--card-content-padding);
	}
</style>
