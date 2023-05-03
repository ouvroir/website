import { marked } from 'marked'
import fm from 'front-matter'
import { readFileSync } from 'fs'

export function importMdFile(path: string) {
    const basePath = '../labouvroir/'
    const raw = readFileSync(basePath + path, { encoding: 'utf-8' })
    const md = fm(raw)
    const html = marked.parse(md.body)

    return {
        attributes: md.attributes,
        html
    }
}

