import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
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
    plugins: [react()],
    publicDir,
    build: {
        outDir,
        assetsDir: 'assets',
        sourcemap: process.env.__DEV__ === "true",
        rollupOptions: {
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