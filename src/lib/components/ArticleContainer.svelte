<article>
	<slot />
</article>

<style>
	article {
		grid-column: full;
		display: grid;
		grid-template-columns: subgrid;
		padding-bottom: var(--content-bottom-padding);
	}

	/** Small screens */
	@media screen and (max-width: 820px) {
		article {
			grid-column: 1/-1;
		}
	}
</style>
