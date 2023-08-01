import { derived, writable } from "svelte/store";
import translations from "./translations";


// Code greatly inspired by:
// https://dev.to/danawoodman/svelte-quick-tip-adding-basic-internationalization-i18n-to-you-app-2lm

export const locale = writable("fr");
export const locales = Object.keys(translations);

export function translate(locale: string, key: string, vars: { [key: string]: string }) {

    if (!key) throw new Error("[error i18n] No key provided to $t()");
    if (!locale) throw new Error(`[error i18n] No translation for key "${key}"`);

    // Grab the translation from the translations object
    let text = translations[locale][key];
    if (!text) throw new Error(`[error i18n] No translation found for ${locale}.${key}`);

    // Replace variables in the translation string
    Object.keys(vars).map(k => {
        const regex = new RegExp(`{{${k}}}`, "g");
        text = text.replace(regex, vars[k]);
    });

    return text;
}

export const t = derived(locale, ($locale) => (key: string, vars = {}) =>
    translate($locale, key, vars)
);

/**
 * Reverse translation
 */
export const rt = derived(locale, ($locale) => (key: string, vars = {}) => {
    const lang = $locale === "fr" ? "en" : "fr";
    return translate(lang, key, vars)
}
);

