import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/scss/style.scss',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
    ],

    resolve: {
        alias: {
            "@": "/resources/js",
        },
    },

    build: {
        manifest: true,
        outDir: 'public/build',
        rollupOptions: {
            input: {
                app: 'resources/js/app.js',
                style: 'resources/scss/style.scss',
            },
        },
        emptyOutDir: true,
    },

    server: {
        https: false,
        host: true,
        strictPort: true,
        port: 3009,
        hmr: { host: 'localhost', protocol: 'ws' },
        watch: {
            usePolling: true,
        },
    },
});
