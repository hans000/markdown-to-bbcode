import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import banner from 'vite-plugin-banner'

const prefix = `
// ==UserScript==
// @name            bbcode-plugin-mdx
// @namespace       http://hans0000.github.io/
// @version         0.1
// @author          hans000
// @description     该项目用于扩展mcbbs论坛富文本编辑器，主要基于markdown的语法并扩展了论坛独有的语法功能，实现了快速书写的功能。
// @run-at          document-end
// @match           https://www.mcbbs.net/*
// @grant           none
// @icon            data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require         https://unpkg.com/marked@4.1.0/lib/marked.umd.js
// @require         https://unpkg.com/js-yaml@4.1.0/dist/js-yaml.min.js
// @require         https://unpkg.com/idb-keyval@6.2.0/dist/umd.js
// @require         https://unpkg.com/react@18.2.0/umd/react.production.min.js
// @require         https://unpkg.com/state-local@1.0.7/lib/umd/state-local.min.js
// @require         https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js
// @require         https://unpkg.com/prop-types@15.8.1/prop-types.min.js
// @require         https://unpkg.com/@monaco-editor/loader@1.3.2/lib/umd/monaco-loader.min.js
// @require         https://unpkg.com/@monaco-editor/react@4.4.5/lib/umd/monaco-react.min.js
// ==/UserScript==
`.trimStart()


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        banner({
            content: prefix,
            verify: false,
        }),
    ],
    build: {
        target: 'esnext',
        assetsDir: './',
        minify: true,
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