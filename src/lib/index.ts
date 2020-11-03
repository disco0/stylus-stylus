//#region Imports

import {
    RendererClass,
    StylusPlugin,
    StylusPluginEntry
} from './stylus'

import {
    parseSourceUserCSSMeta,
    metaHasVariables
} from './usercssmeta'

import { loadParsedVariables } from './loadVars'

import { plugin as debug } from './debug'

//#endregion Imports

const entry: StylusPluginEntry =
function entry(options: PluginOptions = {})
{
    return function(this: RendererClass, stylus: RendererClass)
    {
        const source = stylus.str;

        if(!source || source.length === 0)
            return;

        const parsed = parseSourceUserCSSMeta(source);

        if(!(parsed && metaHasVariables(parsed)))
        {
            debug('No variables parsed in usercssmeta, returning base stylus render instance.');
        }
        else
        {
            debug('Passing stylus render instance to loader');
            loadParsedVariables(parsed, stylus);
        }
    }
}

Object.assign(entry, {
    path:     __dirname,
    version: require(__dirname + '/../package.json').version
});

export = module.exports = entry;

//#region Declarations

interface PluginOptions
{

};

//#endregion Declarations
