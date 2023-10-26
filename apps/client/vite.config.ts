/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    cacheDir: '../../node_modules/.vite/client',

    server: {
        port: 4200,
        host: 'localhost',
    },

    preview: {
        port: 4300,
        host: 'localhost',
    },

    plugins: [
        react(),
        viteTsConfigPaths({
            root: '../../',
        }),
    ],

    resolve: {
        alias: {
            '@tracelytics/frontend/domain': resolve('libs/frontend/domain/src/index.ts'),
            '@tracelytics/frontend/application': resolve('libs/frontend/application/src/index.ts'),
            '@tracelytics/frontend/ui': resolve('libs/frontend/ui/src/index.ts'),
            '@tracelytics/emitter': resolve('libs/emitter/src/index.ts'),
            '@tracelytics/shared/di': resolve('libs/shared/di/src/index.ts'),
            '@tracelytics/shared/flux': resolve('libs/shared/flux/src/index.ts'),
            '@tracelytics/shared/types': resolve('libs/shared/types/src/index.ts'),
            '@tracelytics/shared/utils': resolve('libs/shared/utils/src/index.ts'),
        },
    },
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [
    //    viteTsConfigPaths({
    //      root: '../../',
    //    }),
    //  ],
    // },

    test: {
        globals: true,
        cache: {
            dir: '../../node_modules/.vitest',
        },
        environment: 'jsdom',
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
});
