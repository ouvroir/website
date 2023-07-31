<script lang="ts">
	export let size: 'small' | 'medium' | 'big';
	export let img: string;
</script>

<a href="/" class={size}>
	<article>
		<h1>Common</h1>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis cupiditate vel iusto
			reprehenderit. Iste incidunt beatae cupiditate asperiores aliquam sequi esse quaerat rem in?
			Totam a adipisci reiciendis ut nobis.
		</p>
		<i>
			<img src={img} alt="" />
		</i>
	</article>
</a>

<style>
	a {
		--transition: all 0.3s ease-in-out;
		position: relative;
		height: fit-content;
		transition: var(--transition);
	}

	a:hover,
	a:focus {
		background-color: rgba(118, 63, 42, 0.6);
	}

	img {
		position: relative;
		/* width: 100%; */
		width: 100%;
		height: 100%;
		z-index: -1;
		filter: grayscale();
		object-fit: none !important;
	}

	article > p {
		position: absolute;
		padding-left: 1rem;
		margin-top: 5rem;
		color: transparent;
		transition: var(--transition);
		width: 80%;
		font-weight: 500;
	}

	article:hover > p {
		color: white;
	}

	h1 {
		font-size: 3rem;
		color: white;
		visibility: visible;
		font-weight: 400;
		/* z-index: 1; */
		padding: 1rem 0 0.3rem 0rem;
		margin-left: 1rem;
		border-bottom: solid 0.2rem transparent;
		transition: var(--transition);
	}

	article:hover > h1 {
		color: white;
	}

	.big {
		grid-column: span 5;
		grid-row: span 2;
		/* width: 40%; */
	}
	.small {
		grid-column: span 3;
		grid-row: span 1;
		/* width: 15%; */
	}
</style>
