type Maybe<T, U extends undefined | null = undefined> = T | U;

//#region highlight.js-console

declare module 'highlight.js-console'
{
    type Result = import('highlight.js').IHighlightResultBase
    export function convert(hljsResult: Result.value, theme?: string)
        : Promise<string>
}

//#endregion highlight.js-console

//#region UserCSSMeta

/**
 * Temporary replacement for original index.js to fix some build errors
 * generating types
 *
 * Namespacing pattern based on Stylus types implementation
 */
declare module 'usercss-meta'
{

    declare var usercssmeta: UserCSSMeta.Static;
    export = usercssmeta;

    declare namespace UserCSSMeta
    {
        //#region Static

        export interface Static
        {
            ParseError: error.ParseError;

            util: typeof util;

            parse:        typeof parse.parse;
            createParser: typeof parse.createParser;

            stringify:          typeof stringify.stringify
            createStringifier:  typeof stringify.createStringifier

            /**
             * Extended exports beyond actual javascript implementation, because
             * qol
             */

            /**  */
            UserCSSMetaParserResult: parse.UserCSSMetaParserResult;
        }

        //#endregion Static

        //#region ./lib/error

        export namespace error
        {
            export interface ParseErrorOptions
            {
                code?:    string;
                message:  string;
                index?:   number;
                args?:    string[];
            }

            export class ParseError extends Error
            {
                constructor(err: Error | ParseErrorOptions)
            }

            export class MissingCharError extends ParseError
            {
                constructor(chars: string[], index: number)
            }

            export class EOFError extends ParseError
            {
                constructor(index: number)
            }
        }

        //#endregion ./lib/error

        //#region ./lib/parse-util

        export namespace util
        {
            // declare const RX_EOT = /<<<EOT([\s\S]+?)EOT;/y;
            // declare const RX_LINE = /.*/y;
            // declare const RX_NUMBER = /-?(\d+(\.\d+)?|\.\d+)([eE]-?\d+)?\s*/y;
            // declare const RX_WHITESPACE = /\s*/y;
            // declare const RX_WHITESPACE_SAMELINE = /[^\S\n]*/y;
            // declare const RX_WORD = /([\w-]+)\s*/y;
            // declare const RX_STRING_BACKTICK = /(`(?:\\`|[\s\S])*?`)/y;
            // declare const RX_STRING_QUOTED = /((['"])(?:\\\2|[^\n])*?\2|\w+)/y;
            // declare const RX_STRING_UNQUOTED = /[^"]*/y;

            // declare const JSON_PRIME = {
            //   __proto__: null,
            //   'null': null,
            //   'true': true,
            //   'false': false
            // };

            /**
             * Interim catch all type for parser function argument/parser object.
             */
            export interface ParserState extends Record<string,any> { }

            export function unquote(string: string): string

            export function eatLine(state: ParserState): void
            export function eatWhitespace(state: ParserState): void

            export function parseChar(state: ParserState): void
            export function parseWord(state: ParserState): void
            export function parseJSON(state: ParserState): void
            export function parseEOT(state: ParserState): void
            export function parseStringUnquoted(state: ParserState): void
            export function parseString(state: ParserState, sameLine: boolean): void
            function parseJSONValue(state: ParserState): void
            export function parseNumber(state: ParserState): void
            export function parseStringToEnd(state: ParserState): void
        }

        //#endregion ./lib/parse-util

        //#region ./lib/parse

        export namespace parse
        {
            type MANDATORY_META_OPTION       = 'name' |'namespace' | 'version';
            type MANDATORY_META_DEFAULT_TYPE = ['name', 'namespace', 'version'];
            type RANGE_PROPS_TYPE            = ['default', 'min', 'max', 'step'];

            type UnknownKeyOptions = 'ignore' | 'assign' | 'throw';

            interface Parser
            {
                parse: (text: string) => UserCSSMetaParserResult
                validateVar: (varObj: any) => void;
            }

            export interface UserCSSMetaParserResult
            {
                metadata?: Partial<{
                    name:         string;
                    description:  string;
                    version:      string;
                    namespace:    string;
                    author:       string;
                    license:      string;
                    preprocessor: string;
                    vars:         {[key: string]: any};
                }>;
                errors?:       string[];
            }

            export interface CreateParserOptions
            {
                unknownKey?:     UnknownKeyOptions;
                mandatoryKeys?:  MANDATORY_META_OPTION[];
                parseKey?:       Record<string, any>;
                parseVar?:       Record<string, any>;
                validateKey?:    Record<string, any>;
                validateVar?:    Record<string, any>;
                allowErrors?:    boolean;
            }

            export function createParser({
            unknownKey,
            mandatoryKeys,
            parseKey,
            parseVar,
            validateKey,
            validateVar,
            allowErrors
            }: CreateParserOptions): Parser;

            export function parse(text: string, options: CreateParserOptions): ReturnType<Parser['parse']>
        }

        //#endregion ./lib/parse

        //#region ./lib/stringify

        export namespace stringify
        {
            // Narrow Later
            export type UserCSSMeta = Record<string, any>

            export interface CreateStringifierOptions
            {
                alignKeys?:     boolean;
                space?:         number;
                format?:        'stylus' | 'xstyle';
                //@TODO: Bring in far more refined type declarations for these from
                //       full ts migration if its abandoned
                stringifyKey?:  Record<string, any>;
                stringifyVar?:  Record<string, any>;
            }

            export function stringify(meta: string, options: CreateStringifierOptions): string
            export function createStringifier(options: CreateStringifierOptions): typeof stringify
        }

        //#endregion ./lib/stringify
    }

}

 //#endregion UserCSSMeta
