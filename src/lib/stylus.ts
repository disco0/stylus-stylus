import Stylus = require('stylus');

export type RenderCallback =
    (error: null | Error, css?: string, js?: string ) => void;

export type StylusPlugin = (this: Parameters<RendererClass['use']>[0], options: any) => void;

export type StylusPluginEntry = (fn: StylusPlugin) => any

export type RendererClass = ReturnType<typeof Stylus>

export default Stylus
