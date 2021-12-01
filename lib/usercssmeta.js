"use strict";
//#region Imports
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metaHasVariables = exports.parseSourceUserCSSMeta = exports.extractMeta = exports.metaRegex = void 0;
const userCssMeta = __importStar(require("usercss-meta"));
const debug_1 = require("./debug");
//#endregion Imports
exports.metaRegex = /^(\/\* ==UserStyle==[\s\S\n]+?^==\/UserStyle== \*\/)/mg;
function extractMeta(source) {
    const parsed = (source.match(exports.metaRegex) || [''])[0];
    if (!parsed || parsed.length === 0) {
        debug_1.usercssmeta(`Failed to match usercssmeta with capture regex.`);
        return '';
    }
    debug_1.usercssmeta(`Extracted meta:\n${parsed}`);
    return parsed;
}
exports.extractMeta = extractMeta;
function parseSourceUserCSSMeta(source, allowErrors = true) {
    let parsed = undefined;
    let extracted = extractMeta(source);
    if (extracted.length === 0) {
        debug_1.usercssmeta(`Failed to extract meta, exiting parse function.`);
        return;
    }
    parsed = userCssMeta.parse(source, { allowErrors });
    if (typeof parsed === 'object')
        return parsed;
    return;
}
exports.parseSourceUserCSSMeta = parseSourceUserCSSMeta;
function metaHasVariables(parsed) {
    var _a, _b;
    return !!((_b = (_a = parsed === null || parsed === void 0 ? void 0 : parsed.metadata) === null || _a === void 0 ? void 0 : _a.vars) !== null && _b !== void 0 ? _b : false);
}
exports.metaHasVariables = metaHasVariables;
//#endregion Declarations
