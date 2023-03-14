import type { PageLoad } from './$types';
import fm, { type FrontMatterResult } from 'front-matter';
import fs from 'fs'

export const load = (() => {

  const basePath = './src/lib/labouvroir/projets/'
  let posts: { [locale: string]: Array<FrontMatterResult> } = { en: [], fr: [] }

  // get all projects posts from labouvroir submodule
  fs.readdirSync(basePath)
    .forEach(fname => {
      if (!fname.includes('template')) {

        // read frontmatter
        fs.readFile(basePath + fname, 'utf-8', (err, data) => {
          if (err) {
            throw Error(basePath + fname)
          }

          // parse locale from filename
          fname.includes('-en.md')
            ? posts.en.push(fm(data))
            : posts.fr.push(fm(data))


        })

      }
    })

  // Don't display drafts !!!
  posts = posts.filter(p => p.draft === false)
  return {
    posts
  };

}) satisfies PageLoad;