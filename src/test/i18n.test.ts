import { describe, it, expect } from 'vitest';
import translations from '$lib/i18n/translations';

describe('translations', () => {
    it('same number of items', () => {
        const ls = Object.keys(translations).map(l => Object.keys(translations[l]).length)
        expect(ls.every(l => l === ls[0])).toEqual(true)
    })
})