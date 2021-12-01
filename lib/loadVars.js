"use strict";
//#region Imports
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadParsedVariables = void 0;
const stylus_1 = __importDefault(require("./stylus"));
const debug_1 = require("./debug");
//#endregion Imports
const Nodes = stylus_1.default.nodes;
const loadParsedAsRaw = false;
function loadParsedVariables(vars, stylus) {
    const varTuples = Object.entries(vars.metadata.vars);
    debug_1.loader('Iterating through %i usercss meta variable declarations', varTuples.length);
    for (let [name, meta] of varTuples) {
        // const value = [meta.default, ...meta.units ? [meta.units] : []].join('')
        if (meta.type === 'number') {
            if (meta.units) {
                debug_1.loader(`Defining variable ${name} with value ${meta.default}${meta.units}`);
                const value = new Nodes.Unit(Number(meta.default), meta.units);
                debug_1.loader(`Created node: %o`, value);
                stylus.define(name, value, loadParsedAsRaw);
            }
            else {
                debug_1.loader(`Defining variable ${name} with value ${meta.default}`);
                const value = new Nodes.Unit(Number(meta.default), '');
                debug_1.loader(`Created node: %o`, value);
                stylus.define(name, value, loadParsedAsRaw);
            }
        }
        else {
            debug_1.loader(`Defining variable with ${name} with value ${meta.default}`);
            stylus.define(name, meta.default, loadParsedAsRaw);
        }
    }
    return stylus;
}
exports.loadParsedVariables = loadParsedVariables;
