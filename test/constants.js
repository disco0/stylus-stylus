"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stylusSourceFileRegex = exports.sourceDir = void 0;
const path_1 = require("path");
exports.sourceDir = path_1.resolve(__dirname, 'source-tests');
exports.stylusSourceFileRegex = /^[^\.\n]+\.styl$/;
