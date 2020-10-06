"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugin = () => function (renderer) {
    'use strict';
    console.log('Plugin loaded.');
};
plugin.path = __dirname;
plugin.version = require(__dirname + '/../package.json').version;
module.exports = plugin;
//# sourceMappingURL=index.js.map