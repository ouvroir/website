<script lang="ts">
	import { t } from '$i18n/i18n';
	import Vr from '$lib/components/logos/Vr.svelte';
	import Venn from '$lib/components/logos/Venn.svelte';
	import Calendar from '$lib/components/logos/Calendar.svelte';
	import { fade } from 'svelte/transition';
	import { base } from '$app/paths';

	export let data;

	const events = [...data.events];
	const posts = data.posts;
	const projects = data.projects.slice(0, 5);
	const bigProject = projects.pop();
</script>

<section class="news-wrapper" in:fade={{ delay: 0, duration: 1000 }}>
	<header class="section-header">
		<h1 class="section-title">Latest news</h1>
		<div class="header-separator" />
		<a href={$t('route.news')}>Toute l’actualité</a>
	</header>

	<ul class="news">
		{#each events as e}
			<li class="news-li addhover">
				<article class="news-content">
					<span class="document-tag">Event</span>
					<h1>{e.meta.dateStart.split('T')[0]}</h1>
					<p class="news-content-infos">{e.meta.timeStart} - {e.meta.timeEnd} @ {e.meta.place}</p>
					<h2>{e.meta.title}</h2>
				</article>
			</li>
		{/each}
	</ul>
</section>

<section class="projects-wrapper" in:fade={{ delay: 500, duration: 1000 }}>
	<header class="section-header">
		<h1 class="section-title">Highlighted projects</h1>
		<div class="header-separator" />
		<a href={$t('route.projects')}>Tous les projets</a>
	</header>

	<article class={`project bg`}>
		<img src={`${base}/sample1.jpg`} alt="" />
		<div class="project-content">
			<h1 class="project-title">{bigProject.meta.title}</h1>
			<p class="project-description">{bigProject.meta.description}</p>
		</div>
	</article>

	<ul class="projects">
		{#each projects as p, i}
			<li>
				<article class="project sm addhover">
					<h1 class="project-title">{p.meta.title}</h1>
					<p class="project-description">{p.meta.description}</p>
				</article>
			</li>
		{/each}
	</ul>
</section>

<div class="separator" />

<section class="services-wrapper" id="services">
	<h1>
		En soutient aux communautés étudiantes et professorales de l'Université de Montréal, l’Ouvroir
		offre plusieurs services
	</h1>

	<ul class="services-list">
		<li class="services-li">
			<span class="services-logo-container">
				<Vr />
			</span>
			<h2>Prêt de matériel</h2>
			<p>
				L’ouvroir met à disposition de l'équipement de pointe pour la numérisation, l’enregistrement
				audio-visuel et le travail collaboratif.
			</p>
			<a href={$t('route.services.equipement')}>Voir tout l’équipement disponible</a>
		</li>
		<li class="services-li">
			<span class="services-logo-container">
				<Calendar />
			</span>
			<h2>Réservation de salle</h2>
			<p>Des locaux sont à disposition pour le travail individuel ou en groupe.</p>
			<a href={$t('route.services.reservation')}>Réserver une salle</a>
		</li>
		<li class="services-li">
			<span class="services-logo-container">
				<Venn />
			</span>
			<h2>Rencontres</h2>
			<p>
				De nombreux événements sont organisés pour vous aider le travail en environnements
				numériques.
			</p>
			<a href={$t('route.services.meetups')}>Nous rencontrer</a>
		</li>
	</ul>
</section>

<style>
	section a {
		color: orangered;
		font-weight: 300;
	}
	.separator {
		grid-column: 3 /-3;
		border-bottom: solid 0.5px transparent;
		margin-top: 6rem;
	}

	/** Services*/

	.services-wrapper {
		grid-column: 1 / -1;
		position: relative;
		/* margin-top: 3rem; */
		margin-bottom: 7rem;
		line-height: 3rem;
		font-weight: 300;
	}

	/* .services-wrapper::after {
		content: '';
		position: absolute;
		top: -25%;
		left: -25%;
		width: 150%;
		height: 150%;
		background-color: rgba(137, 43, 226, 0.4);
		z-index: -1;
	} */

	.services-wrapper > h1 {
		font-size: 2.5rem;
		margin-bottom: 2rem;
		/* text-justify: center; */
		width: 100%;
		padding: 3rem 10rem;
	}

	.services-list {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		padding: 0 3rem;
	}

	.services-li {
		max-width: 30%;
		/* width: 35%; */
	}

	.services-li:nth-child(2) {
		margin: 0 auto;
	}

	.services-li h2 {
		font-size: 1.5rem;
		font-weight: 300;
		text-align: center;
	}

	.services-li p {
		font-size: 1.1rem;
		font-weight: 400;
		line-height: 2rem;
	}

	.services-li a {
		color: orangered;
	}

	.services-logo-container {
		display: flex;
		flex-direction: row;
		width: 4rem;
		margin: auto;
		height: 6rem;
		align-items: end;
		margin-bottom: 1rem;
	}

	/** News */

	.section-header {
		display: flex;
		flex-direction: row;
		align-items: baseline;
	}

	/* .section-header > *:first-child {
		margin-left: auto;
	}

	.section-header > *:last-child {
		margin-right: auto;
	} */

	.header-separator {
		position: relative;
		top: 0.3rem;
		border-right: solid 1px orangered;
		height: 1.5rem;
		width: fit-content;
		margin: 0 0.8rem;
	}

	.news-wrapper {
		grid-column: 1 / -1;
		margin-top: 4rem;
		position: relative;
		margin-bottom: 3rem;
	}

	.news {
		display: flex;
		flex-direction: row;
		gap: 4rem;
	}

	.news-li {
		position: relative;
	}

	.section-title {
		/* color: orangered; */
		font-weight: 300;
		font-size: 2rem;
		width: fit-content;

		margin-bottom: 3rem;
	}

	.news-content {
		position: relative;
	}

	.news-content > * + * {
		margin-top: 0.4rem;
	}

	.news-content:hover {
		cursor: pointer;
	}

	.addhover:hover::after {
		position: absolute;
		content: '';
		width: calc(100% + 1rem);
		height: calc(100% + 1rem);
		top: -0.2rem;
		left: -0.5rem;
		cursor: pointer;
		background-color: rgba(211, 211, 211, 0.3);
		z-index: -1;
	}
	.news-content-infos {
		font-size: 0.9rem;
		font-weight: 300;
		margin-top: 0.2rem;
		color: orangered;
	}

	.document-tag {
		display: block;
		padding-bottom: 0.5rem;
	}

	.news-content > h1 {
		font-size: 1.5rem;
		/* color: orangered; */
		font-weight: 400;
		/* text-decoration: underline 0.2rem orangered; */
	}

	.news-content > h2 {
		font-weight: 400;
		line-height: 1.4rem;
		border-top: solid 0.5px rgba(0, 0, 0, 0.2);
		/* border-top: solid 0.5px orangered; */
		padding-top: 0.6rem;
	}

	.projects-wrapper {
		display: contents;
	}

	.projects-wrapper > .section-header {
		grid-column: 1 / -2;
		margin-top: 5rem;
	}
	.projects-wrapper > .section-header h1 {
		/* margin-top: 6rem; */
		margin-bottom: 5rem;
	}

	.projects {
		grid-column: span 4;
		columns: 2;
		margin-bottom: 3rem;
	}

	.project {
		position: relative;
		margin-bottom: 2rem;
		grid-column: span 2;
	}
	.project:hover {
		cursor: pointer;
	}

	.project > img {
		position: absolute;
		width: 100%;
		min-height: 25vh;
		object-fit: cover;
		z-index: -1;
		filter: grayscale();
	}

	.project-content {
		background-color: rgb(38, 38, 38, 0.7);
		color: white;
		padding: 1rem;
	}

	.project-title {
		font-size: 1.5rem;
		font-weight: 400;
		line-height: 2rem;
	}

	.project-description {
		line-height: 1.5rem;
	}

	.sm {
		padding: 0.5rem 1rem;
	}

	/* .sm:hover {
		background-color: rgba(211, 211, 211, 0.474);
	} */

	.bg {
		position: relative;
		grid-column: span 4;
		grid-row: span 2;
		height: 50vh !important;
		margin-right: 2rem;
	}

	.project-content > h1 {
		font-size: 2.5rem;
	}
</style>
