"use strict";
//#region Imports
const usercssmeta_1 = require("./usercssmeta");
const loadVars_1 = require("./loadVars");
const debug_1 = require("./debug");
//#endregion Imports
const entry = function entry(options = {}) {
    let config = options;
    return function () {
        const source = this.str;
        if (!source || source.length === 0)
            return;
        const parsed = usercssmeta_1.parseSourceUserCSSMeta(source);
        if (!(parsed && usercssmeta_1.metaHasVariables(parsed))) {
            debug_1.plugin('No variables parsed in usercssmeta, returning base stylus render instance.');
        }
        else {
            debug_1.plugin('Passing stylus render instance to loader');
            loadVars_1.loadParsedVariables(parsed, this);
        }
    };
};
Object.assign(entry, {
    path: __dirname,
    version: require(__dirname + '/../package.json').version
});
;
module.exports = module.exports = entry;
//#endregion Declarations
