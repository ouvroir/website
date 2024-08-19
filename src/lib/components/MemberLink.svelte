<script lang="ts">
	import { t } from '$i18n/i18n';
	import { members } from '$lib/stores';
	import type { Member } from '$lib/types';

	export let username: string = '';

	const isMember = $members.map((m) => m.meta.username).includes(username);
	let member: Member;

	if (isMember) member = $members.find((m) => m.meta.username === username);
</script>

{#if isMember && member}
	<li>
		<a href={`${$t('route.about.member')}/${username}`}>
			{`${member.meta.firstname} ${member.meta.lastname}`}
		</a>
	</li>
{:else}
	<li>{username}</li>
{/if}

<style>
	a {
		color: var(--clr-b);

		&:hover {
			text-decoration: none;
		}
	}
</style>
