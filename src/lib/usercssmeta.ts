//#region Imports

// Packages
import chalk from 'chalk'
const hex = chalk.hex.bind(chalk)
const underline = chalk.underline.bind(chalk)

import * as userCssMeta  from 'usercss-meta'
import type { UserCSSMetaParserResult } from 'usercss-meta';

//#endregion Imports

//#region
export const metaRegex: RegExp = /^(\/\* ==UserStyle==[\s\S\n]+?^==\/UserStyle== \*\/)/mg;

export function extractMeta(source: string)
{
    const parsed = (source.match(metaRegex) || [''])[0];
    if(!parsed || parsed.length === 0)
    {
        console.log(chalk.ansi256(208)`Failed to match usercssmeta with capture regex.`)
        return '';
    }
    console.log(chalk.blue`Extracted meta:\n` + chalk.gray(parsed));

    return parsed;
}

export function parseSourceUserCSSMeta(source: string, allowErrors: boolean = true): Maybe<ParsedUserCSSMeta>
{
    let parsed: Maybe<ParsedUserCSSMeta> = undefined;

    let extracted = extractMeta(source);
    if(extracted.length === 0)
    {
        console.warn(chalk.ansi256(209)`Failed to extract meta, exiting parse function.`)
        return
    }

    parsed = userCssMeta.parse(source, {allowErrors}) as ParsedUserCSSMeta;

    if(typeof parsed === 'object')
        return parsed;

    // Move to wrapper function for loading file directly
    // console.warn(hex('#C90')`Failed parsing${
    //         typeof sourceArg === 'string'
    //             ? ' input source'
    //             : underline`${sourceArg.path}`}.`)
    return;
}

export interface ParseWithVariables extends ParsedUserCSSMeta
{
    metadata: ParsedUserCSSMeta['metadata'] & { vars: {[key: string]: UserVariable} }
}

export function metaHasVariables(parsed: ParsedUserCSSMeta): parsed is ParseWithVariables
{
    return !!(parsed?.metadata?.vars ?? false)
        // throw new Error('usercss-meta parsed has no variables.')
}

//#region Declarations

export type ParsedUserCSSMeta =
    typeof UserCSSMetaParserResult
    & {
        metadata?:
        {
            vars?: Record<string, UserVariable>
        }
    };

export type UserCssType =
    | 'number'
    | 'checkbox'
    | 'string'
    | 'color'
    | 'select'

/**
 * Mapping of (Stylus Extension) user variable type to type of `value` and
 * `default`.
 */
type UserVariableTypeMap<T extends UserCssType>=
    T extends 'number' | 'checkbox'         ? number :
    T extends 'string' | 'select' | 'color' ? string : string | number;

/**
 * Description of a declared user style variable
 */
export interface UserVariable<
    UT extends UserCssType             = UserCssType,
    UV extends UserVariableTypeMap<UT> = UserVariableTypeMap<UT>
>
{
    type:    UT;
    label:   string;
    value:   UV;
    default: UV;
    units?:  string;
}

interface UserVariableBase<V extends number | string = string | number>
{
    type:    UserCssType
    label:   string
    value:   V | null
    default: V
    units?:  string
}

//#endregion Declarations
