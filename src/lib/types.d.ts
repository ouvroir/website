export type ProjectMeta = {
    title: string
    description: string
    tags: string[]
    link: string
    lead: string
    team: string[]
    since: string
    draft: boolean
    lang: "en" | "fr"
    slug: string
    cieco: boolean
    bannerImage: string
    pageImage: string
    kind: "project"
    path: string
}

export type EventMeta = {
    title: string
    subtitle: string
    dateStart: string
    dateEnd: string
    timeStart: string
    timeEnd: string
    place: string
    link: string
    description: string
    participants: string[]
    path: string
    kind: "event"
}

export type MemberMeta = {
    firstname: string
    lastname: string
    username: string
    slug: string
    lang: "en" | "fr"
    description: string
    tags: string[]
    mail: string
    link: string
    projects: string
    status: string
    pronouns: string
    permalink: string
    img: string
    path: string
    kind: "member"
}

export type MeetingMeta = {
    title: string
    description: string
    author: string
    date: string
    draft: boolean
    tags: string[]
    path: string
    kind: "meeting"
}

export type BlogMeta = {
    title: string
    description: string
    author: string
    date: string
    draft: boolean
    slug: string
    lang: 'en' | 'fr'
    tags: string[]
    path: string
    kind: 'blog'
}


export type GenericInfos = {
    html?: string
}

export type Project = GenericInfos & {
    meta: ProjectMeta
}

export type Event = GenericInfos & {
    meta: EventMeta
}

export type Member = GenericInfos & {
    meta: MemberMeta
}

export type OuvroirData = Project | Event | Member | Meeting | Blog