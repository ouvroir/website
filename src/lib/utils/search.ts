import FlexSearch from "flexsearch"

export function createSearchIndex(content: any[]) {
    const index = new FlexSearch.Document({
        tokenize: 'forward',
        document: {
            id: 'id',
            index: ['title', 'content']
        }
    })



    content.forEach((d, i) => {
        const doc = document.createElement('div')
        doc.innerHTML = d.html
        const stripped = doc.textContent || ''

        console.log(stripped)
        index.add({
            id: i,
            title: d.title,
            content: stripped
        })
    })

    return index
}

export function search(index: FlexSearch.Document, query: string) {
    const result = index.search(query, {
        limit: 5
    })
    console.log('results', result)

    return result
}