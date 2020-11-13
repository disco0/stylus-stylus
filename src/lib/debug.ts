import Debug from 'debug';

export const debug = ((base) => Object.assign(base, {
    varLoader:   base.extend('loader'),
    plugin:      base.extend('plugin'),
    usercssmeta: base.extend('usercssmeta')
}))(Debug('stylus-stylus'));

export const loader      = debug.varLoader   as Debug.Debugger
export const plugin      = debug.plugin      as Debug.Debugger
export const usercssmeta = debug.usercssmeta as Debug.Debugger
