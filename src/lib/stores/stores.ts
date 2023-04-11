import { writable } from "svelte/store";
import type { MarkdownAttr } from "$lib/types/Markdown";


export const projects = writable()
export const posts = writable([])