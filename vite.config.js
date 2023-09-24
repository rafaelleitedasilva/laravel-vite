import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

// Verifique se a variável de ambiente NODE_ENV está definida como 'production'
const isDevelopment = process.env.NODE_ENV === 'development';

export default defineConfig({
    plugins: [
        laravel({
            input: [
            'resources/css/app.css', 
            'resources/scss/style.scss',
            'resources/js/app.js',
        ],refresh: true
        }),
    ],
    resolve:{
        alias:{
            "@":"/resources/js",
        }
    },
    server: {
        https: !isDevelopment, // Use HTTPS apenas em produção
        host: true, // Use diferentes hosts para dev e prod
        strictPort: true,
        port: 3009, // Use diferentes portas para dev e prod
        hmr: { host: 'localhost', protocol: 'ws'},
        watch: {
            usePolling: true,
        }
    }
});