"use strict";
//#region Imports
Object.defineProperty(exports, "__esModule", { value: true });
exports.readdirPathent = exports.readDirEntries = void 0;
// Node
const fs_1 = require("fs");
const path_1 = require("path");
//#endregion Imports
function readDirEntries(dir) {
    return fs_1.readdirSync(dir, { withFileTypes: true });
}
exports.readDirEntries = readDirEntries;
function createPathent(entry, dir) {
    return Object.assign(entry, { path: path_1.resolve(dir, entry.name) });
}
function readdirPathent(dir) {
    return readDirEntries(dir).map((entry) => createPathent(entry, dir));
}
exports.readdirPathent = readdirPathent;
;
;
//#endregion Declarations
