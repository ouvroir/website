<script lang="ts">
	export let data;
	const post = data.post;
</script>

<article>
	<h1>{post.title}</h1>

	<p>{post.team.join(', ')}</p>
	<p>{post.since}</p>

	{@html post.html}
</article>
