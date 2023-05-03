<script lang="ts">
	export let data;
	const post = data.post;
</script>

<h1>{post.attr.title}</h1>

{@html post.html}
