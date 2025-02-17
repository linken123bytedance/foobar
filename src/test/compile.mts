import * as vm from "node:vm";
import * as v8 from "node:v8";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "path";
import { Module } from "node:vm";
import * as fs from "node:fs";
import { createRequire } from "node:module";

export const compile = (
  code: string,
  opts: vm.SourceTextModuleOptions = {},
): Buffer => {
  v8.setFlagsFromString("--no-lazy");
  v8.setFlagsFromString("--no-flush-bytecode");
  const mod = new vm.SourceTextModule(code, opts);
  if ("createCachedData" in mod && typeof mod.createCachedData === "function") {
    const cachedData = mod.createCachedData();
    return cachedData;
  }

  throw new Error("Failed to compile - cachedData not found");
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function importModule<T = any>(opts: {
  filename: string;
  bytecode: Buffer;
}): Promise<T> {
  const filename = opts.filename;
  const bytecode = opts.bytecode;
  const url = pathToFileURL(filename, { windows: true });

  const meta: ImportMeta = {
    url: url.toString(),
    filename,
    dirname: path.dirname(filename),
    resolve(specifier: string, parent?: string | URL) {
      if (!isSupportImportMetaResolve()) {
        const filename = path.join(meta.dirname, specifier);
        const specifier2 = path
          .relative(__dirname, filename)
          .replaceAll(/\\/g, "/");
        return import.meta.resolve(specifier2);
      }

      parent ??= url;
      return import.meta.resolve(specifier, parent);
    },
  };

  const context = vm.createContext({
    console: console,
  });

  const sourceHash = bytecode.readUInt32LE(8);
  const isModule = (sourceHash & 0x80000000) >>> 0 === 0x80000000;
  const sourceLength = sourceHash & ~(1 << 31);
  const dummyCode = "\u200b".repeat(sourceLength);
  const module = new vm.SourceTextModule(dummyCode, {
    context,
    cachedData: bytecode,
    initializeImportMeta(importMeta) {
      Object.assign(importMeta, meta);
    },
  });

  const imports = new Map<string, Module>();
  await module.link(
    async (specifier: string, referencingModule: Module, extra) => {
      if (imports.has(specifier)) {
        return imports.get(specifier)!;
      }

      const url = meta.resolve(specifier);
      if (!url) throw new Error(`Failed to resolve module: ${specifier}`);
      const mod = await import(url);
      console.log({ mod });
      const keys = Object.keys(mod);
      const imported = new vm.SyntheticModule(
        keys,
        () => keys.map((key) => imported.setExport(key, mod[key])),
        { identifier: specifier, context: referencingModule.context },
      );

      imports.set(specifier, imported);
      return imported;
    },
  );

  await module.evaluate();

  return module.namespace as any;
}

function isSupportImportMetaResolve() {
  return process.execArgv.includes("--experimental-import-meta-resolve");
}
