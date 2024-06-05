import { get, type Readable, type Writable } from "svelte/store"
import FlexSearch from "flexsearch"
import * as stores from "$lib/stores"
import { locale } from "$lib/i18n/i18n"

export class SearchIndex {
    index: FlexSearch.Document<unknown>
    contentMap: Record<number, { slug: string, kind: string }> = {}

    constructor() {
        this.index = new FlexSearch.Document({
            tokenize: 'forward',
            language: get(locale),
            document: {
                id: 'id',
                index: ['title', 'content']
            }
        })
    }

    add(content: any[]) {
        content.forEach((d, i) => {

            const stripped = this._stripHtml(d.html)

            this.contentMap[i] = { slug: d.meta.slug, kind: d.meta.kind }
            this.index.add({
                id: i,
                title: d.meta.title,
                content: stripped
            })
        })
    }

    _stripHtml(html: string) {
        const doc = document.createElement('div')
        doc.innerHTML = html
        return doc.textContent || ''
    }

    _replaceTextWithMarker(text: string, match: string) {
        const regex = new RegExp(match, 'gi')
        return text.replaceAll(regex, (match) => `<mark>${match}</mark>`)
    }

    _getMatches(text: string, query: string, limit = 1) {
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
            let start = index - 40
            let end = index + 100
            const excerpt = text.substring(start, end).trim()
            return `... ${this._replaceTextWithMarker(excerpt, query)} ...`
        })
    }

    search(query: string) {
        if (!query) return []

        console.log('searching for:', query)

        const match = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

        const results: number[] = []
        this.index.search(match, 15).forEach(({ _, result }) => result.forEach(r => results.push(r)))
        console.log('results:', results)


        const storeMap = {
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
            return {
                slug: c.meta.slug,
                kind: c.meta.kind,
                title: c.meta.title,
                text: this._getMatches(this._stripHtml(c.html), query, 1)
            }
        })
        return Object.groupBy(searchResult, (r => r.kind))
    }
}