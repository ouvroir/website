<script lang="ts">
	export let data;

	const { post } = data;
</script>

<div class="toc-container">
	<nav class="toc">
		<h1>Expots - Premières éxplorations</h1>
		<h2>Hello World</h2>
		<h2>Urna condimentum mattis pellentesque id nibh tortor id</h2>
		<h2>At imperdiet dui accumsan sit amet</h2>
	</nav>
</div>

<h1>{post?.meta.title}</h1>

<article>
	{@html post.html}
</article>

<aside class="aside">
	<div class="meta">
		<div>
			<span class="author">{post.meta.author}</span> | <span>{post.meta.date.split('T')[0]}</span>
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
	}

	nav > h1 {
		padding: 0;
		color: rgb(255, 68, 0);
	}
	nav > h2 {
		padding-left: 0.7rem;
	}

	nav > * {
		font-size: 0.8rem;
		/* text-align: left; */
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
