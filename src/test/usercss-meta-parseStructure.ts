///<reference path="../../@types/usercss-meta/index.d.ts"/>
///<reference path="../globals.d.ts"/>
import chalk from 'chalk'
const hex = chalk.hex.bind(chalk)
const underline = chalk.underline.bind(chalk)

import * as userCssMeta  from 'usercss-meta'
import type { UserCSSMetaParserResult } from 'usercss-meta';

import type { Pathent, TestSource } from '../lib/fs';
import type {
    ParsedUserCSSMeta,
    UserCssType,
    UserVariable,
} from '../lib/usercssmeta';
import { metaHasVariables } from '../lib/usercssmeta';

import { sourceFiles } from './source-tests-loader';

export const metaRegex: RegExp = /^(\/\* ==UserStyle==[\s\S\n]+?^==\/UserStyle== \*\/)/mg
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

export function parseSourceUserCSSMeta(sourceFile: string | TestSource, allowErrors?: boolean): Maybe<ParsedUserCSSMeta>
export function parseSourceUserCSSMeta(sourceArg:  string | TestSource | Record<'name' | 'path' | 'source', string>, allowErrors: boolean = true): ParsedUserCSSMeta | undefined
{
    let parsed: Maybe<ParsedUserCSSMeta> = undefined;
    const source = typeof sourceArg === 'string' ? sourceArg : sourceArg.source;

    let extracted = extractMeta(source);
    if(extracted.length === 0)
    {
        console.warn(chalk.ansi256(209)`Failed to extract meta, exiting parse function.`)
        return
    }

    parsed = userCssMeta.parse(source, {allowErrors});

    if(typeof parsed === 'object')
        return parsed;

    console.warn(hex('#C90')`Failed parsing${
            typeof sourceArg === 'string'
                ? ' input source'
                : underline`${sourceArg.path}`}.`)
    return;
}

export interface ParseWithVariables extends ParsedUserCSSMeta
{
    metadata: ParsedUserCSSMeta['metadata'] & { vars: Record<string, UserVariable> }
}

//#region Display Meta
const userVarPropsToPrint = [ 'type', 'label', 'default', 'units' ] as const;
const longestVarPropLength =
    [...userVarPropsToPrint.values()]
        .map(({length}) => length)
        .sort((a, b) => b - a)[0]

// Generic paramter is to assert types working remotely correctly
function printUserVariableProp<T extends keyof UserVariable>(name: T, value: UserVariable[T]): void
{
    console.log(chalk.hex('#58C')`    ${
        name
      }:${
        ' '.repeat(longestVarPropLength - name.length + 2)
      }  ${
        chalk.ansi256(233)(value)
    }`)
}

export function printUserVariable(name: string, value: UserVariable): void
{
    for(const propName of userVarPropsToPrint)
    {
        if(typeof value[propName] === 'undefined') continue;

        printUserVariableProp(
            propName,
            [
                value[propName],
                propName === 'default' && (value.units ?? '').length > 0
                    ?  value['units']: ''
            ].join('')
        )

    }
}

export function printParsedVariables(result: ParsedUserCSSMeta)
{
    console.log(hex("#C00").bold`Variables: `);

    //#region Validate

    if(!(typeof result === 'object'))
    {
        console.log(chalk.ansi256(208)`No result object.`)
        return
    }
    if(!(typeof result.metadata === 'object'))
    {
        console.log(chalk.ansi256(208)`No metadata block found on result: %o`, result)
        return
    }
    if(!metaHasVariables(result))
    {
        console.log(chalk.ansi256(208)`No variables parsed from result: %o`, result)
        return
    }

    //#endregion Validate

    Object.entries(result.metadata.vars).forEach(([k, v]) =>
    {
        console.log(hex('#04F')` - ${k}:`)
        printUserVariable(k, v)
        // console.dir(v);
    })
}

export function displaySourceParseStructure(sourceFile: TestSource): void;
export function displaySourceParseStructure(sourceFile: {name: string, path: string, source: string}): void;
export function displaySourceParseStructure(sourceFile: TestSource | {name: string, path: string, source: string}): void
{
    const { source, path } = sourceFile;
    if(!path)
    {
        console.log(chalk.red`Invalid inputs. Argument passed into function displaySourceParseStructure:\n%o`, sourceFile)
        return
    }
    try
    {
        let result = parseSourceUserCSSMeta(source);
        if(!result)
        {
            console.warn(hex('#C90')`Failed parsing ${underline`${path}`}.`)
            return;
        }

        printParsedVariables(result)
        return;
    }
    catch(e)
    {
        console.error(chalk.red.bold`Error during usercss meta parse:`)
        console.dir(e)
    }
}

//#endregion Display Meta

export function parseTestFiles(files: TestSource[]): void;
export function parseTestFiles(files: {name: string, path: string, source: string}[] = sourceFiles): void
{
    sourceFiles.forEach(file => {
        console.log(chalk.ansi256(32)`Parsing file: ${chalk.ansi256(32).underline`${file.path}`}`)
        displaySourceParseStructure(file)
    })
}

// function assertString(obj: unknown) asserts obj is string
// {
//
// }
//
// class UserMetaParserTest
// {
//     source: string;
//     path: string;
//     name: string;
//     constructor(public sourceFile: TestSource | {name: string, path: string, source: string})
//     {
//         Object.assign(this, sourceFile);
//     }
//
//     displaySourceParseStructure(): void;
//     {
//         try
//         {
//             let result = parseSourceUserCSSMeta(this.source);
//             if(!result)
//             {
//                 console.warn(hex('#C90')`Failed parsing ${underline`${path}`}.`)
//                 return;
//             }
//
//             console.log(hex("#089")`Parsed stylus file ${underline`${path}`}`);
//             printParsedVariables(result)
//             return;
//         }
//         catch(e)
//         {
//             console.error(chalk.red.bold`Error during usercss meta parse:`)
//             console.dir(e)
//         }
//     }
// }
