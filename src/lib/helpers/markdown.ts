

export async function importContentFrom(subDir: string, locale: string | null) {
    const path = './src/lib/labouvroir/' + subDir
    let files
    switch (subDir) {
        case 'projets/':
            files = import.meta.glob('../labouvroir/projets/*.md')
            break
        case 'cr/':
            files = import.meta.glob('../labouvroir/cr/*.md')
            break
        case 'equipe/':
            files = import.meta.glob('../labouvroir/equipe/*.md')
            break
        case 'blog/':
            files = import.meta.glob('../labouvroir/blog/*.md')
            break
        default:
            return {}
    }

    console.log(files);


    if (locale)
        files = Object.keys(files)
            .filter(f => f.includes(`-${locale}.md`) && !f.includes('template'))
            .reduce((acc, filename) => {
                console.log(filename);

                acc[filename] = files[filename]
                return acc
            }, {})

    // let relPath = process.env.NODE_ENV === 'development'
    //     ? '../labouvroir/'
    //     : '../../../../src/lib/labouvroir/'
    // relPath += subDir

    return await Promise.all(Object.entries(files).map(async ([filename, resolver]) => {
        const content = await resolver()
        return {
            ...content.metadata,
            ...content.default.render()
        }
    }))
}

export async function importFile(filename: string) {
    return filename
}