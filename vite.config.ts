import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
    ],
    build: {
        target: 'es2015',
        assetsDir: './',
        minify: false,
        polyfillModulePreload: false,
        terserOptions: {
            ecma: 2015
        },
        rollupOptions: {
            output: {
                manualChunks: undefined,
                compact: true,
                format: 'iife',
                globals: {
                    'react': 'React',
                    'react-dom': 'ReactDOM',
                    '@monaco-editor/react': 'monaco_react',
                    'idb-keyval': 'idbKeyval',
                    'marked': 'marked',
                    'js-yaml': 'jsyaml',
                    'state': 'state',
                    'prop-types': 'PropTypes',
                },
                entryFileNames: 'index.js',
            },
            external: [
                'react',
                'react-dom',
                '@monaco-editor/react',
                'idb-keyval',
                'marked',
                'js-yaml',
                'state-local',
                'prop-types',
            ],
        },
    },
})