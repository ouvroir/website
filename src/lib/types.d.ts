export type Project = {
    meta: {
        description: string,
        draft: boolean,
        lang: string,
        lead: string,
        link: string,
        since: string,
        slug: string,
        tags: string[],
        team: string[],
        title: string
    }
    path: string,
    html?: string
}

export type Member = {
    meta: {
        firstname: string,
        lastname: string,
        username: string
        slug: string
        lang: 'fr' | 'en',
        description: string
        tags: string[],
        mail: string,
        link?: string | null,
        projects: string[],
        status: string
        pronouns: string
        permalink: string,
        img?: string
    },
    path: string
    html: string
}

