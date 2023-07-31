<section>
	<h1>Latest news</h1>
	<article class="card">
		<h1>2023.07.22</h1>
		<h2>Titre de l'événement</h2>
		<p>description de l'événement</p>
	</article>
	<article class="card">
		<h1>2023.07.22</h1>
		<h2>Titre de l'événement</h2>
		<p>description de l'événement</p>
	</article>
	<article class="card">
		<h1>2023.07.22</h1>
		<h2>Titre de l'événement</h2>
		<p>description de l'événement</p>
	</article>
</section>

<style>
	section {
		display: contents;
	}
	h1 {
		font-size: 3rem;
		grid-column: span 2;
		visibility: visible;
	}
	.card {
		grid-column: span 2;
	}
	.card > * + * {
		margin-top: 0.5rem;
	}
</style>
