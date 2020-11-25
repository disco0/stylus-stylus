"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usercssmeta = exports.plugin = exports.loader = exports.debug = void 0;
const debug_1 = __importDefault(require("debug"));
exports.debug = ((base) => Object.assign(base, {
    varLoader: base.extend('loader'),
    plugin: base.extend('plugin'),
    usercssmeta: base.extend('usercssmeta')
}))(debug_1.default('stylus-stylus'));
exports.loader = exports.debug.varLoader;
exports.plugin = exports.debug.plugin;
exports.usercssmeta = exports.debug.usercssmeta;
