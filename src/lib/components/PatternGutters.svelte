<script lang="ts">
	export let className = '';
	export let contrast = false;
	export let direction: 'left' | 'right' = 'left';

	const direcClass = direction === 'left' ? 'left-gutter' : 'right-gutter';
</script>

<div class={`pattern-container ${className} ${direcClass}`}>
	<div class={`pattern ${contrast ? 'contrast' : ''}`}></div>
	<!-- <div class="gradient-overlay"></div> -->
</div>

<style>
	.pattern-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.pattern {
		width: 100%;
		height: 100%;
		--s: 15px; /* control the size*/
		--c1: var(--clr-a);
		--c2: var(--clr-b);

		--g1: conic-gradient(from -45deg at 60%, #0000 75%, var(--c1) 0);
		--g2: conic-gradient(from -45deg at 30%, #0000 75%, var(--c2) 0);
		background:
			var(--g2) calc(var(--s) / 8) 0,
			var(--g2) calc(5 * var(--s) / 8) var(--s),
			var(--g1),
			var(--g1) calc(var(--s) / 2) var(--s) var(--c2);
		background-size: var(--s) calc(2 * var(--s));

		border-radius: var(--pattern-bradius);
	}
	.gradient-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4));
		pointer-events: none;
	}
	.contrast {
		--c1: var(--clr-b);
		--c2: var(--clr-a);
	}
</style>
