import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { resolve } from 'path';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');
const publicDir = resolve(__dirname, 'public');
const backgroundFile = resolve(root, 'background', 'index.ts');

export default defineConfig({
    resolve: {
        alias: {
            "@src": root,
        },
    },
    plugins: [preact()],
    publicDir,
    build: {
        outDir,
        assetsDir: 'assets',
        sourcemap: process.env.__DEV__ === "true",
        rollupOptions: {
            plugins: [
                // https://github.com/airbnb/lottie-web/issues/2599
                {
                    name: 'disable-treeshake',
                    transform(code, id) {
                        if (/node_modules[/\\]lottie-web/.test(id)) {
                            // Disable tree shake for lottie-web module
                            return {
                                code,
                                map: null,
                                moduleSideEffects: 'no-treeshake',
                            };
                        }
                        return null;
                    },
                },
            ],
            input: {
                popup: resolve(__dirname, 'index.html'),
                background: backgroundFile
            },
            output: {
                entryFileNames: (chunk) => {
                    if (chunk.name === "background") {
                        return 'background.js';
                    }
                    return 'assets/index.js';
                },
            },
        },
    },
});