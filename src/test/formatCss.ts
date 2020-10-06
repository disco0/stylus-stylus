import hljs from 'highlight.js'
import hljsConsole from 'highlight.js-console'

hljs.configure({ languages: ['css'] });

export function logStyledCss(source: string): void
{
    var hljsString = hljs.highlightAuto(source);
    hljsConsole.convert(hljsString.value, 'vs')
        .then(function(converted: string) {
            console.log(converted);
        })
        .catch(function(exception: any) {
            console.error(exception);
        });
}
