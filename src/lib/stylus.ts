import Stylus = require('stylus');

export type RenderCallback =
    (error: null | Error, css?: string, js?: string ) => void;

export type StylusPlugin = Parameters<RendererClass['use']>[0]

export type StylusPluginEntry = (fn: StylusPlugin) => any

export type RendererClass = ReturnType<typeof Stylus>
export type Stylus   = typeof Stylus;

export default Stylus
