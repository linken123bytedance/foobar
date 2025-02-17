import Module from "module";
import path from "path";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const dir = (...paths: string[]) => path.join(__dirname, ...paths);
/**
 * _findPath
 * _resolveLookupPaths
 * _resolveFilename
 * findPackageJSON
 * isBuiltin
 * _nodeModulePaths
 * builtinModules
 */
console.log(Object.keys(Module));

const m = Module as any;

console.log(m._resolveFilename.toString());

// console.log(m.findPackageJSON("tsup", __dirname));
