import DeclarationComment from  './DeclarationComment'
import { reduce as cond } from 'conditional-reduce'
import stylus, { nodes, utils, functions, Parser, Compiler, Evaluator,Visitor } from 'stylus'
import userMeta from 'usercss-meta'

/**
 * Regex used to confirm cast of below type.
 */
const stylusVarRegex = /^(?<type>text|color|checkbox|select|range|number)$/;
const isStylusExtVariable =
    (obj: any): obj is StylusExtVariable =>  stylusVarRegex.test(obj);

type StylusExtVariable =
	'checkbox'
	| 'color'
	| 'checkbox'
	| 'select'
	| 'range'
	| 'number'
	| 'text'

// Matching for bracketed values does not work with this lol
// const docRegex = /^@var[ \t]+(?<type>text|color|checkbox|select|range|number)[ \t]+(?<name>) (?<label>(?i)[a-z_-]+)[ \t]+(?<def>\{[\S\s]+\}|\[[\s\S]+\]|\S+)/gm;
const docRegex = /^@var.+/gm;
function processComments(source: string)
{
    let docComments = source.match(docRegex) || [];
    if(docComments.length < 1)
    {
      console.warn('No doc comments found.')
      return
    }

    // console.log("First lines of declaration comments parsed:");
    // console.log(docComments);
    // docComments.forEach(line => {
        /**
         * Token split methods:
         * Node Types
         * - Overthought
         * ``` js
         * /^[@]var[ \t]+(\S+).+/`
         * ```
         */
        // let name = line.replace(/^@var[ \t]+\w+[ \t]+/, '').replace(/^(\S+).+/, '$1');
        /**
         * Currently going off whitespace delimited tokens for the variable
         * type and name
        //  */
        // const spaceSplit = line.split(/ +/);
        // let name = spaceSplit[2];

        // let valueLazy = spaceSplit.slice(-1)[0];
        // let stylusType: StylusExtVariable =
        //         spaceSplit[1].toLowerCase() as StylusExtVariable;
        // if(!isStylusExtVariable(stylusType))
        //     throw new Error('Parsed declaration type invalid.')

        // ((lower: string) =>
        // 		lower[0].toUpperCase() + lower.substring(1)
        // )(spaceSplit[1]);

        // const expr = cond(stylusType, {
        // });

        // Assert variable exists

        // Declare variable
        // stylus.functions.define(new stylus.nodes.String(name), expr)
    // })
    // DeclarationComment.parseSource(source);
}

const plugin = () => function (renderer: any): any {
    'use strict';

    console.log('Plugin loaded.')

};

plugin.path    = __dirname;
plugin.version = require(__dirname + '/../package.json').version;



module.exports = plugin
