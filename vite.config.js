import { defineConfig } from 'vite';
import glob from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: 'commonHelpers.js',
        },
        plugins: [
          replace({
            preventAssignment: true,
            delimiters: ['', ''],
            values: {
              '{}.addEventListener': 'Object.prototype.addEventListener', // Замена проблемного кода
            },
          }),
        ],
        onwarn(warning, warn) {
          if (warning.code === 'THIS_IS_UNDEFINED') {
            return;
          }
          warn(warning);
        },
      },
      outDir: '../dist',
    },
    plugins: [injectHTML(), commonjs(), FullReload(['./src/**/**.html'])],
  };
});
