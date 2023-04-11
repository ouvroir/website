declare module "*.md" {
    const attributes: {
        description: string
        draft: boolean
        lang: 'en' | 'fr'
        lead: string
        link: string
        since: string
        slug: string
        tags: string[]
        team: string[]
        title: string
    };

    const html: string;

    const toc: { level: string, content: string }[];
}

export type MarkdownAttr = {
    description: string
    draft: boolean
    lang: 'en' | 'fr'
    lead: string
    link: string
    since: string
    slug: string
    tags: string[]
    team: string[]
    title: string
}