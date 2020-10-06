"use strict";
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
const uvu_1 = require("uvu");
const assert = __importStar(require("uvu/assert"));
const source_tests_loader_1 = require("./source-tests-loader");
const usercss_meta_parseStructure_1 = require("./usercss-meta-parseStructure");
// Currently using branch with basic declarations
const usercss_meta_1 = require("usercss-meta");
const userCSSMeta = {
    parse: {
        testOptions: {
            allowErrors: true
        }
    }
};
//#region Test Functions
/**
 * Run usercss-meta parser on styl source file
 *
 * @TODO Add assertions for known declarations in meta
 * @TODO Add mode or additional function to check for errors, not just valid
 *       metas
 */
function parseSource(source, parseOptions) {
    return usercss_meta_1.parse(source, parseOptions !== null && parseOptions !== void 0 ? parseOptions : userCSSMeta.parse.testOptions);
}
function testSource(sourceFile) {
    var _a;
    const { name, path, source } = sourceFile;
    console.log('Checking file: ' + name);
    const parsed = parseSource(source);
    assert.equal((_a = parsed === null || parsed === void 0 ? void 0 : parsed.errors) === null || _a === void 0 ? void 0 : _a.length, 0, `Errors parsing test source file: ${path}`);
    usercss_meta_parseStructure_1.displaySourceParseStructure(sourceFile);
}
//#endregion Test Functions
//#region Go
console.log("Running .styl meta tests.");
uvu_1.test('usercss-meta: Parse Source', () => {
});
source_tests_loader_1.sourceFiles.forEach(testSource);
//#endregion Go
const API = uvu_1.suite('exports');
