//#region Imports

// Node
import { readFileSync, existsSync } from 'fs';
import type { Dirent } from 'fs';

// Packages
import c from 'chalk';

// Local
import { readdirPathent as readdirPathents } from './../lib/fs';
import { sourceDir as sourceDirBase, stylusSourceFileRegex } from './constants'

//#endregion Imports

// Fix for ts-node execution
const tsNodeExecPathFix = (path: string) => path.replace(/^(.+)\/src(\/[^\/]+)$/, '$1/$2');
const sourceDir =
    existsSync(sourceDirBase)
        ? sourceDirBase
        : (newPath =>
            existsSync(newPath) ? newPath : undefined
        )(tsNodeExecPathFix(sourceDirBase))

if(!sourceDir)
    throw new Error(
        c.red`Failed to resolve source files path. This should ${c.underline.red`never`} happen outside of ts-node.`);

//#region Source location config

const isStylFile = (dirEnt: Dirent) => stylusSourceFileRegex.test((dirEnt.name))

//#endregion Source location config

// Read in source files
export const sourceFiles =
    readdirPathents(sourceDir)
        .filter(isStylFile)
        .map(ent =>
            (source =>
                Object.assign(ent, {source}))
            (readFileSync(ent.path, {encoding: 'utf8'})));
