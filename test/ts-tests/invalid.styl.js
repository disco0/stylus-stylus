"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.source = exports.name = void 0;
exports.name = 'invalid.styl', exports.source = 
/* stylus */
`/* ==UserStyle==
@name           TypeScript Docs
@description    Expands width of code blocks and moves navigation bar fully to the left
@version        0.0.12
@namespace      github.com/disk0/stylus/typescript.org/docs

@author         disk0 (github.com/disco0)
@license        MIT

@preprocessor   stylus

@var select     CodeFont "Font for code displayed on page." [
  "Iosevka Extended*",
  "Iosevka Expanded",
  "Iosevka Term",
  "Iosevka",

  "SemanticHaskell",
  "SemanticJavascript",
  "SemanticCode",
  "Hasklig",

  "PragmataPro Mono Liga",

  "monospace"
]
@var number     CodeFontSize   "Size of code in documentation"          [ 14, 1, 500, 1, "px" ]
@var number     CodeFontWeight "Code font weight"                       [ 400, 100, 900, 100 ]
@var number     DocTextWidth   "Width of text content in documentation" [ 1000, 300, 5000, 100, "px" ]
==/UserStyle== */

@-moz-document regexp("https?://(www\\.)?typescriptlang.org/(v2/)?docs.*$"),
	           regexp("https?://(www\\.)?(staging-)?typescript\\.org/docs/.*$")
    error("compile error")
`;
module.exports = { name: exports.name, source: exports.source };
exports.default = module.exports;
