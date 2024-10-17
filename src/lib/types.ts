type HTML = {
	html: string;
};

type ProjectMeta = {
	title: string;
	description: string;
	tags: string[];
	github: string
	projectLink: string;
	otherLinks: string[];
	lead: string;
	team: string[];
	since: string;
	draft: boolean;
	lang: 'en' | 'fr';
	slug: string;
	cieco: boolean;
	bannerImage: string;
	pageImage: string;
	kind: 'project';
	path: string;
};

type EventMeta = {
	title: string;
	subtitle: string;
	dateStart: string;
	dateEnd: string;
	timeStart: string;
	timeEnd: string;
	place: string;
	link: string;
	description: string;
	participants: string[];
	path: string;
	kind: 'event';
	slug: string;
	recurrent: string;
	draft: boolean;
};

type MemberMeta = {
	firstname: string;
	lastname: string;
	username: string;
	slug: string;
	lang: 'en' | 'fr';
	description: string;
	tags: string[];
	mail: string;
	link: string;
	projects: string;
	status: string;
	pronouns: string;
	permalink: string;
	img: string;
	path: string;
	kind: 'member';
	order?: number;
};

type MeetingMeta = {
	title: string;
	description: string;
	author: string;
	date: string;
	draft: boolean;
	tags: string[];
	path: string;
	kind: 'meeting';
	slug: string;
};

type BlogMeta = {
	title: string;
	description: string;
	author: string;
	date: string;
	draft: boolean;
	slug: string;
	lang: 'en' | 'fr';
	tags: string[];
	path: string;
	kind: 'blog';
};

type ResourceMeta = {
	title: string;
	description: string;
	author: string;
	dateCreated: string;
	dateUpdated: string;
	contributors: string[];
	draft: boolean;
	slug: string;
	lang: 'en' | 'fr';
	tags: string[];
	path: string;
	kind: 'resource';
};

type StaticDocumentMeta = {
	title: string;
	draft: boolean;
	kind: string;
	path: string;
};


type GenericDocumentMeta = {
	kind: string;
	path: string;
	slug: string;
};

export type Project = { meta: ProjectMeta; html: string };
export type Event = { meta: EventMeta; html: string };
export type Member = { meta: MemberMeta; html: string };
export type Meeting = { meta: MeetingMeta; html: string };
export type Blog = { meta: BlogMeta; html: string };
export type Resource = { meta: ResourceMeta; html: string };
export type GenericDocument = { meta: GenericDocumentMeta; html: string };
export type StaticDocument = { meta: StaticDocumentMeta; html: string };

export type OuvroirData =
	| Project
	| Event
	| Member
	| Meeting
	| Blog
	| Resource
	| StaticDocument
	| GenericDocument;
