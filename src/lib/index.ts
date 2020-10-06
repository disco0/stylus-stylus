import stylus, {
    RenderCallback,
    RendererClass,
    Stylus,
    StylusPlugin,
    StylusPluginEntry
} from './stylus'

import { reduce as cond } from 'conditional-reduce'

import {
    extractMeta,
    metaHasVariables,
    metaRegex,
    parseSourceUserCSSMeta
} from './usercssmeta'
import type {
    ParseResult,
    ParseWithVariables
} from './usercssmeta'

import type * as StylusStatic from 'stylus';

interface PluginOptions
{

};

const plugin: StylusPlugin = (stylus: RendererClass) =>
{
    const source = stylus.str;

    if(!source || source.length === 0) return;

    const meta = parseSourceUserCSSMeta(source)?.metadata;

    if((!meta?.vars) || Object.keys(meta.vars).length === 0) return;

    const userVars = Object.entries(meta.vars);
}

const entry: StylusPluginEntry =
function entry(options: PluginOptions): typeof plugin
{
    return plugin
}

Object.assign(entry, {
    path:     __dirname,
    version: require(__dirname + '/../package.json').version
})

export = module.exports = plugin;

