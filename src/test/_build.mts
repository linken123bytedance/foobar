import path from "path";
import * as url from "node:url";
import * as fs from "node:fs";
import { compile, importModule } from "./compile.mts";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const dir = (...paths: string[]) => path.join(__dirname, ...paths);
const dist = (...paths: string[]) => dir("./dist", ...paths);
const asset = (...paths: string[]) => dir("../assets", ...paths);

void main();
async function main() {
  const distFilename = compileFile(asset("./foo.mjs"));
  const bytecode = fs.readFileSync(distFilename);
  const { default: mod } = await importModule<{
    default: { name: string; bar: any; zoo: { name: string } };
  }>({
    filename: distFilename,
    bytecode: bytecode,
  });

  console.log(mod.bar.zoo === mod.zoo);
}

function compileFile(filename: string) {
  const ext = path.extname(filename);
  const basename = path.basename(filename, ext);
  const dirname = path.dirname(filename);
  const jscExt = ext.toLowerCase() + "c";
  const distFilename = path.join(dirname, basename + jscExt);

  const code = fs.readFileSync(filename).toString();
  const bytecode = compile(code);
  fs.writeFileSync(distFilename, bytecode);
  return distFilename;
}
