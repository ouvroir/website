<script lang="ts">
	import { page } from '$app/stores';
	import type { Markdown } from '$lib/types/Markdown';

	let post: Markdown;
	$: post = $page.data.post;
</script>

<h1>{post.attributes.title}</h1>

<p>{post.attributes.team.join(', ')}</p>
<p>{post.attributes.since}</p>

{@html $page.data.post.html}
