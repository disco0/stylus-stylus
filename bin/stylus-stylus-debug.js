#!/usr/bin/env node

require('process').env.DEBUG = 'stylus-stylus*'

const process              = require('process');
const { resolve, dirname } = require('path');
const { exec }             = require('child_process');
const chalk                = require('chalk');

const stylusBin = resolve(__dirname, '../node_modules/stylus/bin/stylus');
const plugin    = resolve(dirname(__filename), '../')

//#region Construct Command

const procArgs = process.argv.slice(2);

console.log(`Args:` + procArgs.map(_ => `\n - ${_}`).join(''))

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

console.debug(`Invoking command: "${command}"`)

//#endregion Construct Command

exec(command, (error, stdout, stderr) =>
{
    if (error)
    {
        console.log(chalk.red`error: ${error.message}`);
        return;
    }
    if (stderr)
    {
        console.log(chalk.ansi256(245)`${stderr}`);
        return;
    }
    console.log(chalk.green`${stdout}`);
});
