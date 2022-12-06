import { defineConfig } from 'vite';

export default defineConfig((env) => ({
    base: `/cartes/radar-foudre-satellite/`,
    publicDir: false,
    appType: `custom`,
    build: {
        target: `modules`,
        outDir: `.`,
        emptyOutDir: false,
        lib: {
            entry: `./radar-foudre-satellite.ts`,
            fileName: `radar-foudre-satellite`,
            formats: [`es`],
        },
        minify: env.mode === `development` ? false : `esbuild`,
    },
}));
