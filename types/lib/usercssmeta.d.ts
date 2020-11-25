import type { UserCSSMetaParserResult } from 'usercss-meta';
export declare const metaRegex: RegExp;
export declare function extractMeta(source: string): string;
export declare function parseSourceUserCSSMeta(source: string, allowErrors?: boolean): Maybe<ParsedUserCSSMeta>;
export declare function metaHasVariables(parsed: ParsedUserCSSMeta): parsed is ParseWithVariables;
export interface ParseWithVariables extends ParsedUserCSSMeta {
    metadata: ParsedUserCSSMeta['metadata'] & {
        vars: {
            [key: string]: UserVariable;
        };
    };
}
export declare type ParsedUserCSSMeta = typeof UserCSSMetaParserResult & {
    metadata?: {
        vars?: Record<string, UserVariable>;
    };
};
export declare type UserCssType = 'number' | 'checkbox' | 'string' | 'color' | 'select';
/**
 * Mapping of (Stylus Extension) user variable type to type of `value` and
 * `default`.
 */
declare type UserVariableTypeMap<T extends UserCssType> = T extends 'number' | 'checkbox' ? number : T extends 'string' | 'select' | 'color' ? string : string | number;
/**
 * Description of a declared user style variable
 */
export interface UserVariable<UT extends UserCssType = UserCssType, UV extends UserVariableTypeMap<UT> = UserVariableTypeMap<UT>> {
    type: UT;
    label: string;
    value: UV;
    default: UV;
    units?: string;
}
export {};
