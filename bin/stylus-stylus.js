#!/usr/bin/env node

const process = require('process');
const { resolve, dirname } = require('path');
const { exec } = require('child_process');
const chalk = require('chalk');

const stylusBin = resolve(__dirname, '../node_modules/stylus/bin/stylus');
const plugin = resolve(dirname(__filename), '../')

//#region Construct Command

const procArgs = process.argv.slice(2);

//TODO: WSL resolution of node.cmd?
const node_command = process.platform === 'win32' ? 'node.cmd' : 'node';

const args =
[
    `--use`, plugin,
    // ...argv
    ...procArgs
]

const command =
[
    node_command,
    stylusBin,
    ...args
].join(' ');

//#endregion Construct Command

exec(command, (error, stdout, stderr) =>
{
    if (error)
    {
        console.error(stderr);
        return;
    }
    if (stderr)
    {
        console.error(stderr);
        return;
    }
    console.log(stdout)
});
