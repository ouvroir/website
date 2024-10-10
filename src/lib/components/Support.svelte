<script lang="ts">
	import { support } from '$lib/stores';
	import { Quebec, Udem, CFI, Cieco, Crihn } from '$components';

	console.log('support', $support);

	const onEnter = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		const p = target.querySelector('p');
		if (p) p.classList.toggle('hide');
	};

	const onLeave = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		const p = target.querySelector('p');
		if (p) p.classList.toggle('hide');
	};
</script>

{#if $support}
	<section>
		<h2>{@html $support.html}</h2>
		<ul class="finance-logos">
			<li on:mouseenter={onEnter} on:mouseleave={onLeave}>
				<div class="card-container">
					<Udem />
				</div>
				<p class="hide">
					Du septembre 2022 au août 2027, le projet est financé par le programme de subventions de
					partenariat du CRSH.
				</p>
			</li>
			<li on:mouseenter={onEnter} on:mouseleave={onLeave}>
				<div class="card-container">
					<CFI />
				</div>
				<p class="hide">Du septembre 2022 au août 2027</p>
			</li>
			<li on:mouseenter={onEnter} on:mouseleave={onLeave}>
				<div class="card-container">
					<Quebec />
				</div>
			</li>
		</ul>
		<h2>
			<p>L'ouvroir fait aussi plein de trucs</p>
		</h2>
		<ul class="partenaires-logos">
			<li on:mouseenter={onEnter} on:mouseleave={onLeave}>
				<div class="card-container">
					<Cieco zoom={0.8} />
				</div>
				<p class="hide">
					L’Ouvroir d’histoire de l’art et de muséologie numérique de l’Université de Montréal, est
					un laboratoire de recherche destiné à soutenir le travail conduit dans le cadre du
					Partenariat « Des nouveaux usages des collections dans les musées d’art » CIÉCO dirigé par
					Johanne Lamoureux.
				</p>
			</li>
			<li on:mouseenter={onEnter} on:mouseleave={onLeave}>
				<div class="card-container">
					<Crihn zoom={1.5} />
				</div>
				<p class="hide">
					L’Ouvroir est membre du « Centre de recherche interuniversitaire sur les humanités
					numériques » CRIHN.
				</p>
			</li>
		</ul>
	</section>
{/if}

<style>
	section {
		grid-column: full;
		/* border-top: solid 1px var(--clr-b); */
		border-top-left-radius: var(--border-radius);
		border-top-right-radius: var(--border-radius);
		box-shadow: 0 -10px 1.5rem -10px var(--clr-b);
		display: grid;
		grid-template-columns: subgrid;
		padding-bottom: 3rem;
	}

	.finance-logos,
	.partenaires-logos {
		grid-column: feature;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		gap: 2rem;
		margin-top: 3rem;
	}

	.finance-logos {
		& li {
			--width: 25rem;
			--padding: 1rem;
			width: var(--width);
			max-width: var(--width);
		}
	}
	.partenaires-logos {
		& li {
			--width: 15rem;
			--padding: 1rem;
			width: var(--width);
			padding: 2rem 0;
		}
	}

	li {
		position: relative;
		height: 20rem;
		min-width: 15rem;
		box-shadow: 0.5px 0.5px 0.5rem var(--clr-b);
		border-radius: var(--border-radius);
		background-color: var(--clr-b);
		flex-grow: 1;

		& svg {
			margin-bottom: 2rem;
			margin: auto;
		}

		& .card-container {
			width: 100%;
			height: 100%;
			padding: var(--padding);
			display: flex;
			/* flex-direction: column; */
		}

		& p {
			position: absolute;
			top: 0;
			left: 0;
			display: block;
			width: 100%;
			min-height: 100%;
			height: max-content;
			padding: calc(var(--padding) + 1rem);
			border-radius: var(--border-radius);
			color: var(--clr-b);
			font-weight: 400;
			font-size: var(--fs-200);
			line-height: 1.5rem;
			background-color: var(--clr-a);
			z-index: 5;
			transition: all 0.3s;
		}

		& p.hide {
			color: transparent;
			background-color: transparent;
		}
	}

	h2 {
		margin: 0;
		grid-column: feature;
		font-size: var(--fs-600);
		font-weight: 700;
		display: flex;
		flex-direction: row;
		padding: 3rem 2rem;
		height: max-content;
		margin-top: 3rem;
		color: var(--clr-b);

		& p {
			width: 40ch;
			margin: auto;
			height: max-content;
			line-height: 3.2rem;
			text-align: center;
			& a {
				color: var(--clr-b);
			}
		}
	}
</style>
