//#region Imports

import Stylus from './stylus';
import type { Renderer } from './stylus'
import type {
    UserVariable,
    ParseWithVariables
} from './usercssmeta';
import { loader as debug } from './debug'

//#endregion Imports

const Nodes = Stylus.nodes;

const loadParsedAsRaw = false;

export function loadParsedVariables(vars: ParseWithVariables, stylus: Renderer): Renderer
{
    const varTuples = Object.entries(vars.metadata.vars) as [string, UserVariable][];
    debug('Iterating through %i usercss meta variable declarations', varTuples.length);

    for(let [name, meta] of varTuples)
    {
        // const value = [meta.default, ...meta.units ? [meta.units] : []].join('')
        if(meta.type === 'number')
        {
            if(meta.units)
            {
                debug(`Defining variable ${name} with value ${meta.default}${meta.units}`);

                const value = new Nodes.Unit(Number(meta.default), meta.units);
                debug(`Created node: %o`, value);
                stylus.define(name, value, loadParsedAsRaw)
            }
            else
            {
                debug(`Defining variable ${name} with value ${meta.default}`);

                const value = new Nodes.Unit(Number(meta.default), '');
                debug(`Created node: %o`, value);
                stylus.define(name, value, loadParsedAsRaw)
            }
        }
        else
        {
            debug(`Defining variable with ${name} with value ${meta.default}`)

            stylus.define(name, meta.default, loadParsedAsRaw)
        }
    }
    return stylus
}
