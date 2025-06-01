import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/all',
  plugins: [
    nxViteTsPaths(), 
    nxCopyAssetsPlugin(['*.md']),
    dts({
      entryRoot: 'src',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PermanenceAll',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [], // No external dependencies to exclude for this aggregation package
    },
  },
  test: {
    'watch': false,
    'globals': true,
    'environment': "node",
    'include': ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    'reporters': ["default"],
    'coverage': {
      'reportsDirectory': '../../coverage/packages/all',
      'provider': 'v8' as const,
    }
  },
});
