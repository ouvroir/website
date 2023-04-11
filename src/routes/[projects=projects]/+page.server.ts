import * as fm from 'front-matter';
import { readFileSync, readdirSync } from 'fs'
import type { MarkdownAttr } from '$lib/types/Markdown';


export const prerender = true

export async function load() {
    // Construct dict < sulg, filname + metadata >
    const basePath = './src/lib/labouvroir/projets/'

    const projects = readdirSync(basePath)
        .filter(f => f !== '0-template-fr.md')
        .map(f => {

            const metadata: MarkdownAttr = fm.default(
                readFileSync(basePath + f, { encoding: 'utf-8' })
            ).attributes as MarkdownAttr

            return {
                slug: metadata.slug,
                fname: f,
                meta: metadata
            }
        })

    // console.log(projects)

    return {
        projects
    }
}