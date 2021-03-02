const { join } = require('path')
const sveltePreprocess = require('svelte-preprocess')
const  svelte  = require('rollup-plugin-svelte')
const { chrome } = require('./electron-dep-versions')
import resolve from '@rollup/plugin-node-resolve';

/**
 * @type {import('vite').UserConfig}
 * @see https://vitejs.dev/config/
 */
module.exports = {
  root: join(process.cwd(), './src/renderer'),
  resolve: {
    alias: {
      '/@/': join(process.cwd(), './src/renderer') + '/',
    },
  },
  plugins: [
    svelte({
      preprocess: [
        sveltePreprocess(),
      ],
    }),
    resolve(),
  ],
  base: '',
  build: {
    target: `chrome${chrome}`,
    polyfillDynamicImport: true,
    outDir: join(process.cwd(), 'dist/source/renderer'),
    assetsDir: '.',
    rollupOptions: {
      external: require('./external-packages').default,
    },
    emptyOutDir: true,
  },
}
