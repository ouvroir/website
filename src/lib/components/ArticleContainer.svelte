<article>
	<slot />
</article>

<style>
	article {
		grid-column: full;
		display: grid;
		grid-template-columns: subgrid;
	}

	/** Small screens */
	@media screen and (max-width: 820px) {
		article {
			grid-column: 1/-1;
		}
	}
</style>
