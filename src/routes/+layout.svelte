<script lang="ts">
	export const prerender = true;

	import Nav from '$lib/components/Nav.svelte';
</script>

<header>
	<div class="header-container">
		<h1>Ouvroir</h1>
		<h2>d’histoire de l’art et de muséologie numériques</h2>
		<p>
			L’Ouvroir d’histoire de l’art et de muséologie numérique de l’Université de Montréal, est un
			laboratoire de recherche destiné à soutenir le travail conduit dans le cadre du Partenariat «
			Des nouveaux usages des collections dans les musées d’art » <a href="http://www.cieco.co/"
				><abbr>CIÉCO</abbr></a
			>.
		</p>
	</div>
</header>

<main>
	<header>
		<Nav />
	</header>
	<slot />
</main>

<footer />
