<script lang="ts">
	import { t } from '$i18n/i18n';
	export let post;

	let mouseOver = false;
	const onMouseOver = () => {
		mouseOver = !mouseOver;
	};
</script>

<div
	role="article"
	class="post-card"
	on:mouseenter={onMouseOver}
	on:focus={onMouseOver}
	on:mouseleave={onMouseOver}
>
	<span class="document-tag">Événement</span>
	<h1 class={`${mouseOver ? 'underline' : ''}`}>
		<a href={`${$t('route.news')}/${post.meta.slug}`}>
			{post.meta.title}
		</a>
	</h1>
	<div class="post-card-main">
		<div>
			<span class="author">{post.meta.author}</span> | <span>{post.meta.date.split('T')[0]}</span>
		</div>
		<p class="description">{post.meta.description}</p>
	</div>
	<ul class="tags">
		{#each post.meta.tags as t}
			<li id={t}>{t}</li>
		{/each}
	</ul>
</div>

<style>
	.post-card > * + * {
		margin-top: 1rem;
	}

	.post-card > ul {
		margin-top: 0.5rem;
	}

	.post-card-main {
		border-bottom: solid 0.5px rgba(0, 0, 0, 0.2);
		/* border-top: solid 0.5px rgba(0, 0, 0, 0.2); */
		/* padding: 1rem 0; */
		padding-bottom: 1rem;
	}
	.post-card-main > * + * {
		margin-top: 0.4rem;
	}

	.description {
		line-height: 1.4rem;
		font-weight: 300;
	}

	.tags {
		display: flex;
		flex-direction: row;
		/* flex-wrap: wrap; */
		gap: 1rem;
		font-weight: 300;
		font-size: 0.9rem;
	}

	.post-card {
		width: 19rem;
	}

	h1 {
		font-size: 2rem;
		text-decoration: underline;
		text-decoration-thickness: 0.3rem;
		text-decoration-color: transparent;
		transition: all ease 400ms;
	}

	h1:hover {
		cursor: pointer;
	}

	.author {
		color: orangered;
	}

	.underline {
		text-decoration-color: rgba(255, 68, 0, 0.847);
	}
</style>
