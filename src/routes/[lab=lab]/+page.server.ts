import { readFileSync } from 'node:fs';
import { default as fm } from 'front-matter';
import type { Project } from '$lib/types/Markdown';

export const load = async (event) => {
    const basePath = './src/lib/labouvroir/equipe/'
    let files
    'en' === event.locals.lang
        ? files = import.meta.glob('../../lib/labouvroir/equipe/*-en.md')
        : files = import.meta.glob('../../lib/labouvroir/equipe/*-fr.md')

    files = Object.keys(files).map(f => f.split('/').at(-1)) as string[]
    files = files.filter(f => !f.includes('template'))
    const projects = files.map(f => fm(readFileSync(basePath + f, { encoding: 'utf-8' })).attributes) as Project[]

    return {
        projects
    }
}