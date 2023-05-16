declare module '*.md' {
    // "unknown" would be more detailed depends on how you structure frontmatter
    const attributes: Record<string, unknown>;

    // When "Mode.TOC" is requested
    const toc: { level: string, content: string }[];

    // When "Mode.HTML" is requested
    const html: string;

    // When "Mode.RAW" is requested
    const raw: string

    // When "Mode.React" is requested. VFC could take a generic like React.VFC<{ MyComponent: TypeOfMyComponent }>
    import React from 'react'
    const ReactComponent: React.VFC;

    // When "Mode.Vue" is requested
    import { ComponentOptions, Component } from 'vue';
    const VueComponent: ComponentOptions;
    const VueComponentWith: (components: Record<string, Component>) => ComponentOptions;

    // Modify below per your usage
    export { attributes, toc, html, ReactComponent, VueComponent, VueComponentWith };
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

export type Markdown = {
    attributes: MarkdownAttr
    body: string
    bodyBegin: number
    frontmatter: string
}

export type Project = {
    filename: string
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

export type Blog = {
    title: string
    description: string
    author: string
    date: string
    draft: boolean
    slug: string
    lang: 'en' | 'fr'
    tags: string[]
}

export type Report = {
    title: string
    description: string
    author: string
    date: string
    tags: string[]
    draft: boolean
}

export type Member = {
    filename: string
    firstname: string
    lastname: string
    username: string
    slug: string
    lang: 'en' | 'fr'
    description: string
    tags: string[]
    mail: string
    link: string
    projects: string
    status: string
    pronouns: string
    permalink: string
}

type Content = {
    projects: Project[],
    blog: Blog[],
    // report: Report[],
    // team: Member[]
}

export type ContentMeta = {
    'en': Content,
    'fr': Content
}