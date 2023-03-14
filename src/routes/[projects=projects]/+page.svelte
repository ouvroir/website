<script lang="ts">
	import type { PageData } from './$types';
	import { locale } from '$i18n';

	export let data: PageData;

	console.log('Current locale', $locale);
	console.log(data);
</script>

<h1>Our projects</h1>

<h4>{$locale}</h4>
<ul>
	{#each data.posts.en as f}
		<div class="front-matter">
			{#each Object.keys(f.attributes) as k}
				<div class="front-item">
					<span>{k}:</span>
					<p>{f.attributes[k]}</p>
				</div>
			{/each}
		</div>
	{/each}
</ul>

<style>
	.front-matter {
		padding: 1.5rem;
	}
</style>
