<script lang="ts">
	import type { Member } from '$lib/types';

	export let data: Member;

	const imgBasePath = '$lib/labouvroir/equipe/profile-img/';
</script>

<li class="member-card">
	{#if data.meta.img}
		<img src={`/team/${data.meta.img}`} alt="" />
	{:else}
		<div class="empty-img" />
	{/if}

	<article class="member-content">
		<h1>
			{data.meta.firstname}
			{data.meta.lastname}
		</h1>
		<div class="meta">
			<span />
		</div>
		<p>{data.meta.description}</p>
	</article>
</li>

<style>
	.member-card {
		display: flex;
		flex-direction: row;
		gap: 2rem;
	}

	.member-card > img,
	div {
		min-width: 10rem;
		min-height: 10rem;
		max-height: 10rem;
		background-color: lightgray;
		filter: grayscale();
	}

	.member-content > * + * {
		margin-top: 0.7rem;
	}

	.member-content > p {
		width: 100%;
		font-weight: 300;
		line-height: 1.8rem;
	}

	.member-content > h1 {
		margin-top: 0.5rem;
		font-size: 1.5rem;
	}
</style>
