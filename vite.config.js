import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';


export default defineConfig({
    plugins: [
        laravel({
            input: [
            'resources/css/app.css',
            'resources/scss/style.scss',
            'resources/js/app.js',
        ],refresh: true
        })
    ],

    // css: {
    //     postcss: null,
    //     preprocessorOptions: {
    //         scss: {
    //             additionalData: `
    //                 @import "./resources/scss/variables";
    //                 @import "./resources/scss/color";
    //             `,
    //         },
    //     },
    // },

    resolve:{
        alias:{
            "@":"/resources/js",
        }
    },
    server: {
        https: false, // Use HTTPS apenas em produção
        host: true, // Use diferentes hosts para dev e prod
        strictPort: true,
        port: 3009, // Use diferentes portas para dev e prod
        hmr: { host: 'localhost', protocol: 'ws'},
        watch: {
            usePolling: true,
        }
    }
});