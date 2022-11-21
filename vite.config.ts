import {defineConfig} from 'vite';
import {resolve} from 'path'
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
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
