"use strict";
///<reference path="../../@types/usercss-meta/index.d.ts"/>
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTestFiles = exports.displaySourceParseStructure = exports.parseSourceUserCSSMeta = exports.extractMeta = exports.metaRegex = void 0;
const userCssMeta = __importStar(require("usercss-meta"));
const source_tests_loader_1 = require("./source-tests-loader");
const chalk_1 = __importDefault(require("chalk"));
const hex = chalk_1.default.hex.bind(chalk_1.default);
const underline = chalk_1.default.underline.bind(chalk_1.default);
exports.metaRegex = /^(\/\* ==UserStyle==[\s\S\n]+?^==\/UserStyle== \*\/)/mg;
function extractMeta(source) {
    const parsed = (source.match(exports.metaRegex) || [''])[0];
    if (!parsed || parsed.length === 0) {
        console.log(chalk_1.default.ansi256(208) `Failed to match usercssmeta with capture regex.`);
        return '';
    }
    console.log(chalk_1.default.blue `Extracted meta:\n` + chalk_1.default.gray(parsed));
    return parsed;
}
exports.extractMeta = extractMeta;
function parseSourceUserCSSMeta(sourceArg, allowErrors = true) {
    let parsed = undefined;
    const source = typeof sourceArg === 'string' ? sourceArg : sourceArg.source;
    let extracted = extractMeta(source);
    if (extracted.length === 0) {
        console.warn(chalk_1.default.ansi256(209) `Failed to extract meta, exiting parse function.`);
        return;
    }
    parsed = userCssMeta.parse(source, { allowErrors });
    if (typeof parsed === 'object')
        return parsed;
    console.warn(hex('#C90') `Failed parsing${typeof sourceArg === 'string'
        ? ' input source'
        : underline `${sourceArg.path}`}.`);
    return;
}
exports.parseSourceUserCSSMeta = parseSourceUserCSSMeta;
function hasVariables(parsed) {
    var _a;
    if (!((_a = parsed === null || parsed === void 0 ? void 0 : parsed.metadata) === null || _a === void 0 ? void 0 : _a.vars))
        throw new Error('usercss-meta parsed has no variables.');
}
function printParsedVariables(result) {
    console.log(hex("#089") `Variables: `);
    hasVariables(result);
    Object.entries(result.metadata.vars).forEach(([k, v]) => {
        console.log(hex('#089').dim `${k}:`);
        console.dir(v);
    });
}
function displaySourceParseStructure(sourceFile) {
    const { source, path } = sourceFile;
    try {
        let result = parseSourceUserCSSMeta(sourceFile);
        if (!result) {
            console.warn(hex('#C90') `Failed parsing ${underline `${path}`}.`);
            return;
        }
        console.log(hex("#089") `Parsed stylus file ${underline `${path}`}`);
        printParsedVariables(result);
        return;
    }
    catch (e) {
        console.error(chalk_1.default.red.bold `Error during usercss meta parse:`);
        console.dir(e);
    }
}
exports.displaySourceParseStructure = displaySourceParseStructure;
function parseTestFiles(files = source_tests_loader_1.sourceFiles) {
    source_tests_loader_1.sourceFiles.forEach(file => {
        console.log(chalk_1.default.ansi256(32) `Parsing file: ${chalk_1.default.ansi256(32).underline `${file.path}`}`);
        displaySourceParseStructure(file);
    });
}
exports.parseTestFiles = parseTestFiles;
