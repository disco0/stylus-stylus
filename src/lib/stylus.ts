import Stylus = require('stylus');

export type RenderCallback =
    (error: null | Error, css?: string, js?: string ) => void;

export type Renderer = ReturnType<typeof Stylus>

export type StylusPlugin = (this: Renderer) => any

export type StylusPluginEntry = (options?: any) => StylusPlugin

export default Stylus
