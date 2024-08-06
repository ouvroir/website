import { get, type Readable, type Writable } from "svelte/store"
import FlexSearch from "flexsearch"
import * as stores from "$lib/stores"
import { t } from "$lib/i18n/i18n"

export class SearchIndex {
    index: FlexSearch.Index

    // this stores the slug and kind of a document with its id:number in the search index
    contentMap: Record<number, { slug: string, kind: string }> = {}

    constructor() {
        // this is not the most optimal way to init the index
        // but sunce we're not dealing with a lot of data and 
        // we're building the site at build time, it's fine
        this.index = new FlexSearch.Index({
            charset: 'latin:extra',
            // preset: 'match',
            tokenize: 'full',
            resolution: 1
        })
    }

    add(content: any[]) {
        content.forEach((d, i) => {
            if (!d.html) throw new Error(`Missing html for ${JSON.stringify(d)}`)
            if (!d.meta) throw new Error(`Missing meta ${JSON.stringify(d)}`)
            if (!d.meta.title) throw new Error(`Missing meta.title for ${JSON.stringify(d)}`)

            const stripped = SearchIndex.stripHtml(d.html)
            if (!stripped) throw new Error(`Empty content for ${d.meta.title}`)

            if (i in this.contentMap) throw new Error(`Creating entry with duplicate id`)

            this.contentMap[i] = { slug: d.meta.slug, kind: d.meta.kind }
            this.index.add(i, `${d.meta.title} ${stripped}`)
        })
    }

    static escape(text: string) {
        return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    }

    static stripHtml(html: string) {
        const doc = document.createElement('div')
        doc.innerHTML = html
        if (doc.textContent === null) throw new Error(`Empty content`)
        return doc.textContent || ''
    }

    public replaceTextWithMarker(text: string, match: string) {
        const regex = new RegExp(match, 'gi')
        return text.replaceAll(regex, (match) => `<mark>${match}</mark>`)
    }

    public getMatches(text: string, query: string, limit = 1, title = false) {
        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escapes special characters
        const regex = new RegExp(escapedQuery, 'gi');
        const indexes = []
        let matches = 0
        let match
        while ((match = regex.exec(text)) !== null && matches < limit) {
            indexes.push(match.index)
            matches++
        }
        return indexes.map(index => {
            let start = index - 60
            let end = index + 60
            const excerpt = text.substring(start, end).trim()

            if (title) return this.replaceTextWithMarker(excerpt, query)
            else return `... ${this.replaceTextWithMarker(excerpt, query)} ...`
        })
    }

    search(query: string) {
        if (!query) return []

        const match = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const results = this.index.search(match, 50) as number[]
        // console.log(this.index.search(match, 15))
        // this.index.search(match, 15).forEach(({ _, result }) => result.forEach(r => results.push(r)))

        const storeMap: Record<string, Writable<unknown>> = {
            'project': stores.projects,
            'member': stores.members,
            'event': stores.events,
            'meeting': stores.meetings,
            'blog': stores.blogs,
            'presentation': stores.presentation,
            'support': stores.support,
            'services': stores.services,
            'about': stores.about
        };

        const content = results.map((_, id: number) => {
            const { slug, kind } = this.contentMap[id];

            if (!(kind in storeMap)) throw new Error(`No store found for kind ${kind}`)
            const store = storeMap[kind];

            if (store) {
                if (kind === 'presentation' || kind === 'about' || kind === 'services' || kind === 'support')
                    return get(store);
                else {
                    return get(store).find((item) => item.meta.slug === slug);
                }
            }
            else throw new Error(`No store found for kind ${kind}`);
        });

        const searchResult = content.map(c => {
            const res = {
                slug: c.meta.slug,
                kind: c.meta.kind,
                title: c.meta.title,
                text: this.getMatches(SearchIndex.stripHtml(c.html), query, 1)
            }
            if (!res) throw new Error(`Empty search result for ${JSON.stringify(c)}`)
            return res
        })

            .filter(r => r.text.length > 0)
        return Object.groupBy(searchResult, (r => get(t)(`search.kind.${r.kind}`))) as Record<string, { slug: string, kind: string, title: string[], text: string[] }[]>
    }
}