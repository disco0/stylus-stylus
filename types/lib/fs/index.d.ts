/// <reference types="node" />
import type { Dirent } from 'fs';
export declare function readDirEntries(dir: string): Dirent[];
export declare function readdirPathent(dir: string): Pathent[];
export interface Pathent extends Dirent {
    path: string;
}
export interface TestSource extends Pathent {
    source: string;
}
