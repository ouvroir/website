<script lang="ts">
	import { t } from '$i18n/i18n';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
</script>

<section>
	<div class="bg-container">
		<div class="section-bg" />
	</div>
	<h1>Highlighted projects</h1>
	<ProjectCard size="big" img="/sample1.jpg" />
	<ProjectCard size="small" img="/sample3.png" />
	<ProjectCard size="small" img="/sample1.jpg" />
	<p>Voir tous les projets</p>
</section>

<style>
	section {
		display: contents;
	}

	.bg-container {
		grid-column: 1/-1;
		position: relative;
		left: 0;
	}

	.section-bg {
		position: absolute;
		width: 120vw;
		height: 140vh;
		left: -4rem;
		background-color: rgb(38, 38, 38);
		z-index: -1;
		overflow: hidden;
	}
	h1 {
		font-size: 3rem;
		grid-column: 1/-1;
		padding-bottom: 2rem;
		padding-top: 2rem;
		color: lightgray;
		font-weight: 600;
	}

	p {
		position: relative;
		grid-column: span 3;
		color: lightgrey;
		text-decoration: underline 0.2rem var(--clr-accent);
		font-size: 1.6rem;
		bottom: 5rem;
	}
</style>
