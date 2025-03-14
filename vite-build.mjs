import path from "path";
import url from "url";
import { build, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import typescript from '@rollup/plugin-typescript';
import globals from "./webcomponents/globals.json" with { type: "json" };
import { writeFile } from "fs/promises";

const liteRollup = {
  external: Object.keys(globals),
  output: {
    globals
  },
}

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const muiModalWCConfig = {
  plugins: [],
  entry: path.resolve(__dirname, "./webcomponents/mui-modal.ts"),
  name: "mui-modal",
  formats: ["umd"],
};
const simpleBoxWCConfig = {
  plugins: [],
  entry: path.resolve(__dirname, "./webcomponents/simple-box.ts"),
  name: "simple-box",
  formats: ["umd"],
};

const dependenciesConfig = {
  plugins: [],
  entry: path.resolve(__dirname, "./webcomponents/dependencies.js"),
  name: "dependencies",
  formats: ["umd"],
};

const getConfiguration = ({ plugins, ...library }, mode) => {
  return defineConfig(() => ({
    define: {
      'process.env': { NODE_ENV: "production" }
    },
    plugins: [
      react({
        babel: {
          plugins: [
            "styled-jsx/babel"
          ],
        }
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        outDir: library.name === "dependencies" ? "./dist" : `./dist/${library.name}`,
      }),
      ...plugins
    ],
    build: {
      emptyOutDir: false,
      lib: {
        ...library,
        fileName: (format) => `${library.name}.${mode}.${format}.js`
      },
      outDir: library.name === "dependencies" ? "./dist" : `./dist/${library.name}`,
      rollupOptions: mode === "lite" ? liteRollup : {},
    },
  }));
};

const createDependencyRollup = () => {
  const imports = Object.entries(globals).map(([modulePath, globalName]) => `import ${globalName} from "${modulePath}";`);
  
  const guard = `const rootObj = typeof window !== "undefined" ? window : global`;

  const assignments = Object.entries(globals).map(([modulePath, globalName]) => `rootObj.${globalName} = ${globalName};`);

  return writeFile(path.resolve(__dirname, "./webcomponents/dependencies.js"), [...imports, guard, ...assignments].join("\n"));
}

const viteBuild = (configFactory) => {
  const config = configFactory();

  return build(config);
};

const buildLibraries = async () => {
  await createDependencyRollup();

  await Promise.all([].concat(
    ...["lite", "full"].map(mode => [
      viteBuild(getConfiguration(muiModalWCConfig, mode)),
      viteBuild(getConfiguration(simpleBoxWCConfig, mode)),
    ]),
    [viteBuild(getConfiguration(dependenciesConfig, "full"))]
  ));
};

buildLibraries();