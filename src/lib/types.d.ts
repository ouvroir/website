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
}

export type MemberMeta = {
    firstname: string
    lastname: string
    username: string
    slug: string
    lang: "en" | "fr"
    description: string
    tags: strin[]
    mail: string
    link: string
    projects: string
    status: string
    pronouns: string
    permalink: string
    img: string
}


export type GenericInfos = {
    path: string,
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

export type OuvroirData = Project | Event | Member