//#region Imports

// Packages
import Stylus = require('stylus');
import { suite, test } from 'uvu';
import * as assert from 'uvu/assert';
import c = require('chalk');

// Local
import type { RendererClass } from '../lib/stylus';
import type { ParseWithVariables, UserVariable } from '../lib/usercssmeta';

// Local - Tests
import {
    parseTestFiles,
    parseSourceUserCSSMeta,
    displaySourceParseStructure,
    printParsedVariables
} from './usercss-meta-parseStructure';
import { sourceFiles } from './source-tests-loader';
import { sourceFiles as sourceFileMocks} from './ts-tests';
// import { logStyledCss } from './formatCss';

//#endregion Imports

// Currently using branch with basic declarations

const userCSSMeta =
{
    parse: {
        testOptions: {
            allowErrors: true
        } as object
    }
}

//#region Test Functions

function testSourceFiles()
{
    sourceFiles.forEach(displaySourceParseStructure);
}

function parseAndPrintMockFiles()
{
    [...sourceFileMocks.values()].forEach(obj => displaySourceParseStructure(obj))
}

//#region    TODO: Move to correct module

const loadParsedAsRaw = true
function loadParsedVariables(vars: ParseWithVariables, stylus: RendererClass): RendererClass
{
    for(let [name, meta] of Object.entries(vars.metadata.vars) as [string, UserVariable][])
    {
        const value = [meta.default, ...meta.units ? [meta.units] : []].join('')
        // Remove debug message when refactored
        console.log(`Defining variable ${c.ansi256(32).bold(name)} with value ${c.hex('#A00')(value)}`)
        stylus.define(name, value, loadParsedAsRaw)
    }
    return stylus
}

//#endregion /TODO

function compileMockFiles()
{
    [...sourceFileMocks.values()]
        .forEach(sourceFile => {
            const { source, path } = sourceFile;
            const userCssMeta = parseSourceUserCSSMeta(source);
            if(typeof userCssMeta?.metadata?.vars === 'undefined') return;

            const stylus = loadParsedVariables(userCssMeta as ParseWithVariables, Stylus(source))

            const rendered = stylus.render()

            if(rendered.length > 0)
            {
                console.log(c.hex('#0A0').bold`Rendered css:\n` + rendered);
                return
                // console.log(c.hex('#0A0').bold`Rendered css:`);
                // logStyledCss(rendered)
            }
            else
            {
                console.log(c.hex('#A00').bold`Failed rendering css.`);
                // return
            }
        })
}

function compileTestFiles()
{
    const testFiles = [...sourceFiles];

    console.log(c.ansi256(32)`Compiling test files:`);
    testFiles.forEach((sourceFile) => {
        console.log(c.hex('#58C')` - ${sourceFile.path}`);
    });

    for(const sourceFile of sourceFiles)
    {
        const { source, path } = sourceFile;

        // Read meta
        const userCssMeta = parseSourceUserCSSMeta(source);
        if(typeof userCssMeta?.metadata?.vars === 'undefined')
        {
            console.log(c.ansi256(208)`No variables parsed from meta block.`)
            return;
        }

        // Create Renderer with bound variables
        const stylus = loadParsedVariables(userCssMeta as ParseWithVariables, Stylus(source))

        let rendered: string = '';

        stylus.render((err, css, js) => {
            if(err)
            {
                console.log(c.ansi256(208)`${c.bold`Error during compilation of file ${c.underline(sourceFile.path)}:`}`)
                console.log(c.ansi256(208)(c.bold`Error: ` + err.name))
                console.log(c.ansi256(208)(c.bold`Message:\n` + err.message))
                console.log(c.ansi256(208)(c.bold`Stack:\n` + err.stack))
            }
            if(css)
            {
                rendered = css;
            }
            else
            {
                console.log(c.ansi256(208)`${c.bold`  [No css rendered]`}`);
            }
        })

        if(rendered.length > 0)
        {
            console.log(c.hex('#0A0').bold`Rendered css:\n` + rendered);
            return
            // console.log(c.hex('#0A0').bold`Rendered css:`);
            // logStyledCss(rendered)
        }
        else
        {
            console.log(c.hex('#A00').bold`Failed rendering css.`);
        }
    }
}

//#endregion Test Functions

//#region Go

compileTestFiles()

// compileMockFiles()

//
// test('usercss-meta: Parse Source', () => {
//
// })
// sourceFiles.forEach(testSource)

//#endregion Go

// const API = suite('exports');
