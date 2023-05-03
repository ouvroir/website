<script lang="ts">
	import { t } from '$i18n/i18n';

	export let data;

	const projects = data.projects;
</script>

<h1>Our projects</h1>

<ul>
	{#each projects as p}
		<li>
			<a href={`/${$t('route.projects')}/${p.slug}`}>{p.title}</a>
		</li>
	{/each}
</ul>
