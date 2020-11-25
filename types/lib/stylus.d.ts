import Stylus = require('stylus');
export declare type RenderCallback = (error: null | Error, css?: string, js?: string) => void;
export declare type Renderer = ReturnType<typeof Stylus>;
export declare type StylusPlugin = (this: Renderer) => any;
export declare type StylusPluginEntry = (options?: any) => StylusPlugin;
export default Stylus;
