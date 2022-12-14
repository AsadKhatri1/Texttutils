import * as ts from 'typescript';
import type { ParseSettings } from '../parseSettings';
/**
 * Clear all of the parser caches.
 * This should only be used in testing to ensure the parser is clean between tests.
 */
declare function clearWatchCaches(): void;
/**
 * Calculate project environments using options provided by consumer and paths from config
 * @param parseSettings Internal settings for parsing the file
 * @returns The programs corresponding to the supplied tsconfig paths
 */
declare function getProgramsForProjects(parseSettings: ParseSettings): ts.Program[];
declare function createWatchProgram(tsconfigPath: string, parseSettings: ParseSettings): ts.WatchOfConfigFile<ts.BuilderProgram>;
export { clearWatchCaches, createWatchProgram, getProgramsForProjects };
//# sourceMappingURL=createWatchProgram.d.ts.map