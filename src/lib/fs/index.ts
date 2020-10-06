//#region Imports

// Node
import { readdirSync } from 'fs';
import type { Dirent } from 'fs';
import { resolve } from 'path';

//#endregion Imports

export function readDirEntries(dir: string): Dirent[]
{
    return readdirSync(dir, {withFileTypes: true});
}

function createPathent(entry: Dirent, dir: string): Pathent
{
    return Object.assign(entry, {path: resolve(dir, entry.name)}) as Pathent
}

export function readdirPathent(dir: string): Pathent[]
{
    return readDirEntries(dir).map((entry) => createPathent(entry, dir));
}

//#region Declarations

export interface Pathent extends Dirent
{
    path: string;
};

export interface TestSource extends Pathent
{
	  source: string;
};

//#endregion Declarations

