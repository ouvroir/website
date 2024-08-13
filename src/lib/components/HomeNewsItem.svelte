<script lang="ts">
	import { Blog, Event, Resource } from '$lib/types';

	export let href = '';
	export let content: Blog | Event | Resource;
</script>

<li class="home-news-li">
	<a {href}>
		<article>
			<header>
				<span class="document-tag">{content.meta.tag}</span>
				<slot name="title" />
			</header>

			<div class="article-content">
				<span class="card-date">{content.meta.date}</span>
				<span class="card-time">{content.meta.time}</span>
				<slot name="description" />
			</div>
		</article>
	</a>
</li>
