type Maybe<T, U extends undefined | null = undefined> = T | U;


declare module 'highlight.js-console'
{
    import hljs from 'highlight.js';
    export function convert(hljsResult: hljs.IHighlightResultBase.value, theme?: string)
        : Promise<(converted: string) => void>
}
