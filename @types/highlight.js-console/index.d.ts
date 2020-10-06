import hljs from 'highlight.js';

declare module 'highlight.js-console'
{
    export function convert(hljsResult: hljs.IHighlightResultBase.value, theme?: string)
        : Promise<(converted: string) => void>
}
