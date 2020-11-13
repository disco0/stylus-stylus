import Browserify = require('browserify');
import fs = require('fs');
import path = require('path');

const entry = path.resolve(__dirname, '../../../lib/index.js');
const output = path.resolve(__dirname, '../../../dist/browserify/index.js');

if(!fs.existsSync(entry))
{
    throw new Error(`Entry file ${entry} does not exist.`)
}

const bundleCallback: Exclude<Parameters<Browserify.BrowserifyObject['bundle']>[0], undefined> =
    (error, bundle) => {
        if(!!error)
            console.error(`Error during bundling:\n  ${error}`)
    }

const browserify =
    Browserify(entry)
        .plugin('tinyify') // /, { flat: false })
        .bundle(bundleCallback)
        .pipe(fs.createWriteStream(output))


// var files = [ 'x.js', 'y.js' ];
// var b = browserify(files);

// b.plugin('factor-bundle', { outputs: [ 'bundle/x.js', 'bundle/y.js' ] });
// b.bundle().pipe(fs.createWriteStream('bundle/common.js'));
