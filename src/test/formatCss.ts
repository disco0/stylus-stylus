//#region Imports

// import hljs        from 'highlight.js'
import hljsConsole from 'highlight.js-console'

//#endregion Imports

// hljs.configure({ languages: ['css'] });

function styledLogger<T extends HasUseHighlightJsFlag>(this: T, source: string): void
{
    if(true) // !this.useHighlightJs)
    {
        // console.log('Skipping hljs');
        (typeof this.method === 'string'
            ? console[this.method]
            : this.method
        )(source);
        return
    }

    // const logger =
    //     (typeof this.method === 'string'
    //         ? console[this.method] : this.method);

    // var hljsString = hljs.highlightAuto(source);
    // hljsConsole.convert(hljsString.value, 'vs')
    //     .then((converted: string) => {
    //         logger(converted);
    //     })
    //     .catch(function(exception: any) {
    //         logger(exception);
    //     });
}

export const logStyledCss: typeof styledLogger & HasUseHighlightJsFlag = Object.assign(styledLogger, {
    useHighlightJs: true,
    method: 'log'
}) as typeof styledLogger & HasUseHighlightJsFlag;

//#region Declarations

type AllowedConsoleMethodName =
    | 'log'
    | 'info'
    | 'debug';

interface HasUseHighlightJsFlag
{
    useHighlightJs: boolean;
    method:
        | AllowedConsoleMethodName
        | Console[AllowedConsoleMethodName];
}

//#endregion Declarations
