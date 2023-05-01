declare module "*.md" {
    const attributes: MarkdownAttr;
    const html: MarkdownHtml;
    const toc: MarkdownToc;
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

export type MarkdownToc = {
    level: string, content: string
}[]

export type MarkdownHtml = string

export type Markdown = {
    attributes: MarkdownAttr
    html: string
    toc: MarkdownToc
}