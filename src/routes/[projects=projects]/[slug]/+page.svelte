<script lang="ts">
	export let data;
	const post = data.post;
</script>

<article>
	<h1>{post.title}</h1>

	<span>{post.team.join(', ')}</span>
	|
	<span>{post.since}</span>

	{@html post.html}
</article>
