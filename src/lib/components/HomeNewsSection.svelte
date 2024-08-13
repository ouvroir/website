<script lang="ts">
	import { t, dateToLocalizedString } from '$i18n/i18n';
	import { events, blogs, projects, resources } from '$lib/stores';
	import type { Blog, Event, Resource } from '$lib/types';
	import { getDateFromContent } from '$lib/utils/helpers';
    import

	if (!events || !blogs || !projects) throw new Error('No data found');

	$: news = [...$events, ...$blogs, ...$resources]
		.sort((a, b) => {
			const aDate = getDateFromContent(a),
				bDate = getDateFromContent(b);
			return bDate.getTime() - aDate.getTime();
		})
		.slice(0, 6);
</script>

<section class="news-section-wrapper">
	<ul class="news-container">
		{#each news as n}
			<li class="news-item"></li>{/each}
	</ul>
</section>

<style>
</style>
