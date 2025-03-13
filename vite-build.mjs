import path from "path";
import url from "url";
import fs from "fs";
import { build, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import typescript from '@rollup/plugin-typescript';
// import globals from "./webcomponents/globals.json" with { type: "json" };
import { writeFile } from "fs/promises";

/*
const liteRollup = {
  external: Object.keys(globals),
  output: {
    globals
  },
}
*/
const liteRollup = {}


const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const breadCrumbsWCConfig = {
  plugins: [],
  entry: path.resolve(__dirname, "./webcomponents/bread-crumbs.js"),
  name: "bread-crumbs",
  formats: ["umd"],
};
const navLinksWCConfig = {
  plugins: [],
  entry: path.resolve(__dirname, "./webcomponents/nav-links.js"),
  name: "nav-links",
  formats: ["umd"],
};
const pageContentWCConfig = {
  plugins: [],
  entry: path.resolve(__dirname, "./webcomponents/page-content.js"),
  name: "page-content",
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
      typescript(),
      ...plugins
    ],
    build: {
      emptyOutDir: false,
      lib: {
        ...library,
        fileName: (format) => `${library.name}.${mode}.${format}.js`
      },
      "outDir": "./dist",
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
  const componentsDir = path.resolve(__dirname, "src/components");
//  await createDependencyRollup();

  const viteprocs = []

  fs.readdirSync(componentsDir).forEach((item) => {
    const itemPath = path.join(componentsDir, item);
    const stats = fs.statSync(itemPath);
    if (stats.isDirectory()) {
        const componentIndexPath = path.join(itemPath, "index.ts");
        if (fs.existsSync(componentIndexPath)) {
            // entry[item] = componentIndexPath;
            viteprocs.push(
              viteBuild(getConfiguration({
                plugins: [],
                entry: componentIndexPath,
                name: item,
                formats: ["umd"],
              }, 'full'))
            )
            console.info('Adding index.ts file to entry in ', itemPath);
        } else {
            console.warn(`No index.ts file found in ${itemPath}`);
        }
    }
  });


  await Promise.all(viteprocs);
};

buildLibraries();
