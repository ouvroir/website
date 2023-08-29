<script lang="ts">
	import { base } from '$app/paths';
	import { t } from '$i18n/i18n';
</script>

<footer>
	<div class="banner-content">
		<section id="contact">
			<h1>Nous trouver</h1>
			<div class="adress">
				<p>Université de Montréal</p>
				<p>Pavillion Lionel-Groulx, local C-8132</p>
				<p>3150 rue Jean-Brillant, Montréal H3T 1N8</p>
			</div>

			<h2>Nous contacter</h2>
			<a href="mailto:ouvroir@umontreal.ca">ouvroir@umontreal.ca</a>
		</section>
		<section id="social">
			<h1>Suivez-nous</h1>
			<ul class="logos">
				<li>
					<a href="https://github.com/ouvroir"
						><img src={`${base}/logos/brands/github.svg`} alt="Logo github" /></a
					>
				</li>
				<li>
					<a href="https://twitter.com/labouvroir"
						><img src={`${base}/logos/brands/twitter.svg`} alt="Logo Twitter" /></a
					>
				</li>
				<li>
					<a href="https://hypothes.is/groups/pM5dq7b4/ouvroir"
						><img src={`${base}/logos/brands/hypothesis.svg`} alt="Logo Hypothesis" /></a
					>
				</li>
				<li>
					<a href="https://hypothes.is/groups/pM5dq7b4/ouvroir"
						><img src={`${base}/logos/brands/element.svg`} alt="Logo Element" /></a
					>
				</li>
				<li>
					<a href="https://www.zotero.org/groups/2480242/ouvroir"
						><img id="zotero" src={`${base}/logos/brands/zotero.svg`} alt="Logo github" /></a
					>
				</li>
			</ul>
			<form action="">
				<label for="newsletter">S’abonner à l’infolettre :</label>
				<div class="input">
					<input type="email" id="newsletter" />
					<button type="submit"><img src={`${base}/logos/paper-plane.svg`} alt="" /></button>
				</div>
			</form>
		</section>

		<section id="about">
			<h1>
				À propos <a href={`${$t('route.about')}/presentation`}
					><img src={`${base}/logos/link-solid.svg`} alt="link logo" /></a
				>
			</h1>
			<a id="cieco" href="https://cieco.umontreal.ca/">
				<img id="cieco" src={`${base}/logos/support/cieco-grey.svg`} alt="Logo CIÉCO" />
			</a>
			<p>
				L’Ouvroir d’histoire de l’art et de muséologie numérique de l’Université de Montréal, est un
				laboratoire de recherche destiné à soutenir le travail conduit dans le cadre du Partenariat
				« <em>Des nouveaux usages des collections dans les musées d’art</em> »
				<a href="https://cieco.umontreal.ca/">CIÉCO</a> dirigé par Johanne Lamoureux.
			</p>
		</section>
		<!-- <section id="credits">
			<p>Ouvroir. An inclusive and open-source space | 2023</p>
		</section> -->
	</div>
</footer>

<style>
	section {
		grid-column: 1/5;
	}

	section > p {
		line-height: 1.5rem;
	}

	#social {
		margin-left: 2rem;
		grid-column: 5/9;
	}

	#about {
		margin-left: 2rem;
		grid-column: 9/-1;
		/* font-weight: 500; */
	}

	#about > p {
		padding-left: 0.7rem;
		border-left: solid 0.3rem orangered;
		width: 65%;
	}
	h1 > a > img:hover {
		cursor: pointer;
	}

	em {
		font-weight: 500;
	}

	section > h1 {
		font-size: 2rem;
		margin-bottom: 1.5rem;
		/* color: orangered; */
		font-weight: bold;
	}

	section > h2 {
		font-weight: 600;
		/* color: orangered; */
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.adress > p {
		margin: 0;
		line-height: 1.5rem;
	}
	a {
		margin-top: 1rem;
		text-decoration: underline 0.1rem orangered;
		cursor: pointer;
	}

	.logos {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		column-gap: 1.5rem;
		row-gap: 0.5rem;
		padding-top: 0.3rem;
		margin-bottom: 2rem;
		width: 90%;
	}

	img {
		width: 1.5rem;
	}

	input {
		width: 90%;
		/* border-color: orangered; */
	}

	.input {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		margin-top: 0.5rem;
	}

	button {
		border: none;
		background-color: transparent;
		cursor: pointer;
	}
	button > img:hover {
		fill: orangered;
		color: orangered;
	}

	#zotero {
		padding-top: 0.05rem;
		width: 5rem;
	}

	#cieco {
		position: relative;
		float: right;
		width: 10rem;
		height: auto;
		bottom: 1rem;
	}

	@media screen and (max-width: 820px) {
	}
</style>
