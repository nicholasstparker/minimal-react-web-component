import path from "node:path";
import fs from "node:fs";
import {fileURLToPath} from "node:url";
import TerserPlugin from "terser-webpack-plugin";
import {CleanWebpackPlugin} from "clean-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.resolve(__dirname, "src/components");
const entry = {};

fs.readdirSync(componentsDir).forEach((item) => {
    const itemPath = path.join(componentsDir, item);
    const stats = fs.statSync(itemPath);
    if (stats.isDirectory()) {
        const componentIndexPath = path.join(itemPath, "index.ts");
        if (fs.existsSync(componentIndexPath)) {
            entry[item] = componentIndexPath;
            console.info('Adding index.ts file to entry in ', itemPath);
        } else {
            console.warn(`No index.ts file found in ${itemPath}`);
        }
    }
});

export default {
    entry,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        chunkFilename: "[name].bundle.js",
        libraryTarget: "umd",
    },
    module: {
        rules: [
            {
                test: /.([cm]?ts|tsx)$/,
                loader: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        extensionAlias: {
            '.ts': ['.js', '.ts'],
            '.cts': ['.cjs', '.cts'],
            '.mts': ['.mjs', '.mts'],
        },
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                react: {
                    test: /[\\/]node_modules[\\/](react)[\\/]/,
                    name: "react",
                    chunks: "all",
                    enforce: true
                },
                reactDom: {
                    test: /[\\/]node_modules[\\/](react-dom)[\\/]/,
                    name: "react-dom",
                    chunks: "all",
                    enforce: true
                }
            }
        },
        minimize: true,
        minimizer: [new TerserPlugin(
            {
                terserOptions: {
                    output: {
                        comments: false
                    }
                },
                extractComments: false
            }
        )],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
        new CleanWebpackPlugin()
    ]
};
