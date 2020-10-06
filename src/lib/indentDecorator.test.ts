import type {
    Indentable,
    RealNumber
} from './indentDecorator'
import {
    assertIndentLevelIsReal,
    base,
    indent,
    indentAmountToString
} from './indentDecorator'

//#region Logging Defs

/**
 * Everything in this region and all uses of the the wrapped logging functions
 * `bakeLog` and `indentDecLog` can be removed without effecting implementation
 */

const style =
{
    num: [`color: #F33; font-weight: 500;`],
    fn: [`color: #55CA; font-weight: 500;`],
    light: [`color: #999;`],
    indentDec: [`color: #A058;`],
    bakeIndentInMethod: [`color: #C549;`],
}

const indentStyle = [...style.indentDec, ...style.light];
const indentDecLog = (...[base, ...rest]: [string, ...any[]]) => console.debug(`%c[@indent]%c${base}`, ...indentStyle, ...rest)

const bakeStyle = [...style.bakeIndentInMethod, ...style.light];
const bakeLog = (...[base, ...rest]: [string, ...any[]]) => console.debug(`%c[bakeIndentInMethod]%c${base}`, ...bakeStyle, ...rest)

//#endregion Logging Defs


//#region Test Implementation

export class IndentableClass implements Indentable
{
    indent: RealNumber = (i => {assertIndentLevelIsReal(i); return i})(0 as RealNumber);
    char:   string     = base.char;

    constructor(indent?: number)
    {
        if(!indent) return;

        assertIndentLevelIsReal(indent)
        Object.assign(this, {indent});
    }

    private get indentData(): [Char: string, Level: number]
    {
        return [this.char, this.indent as number]
    }

    log4(...[base, ...values]: [string, ...any[]]): void;
    @indent(4)
    log4(...[base, ...values]: any[]): void
    {
        this.log(base, ...values)
    }

    log(...[base, ...values]: [string, ...any[]]): void;
    log(...[base, ...values]: any[]): void
    {
        if(typeof base === 'string')
            console.log([indentAmountToString(...this.indentData), base].join(''), ...values)
        else
            console.log(indentAmountToString(...this.indentData), base, ...values)
    }
}

//#region Run

export function run():void
{
    const outputStyle = [ 'background: blue; color: white; padding: 0.15em 0.25em 0.3em; border-radius: 0.2em', '']
    const outputContent = [ ...outputStyle, 1, 2, 3]
    const ilog = new IndentableClass(0)

    ilog.log('%cTesting base log method%c %i %i %i', ...outputContent )
    ilog.log4('%cTesting base 4 space method%c %i %i %i', ...outputContent)
    ilog.log('%cRetesting base log method%c %i %i %i',...outputContent)
}

//#endregion Run

//#endregion Test Implementation
