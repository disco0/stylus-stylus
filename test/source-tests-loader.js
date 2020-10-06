"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceFiles = void 0;
const fs_1 = require("fs");
const chalk_1 = __importDefault(require("chalk"));
const fs_2 = require("./fs");
const constants_1 = require("./constants");
// Fix for ts-node execution
const tsNodeExecPathFix = (path) => path.replace(/^(.+)\/src(\/[^\/]+)$/, '$1/$2');
const sourceDir = fs_1.existsSync(constants_1.sourceDir)
    ? constants_1.sourceDir
    : (newPath => fs_1.existsSync(newPath) ? newPath : undefined)(tsNodeExecPathFix(constants_1.sourceDir));
if (!sourceDir) {
    throw new Error(chalk_1.default.red `Failed to resolve source files path. This should ${chalk_1.default.underline.red `never`} happen outside of ts-node.`);
}
//#region Source location config
const isStylFile = (dirEnt) => constants_1.stylusSourceFileRegex.test((dirEnt.name));
//#endregion Source location config
// Read in source files
exports.sourceFiles = fs_2.readDirWithPath(sourceDir)
    .filter(isStylFile)
    .map(ent => (source => Object.assign(ent, { source }))(fs_1.readFileSync(ent.path, { encoding: 'utf8' })));
