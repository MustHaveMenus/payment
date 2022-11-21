import {defineConfig} from 'vite';
import {resolve} from 'path'
import solidPlugin from 'vite-plugin-solid';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [solidPlugin(), cssInjectedByJsPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'es2015',
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'MHM',
      fileName: 'mhm'
    },
    rollupOptions: {
      output: {
        assetFileNames: "mhm.[ext]",
      },
    },
  },
});
